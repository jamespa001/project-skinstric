'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import FooterNavigation from '@/components/FooterNavigation';
import LoadingDots from '@/components/LoadingDots';
import { analyzeSkinImage } from '@/services/skinstricApi';

type CaptureState = 'active' | 'captured' | 'analyzing';

// Function: CameraCapturePage
export default function CameraCapturePage() {
  const router = useRouter();
  const [captureState, setCaptureState] = useState<CaptureState>('active');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize camera stream on mount
  useEffect(() => {
    let isMounted = true;

    async function initStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user',
          },
          audio: false,
        });

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              if (err.name !== 'AbortError') {
                console.error('Video play error:', err);
              }
            });
          }
        }
      } catch (err) {
        console.error('Webcam access error:', err);
        if (isMounted) router.push('/camera');
      }
    }

    if (captureState === 'active') {
      initStream();
    }

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [captureState, router]);

  // Handle taking picture
  const handleCapture = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        setCapturedImage(canvas.toDataURL('image/jpeg'));
        setCaptureState('captured');

        // Turn off camera stream right when photo is taken
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      }
    }
  };

  // Handle retake
  const handleRetake = () => {
    setCapturedImage(null);
    setCaptureState('active');
  };

  // Handle confirm / use photo -> triggers analyzing state, stops camera, processes API & goes to /select
  const handleConfirmPhoto = async () => {
    setCaptureState('analyzing');

    // Double-check hardware stream cleanup
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    try {
      const base64Data = capturedImage
        ? capturedImage.split(',')[1] || capturedImage
        : '';

      const analysisData = await analyzeSkinImage(base64Data);

      localStorage.setItem('skinstric_analysis', JSON.stringify(analysisData));

      setTimeout(() => {
        router.push('/select');
      }, 1000);
    } catch (error) {
      console.error('Camera API analysis failed:', error);
      window.alert('Analysis failed. Please try again.');
      setCaptureState('captured');
    }
  };

  return (
    <main className="relative w-screen h-screen bg-white text-[#1A1B1C] flex flex-col justify-between select-none overflow-hidden pb-16">
      {/* Global Header */}
      <div className="absolute top-0 left-0 w-full bg-white z-50 h-[76px]">
        <Header
          stepLabel={
            captureState === 'captured' || captureState === 'analyzing'
              ? 'ANALYSIS'
              : 'INTRO'
          }
        />
      </div>

      {/* Center Viewport / Stream / Preview Area */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {/* Top Status Text: Shows only when captured */}
        {captureState === 'captured' && (
          <div className="absolute top-[250px] left-1/2 -translate-x-1/2 text-center z-25 pointer-events-none">
            <p className="font-normal text-sm tracking-tight text-white">
              GREAT SHOT!
            </p>
          </div>
        )}

        {/* Preview Label: Shows only on the captured screen */}
        {captureState === 'captured' && (
          <div className="absolute bottom-[230px] sm:bottom-[160px] left-1/2 -translate-x-1/2 text-center z-25 pointer-events-none">
            <p className="font-semibold text-normal tracking-tight text-white">
              Preview
            </p>
          </div>
        )}

        <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center z-20">
          {captureState === 'active' ? (
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-full object-cover transform scale-x-[-1]"
            />
          ) : (
            <img
              src={capturedImage!}
              alt="Captured Preview"
              className="w-full h-full object-cover transform scale-x-[-1]"
            />
          )}
        </div>

        {/* Analyzing Modal Overlay Card */}
        {captureState === 'analyzing' && (
          <div className="absolute z-50 w-64 bg-gray-100/50 border border-[#1A1B1C]/10 pt-6 pb-14 shadow-xl flex flex-col items-center space-y-6 pointer-events-auto rounded-[8px] -translate-y-4 md:-translate-y-4">
            <p className="text-lg font-normal uppercase tracking-tight text-[#707070]">
              ANALYZING IMAGE...
            </p>
            <LoadingDots pt="pt-1" spacing="space-x-4" dotSize="w-2 h-2" />
          </div>
        )}
      </div>

      {/* Guidelines Footer Info (Pushed down on mobile) */}
      {captureState === 'active' && (
        <div className="absolute bottom-42 md:bottom-[200px] left-0 w-full flex flex-col items-center z-30 pointer-events-none px-4 text-center">
          <p className="text-[13px] md:text-[14px] uppercase tracking-tight text-white mb-2 font-medium">
            TO GET BETTER RESULTS MAKE SURE TO HAVE
          </p>
          <div className="flex flex-row md:flex-row space-x-6 md:space-y-0 md:space-x-8 text-[12px] md:text-[14px] uppercase tracking-tight text-white">
            <span>◇ NEUTRAL EXPRESSION</span>
            <span>◇ FRONTAL POSE</span>
            <span>◇ ADEQUATE LIGHTING</span>
          </div>
        </div>
      )}

      {/* Take Picture Button (Active State) */}
      {captureState === 'active' && (
        <div className="absolute right-16 top-1/2 -translate-y-1/2 z-40 flex items-center space-x-3 pointer-events-auto">
          <span className="hidden sm:inline text-sm font-semibold uppercase tracking-tight text-white">
            TAKE PICTURE
          </span>
          <button
            onClick={handleCapture}
            className="w-16 h-16 rounded-full bg-white border border-[#1A1B1C]/20 shadow-lg flex items-center justify-center hover:scale-105 transition-transform relative"
            aria-label="Take Picture"
          >
            {/* Inner Ring */}
            <div className="absolute w-[60px] h-[60px] rounded-full border-2 border-[#1A1B1C]/50 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </button>
        </div>
      )}

      {/* Captured Confirmation Action Buttons (Retake / Use This Photo) */}
      {captureState === 'captured' && (
        <div className="absolute bottom-42 sm:bottom-24 left-1/2 -translate-x-1/2 z-40 flex items-center space-x-6 pointer-events-auto">
          <button
            onClick={handleRetake}
            className="px-6 py-2 bg-white text-[#1A1B1C] border border-[#1A1B1C]/30 text-sm font-normal tracking-tight hover:bg-gray-50 transition-colors"
          >
            Retake
          </button>
          <button
            onClick={handleConfirmPhoto}
            className="px-6 py-2 bg-[#1A1B1C] text-white text-sm font-normal tracking-tight hover:opacity-90 transition-opacity"
          >
            Use This Photo
          </button>
        </div>
      )}

      {/* Analyzing State Action Buttons Match */}
      {captureState === 'analyzing' && (
        <div className="absolute bottom-42 sm:bottom-24 left-1/2 -translate-x-1/2 z-40 flex items-center space-x-6 pointer-events-auto">
          <button
            disabled
            className="px-6 py-2 bg-white text-[#1A1B1C]/50 border border-[#1A1B1C]/20 text-sm font-normal tracking-tight cursor-not-allowed"
          >
            Retake
          </button>
          <button
            disabled
            className="px-6 py-2 bg-[#1A1B1C] text-white text-sm font-normal tracking-tight opacity-90 cursor-wait flex items-center space-x-2"
          >
            <span>Uploading...</span>
          </button>
        </div>
      )}

      {/* Global Footer Navigation */}
      <div className="absolute bottom-64 md:bottom-16 left-2 md:left-0 w-full px-4 md:px-8 z-30">
        <FooterNavigation
          onBack={() => {
            if (streamRef.current) {
              streamRef.current.getTracks().forEach((track) => track.stop());
              streamRef.current = null;
            }
            router.push('/result');
          }}
          showNext={false}
          inverted={true}
        />
      </div>

      {/* White background block stretching full width below footer */}
      <div className="absolute bottom-0 left-0 w-full h-[52px] bg-white z-20 pointer-events-none" />
    </main>
  );
}
