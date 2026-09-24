'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import FooterNavigation from '@/components/FooterNavigation';
import CaptureMethodStep from '@/components/CaptureMethodStep';
import { analyzeSkinImage } from '@/services/skinstricApi';
import RotatingRectangles from '@/components/RotatingRectangles';

// Function: ResultPage
export default function ResultPage() {
  const router = useRouter();
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBack = () => {
    if (isAnalyzing) {
      setIsAnalyzing(false);
      setSelectedImage(null);
    } else if (showPermissionModal) {
      setShowPermissionModal(false);
    } else {
      router.push('/testing'); // Navigate back to the /testing (name/city) page
    }
  };

  const handleSelectCamera = () => {
    // Trigger the custom permission modal inline on the /result page
    setShowPermissionModal(true);
  };

  const handleSelectUpload = () => {
    // Trigger hidden file input dialog when upload is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Validate File Type
    if (!file.type.startsWith('image/')) {
      window.alert('Please select a valid image file (JPEG, PNG, etc.).');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // 2. Validate File Size (e.g., limit to 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      window.alert(
        'The selected image is too large. Please choose an image under 10MB.',
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();

    // 3. Handle FileReader Errors
    reader.onerror = () => {
      console.error('FileReader failed to read the file.');
      window.alert('Failed to read the file. Please try another image.');
      setIsAnalyzing(false);
      setSelectedImage(null);
    };

    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setSelectedImage(base64String);
      setIsAnalyzing(true);

      try {
        const base64Data = base64String.split(',')[1] || base64String;
        const analysisData = await analyzeSkinImage(base64Data);

        // Store analysis result for /select and /summary pages
        localStorage.setItem(
          'skinstric_analysis',
          JSON.stringify(analysisData),
        );

        setTimeout(() => {
          window.alert('Image analyzed successfully!');
          router.push('/select');
        }, 1000);
      } catch (error) {
        console.error('API Analysis failed:', error);
        setIsAnalyzing(false);
        setSelectedImage(null);
        window.alert('Analysis failed. Please try again.');
      }
    };

    reader.readAsDataURL(file);
  };

  const handleAllowCamera = () => {
    // Once allowed, now we navigate to the live camera setup & feed page
    router.push('/camera');
  };

  return (
    <main className="relative w-screen h-screen bg-white text-[#1A1B1C] flex flex-col justify-between select-none overflow-hidden pb-16">
      {/* Global Header */}
      <Header stepLabel="INTRO" />

      {/* Hidden Windows File Input Dialog */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Sub-header snippet: Always shows "TO START ANALYSIS" to match production behavior */}
      <div className="absolute top-[85px] left-8 md:left-8 text-left z-20">
        <p className="text-xs font-bold uppercase tracking-tight">
          TO START ANALYSIS
        </p>
      </div>

      {/* Preview Thumbnail */}
      <div className="absolute top-[110px] right-[30px] z-20 flex flex-col items-start">
        <h1 className="text-xs md:text-sm font-normal mb-1 text-[#1A1B1C]">
          Preview
        </h1>
        <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden bg-white">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Uploaded Preview"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Center Container */}
      <div className="flex-1 w-full flex items-center justify-center relative px-8 py-4">
        {!isAnalyzing ? (
          <div className="relative z-20 pointer-events-auto max-w-6xl w-full px-6 flex justify-center items-center">
            <CaptureMethodStep
              onSelectCamera={handleSelectCamera}
              onSelectUpload={handleSelectUpload}
              onBack={handleBack}
              isPermissionOpen={showPermissionModal}
            />
            {/* Custom Permission Modal Box - Positioned over the camera card area */}
            {showPermissionModal && (
              <div className="absolute z-50 pointer-events-auto -translate-y-52 md:translate-y-0">
                <div
                  style={{
                    width: '352px',
                    height: '136px',
                    backgroundColor: '#1A1B1C',
                    color: '#FCFCFC',
                  }}
                  className="flex flex-col justify-between p-6 shadow-2xl"
                >
                  {/* Top Title Section */}
                  <div className="w-full text-[16px] leading-[24px] font-semibold uppercase tracking-normal">
                    Allow A.I. to access your camera
                  </div>

                  {/* Horizontal Divider Line */}
                  <div className="w-full h-[1px] bg-[#FCFCFC]/70 my-2" />

                  {/* Bottom Button Row */}
                  <div className="flex justify-end space-x-6 text-xs font-semibold tracking-wider">
                    <button
                      onClick={() => setShowPermissionModal(false)}
                      style={{ opacity: 0.7 }}
                      className="hover:opacity-100 transition-opacity uppercase text-[#FCFCFC]"
                    >
                      Deny
                    </button>
                    <button
                      onClick={handleAllowCamera}
                      className="hover:opacity-80 transition-opacity uppercase text-[#FCFCFC]"
                    >
                      Allow
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Center Preparing Analysis Loading Card */
          <div className="relative w-80 h-80 flex flex-col items-center justify-center p-8 pointer-events-auto">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <RotatingRectangles variant="small" sizeTier="compact" />
            </div>

            <div className="relative z-10 flex flex-col items-center space-y-3 text-center">
              <p className="text-normal font-bold uppercase tracking-tight text-[#1A1B1C]">
                PREPARING YOUR ANALYSIS...
              </p>
              <div className="flex space-x-4 pt-1">
                <div className="w-2 h-2 bg-[#1A1B1C]/40 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#1A1B1C]/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-[#1A1B1C]/40 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute md:block bottom-8 md:bottom-16 left-6 md:left-0 w-full px-4 md:px-8 z-30">
        <FooterNavigation
          onBack={handleBack}
          showNext={false}
          mobileTopOffsetClass="max-[767px]:-top-[200px]"
        />
      </div>
    </main>
  );
}
