'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import RotatingRectangles from '@/components/RotatingRectangles';

// Function: CameraSetupPage
export default function CameraSetupPage() {
  const router = useRouter();

  // Automatically transition to the capture step after a timeout period
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/camera/capture');
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="relative w-screen h-screen bg-white text-[#1A1B1C] select-none overflow-hidden">
      {/* Global Header */}
      <div className="absolute top-0 left-0 w-full px-0 pt-0 z-40">
        <Header stepLabel="INTRO" />
      </div>

      {/* Center View */}
      <div className="absolute inset-0 flex items-center justify-center -translate-y-[160px] md:-translate-y-[100px] z-10">
        {/* Rotating Animation Graphics & Center Camera Icon Container */}
        <div className="relative flex items-center justify-center">
          <RotatingRectangles variant="small" sizeTier="compact" />
          <div className="absolute z-25 flex flex-col items-center space-y-4">
            <div className="w-[95px] h-[95px] md:w-[136px] md:h-[136px] flex items-center justify-center">
              <img
                src="/assets/camera-icon.png"
                alt="Camera Setup"
                className="w-full h-full object-contain opacity-40"
              />
            </div>
          </div>
        </div>

        {/* Setup Status Text - Offset downward relative to the center cluster */}
        <div className="absolute z-25 flex flex-col items-center translate-y-[80px] md:translate-y-[85px] space-y-4">
          <p className="text-[12px] md:text-xs font-bold uppercase tracking-tight text-gray-400 whitespace-nowrap">
            SETTING UP CAMERA ...
          </p>
        </div>
      </div>

      {/* Guidelines Footer Info */}
      <div className="absolute bottom-[560px] md:bottom-[360px] left-0 w-full px-4 md:px-12 flex flex-col items-center space-y-6 z-30">
        <div className="flex flex-col items-center text-center">
          <p className="text-[12px] md:text-[14px] uppercase tracking-tight text-[#1A1B1C] mb-4 font-medium whitespace-nowrap">
            TO GET BETTER RESULTS MAKE SURE TO HAVE
          </p>
          <div className="flex flex-row space-x-4 md:space-x-8 text-[12px] md:text-[14px] uppercase tracking-tight text-[#1A1B1C] whitespace-nowrap">
            <span>◇ NEUTRAL EXPRESSION</span>
            <span>◇ FRONTAL POSE</span>
            <span>◇ ADEQUATE LIGHTING</span>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar (Visible on md+ screens) */}
      <div className="absolute bottom-[240px] left-0 w-full px-12 hidden md:flex flex-col items-center space-y-6 z-30">
        <div className="w-full max-w-lg flex items-center space-x-3">
          {/* Back Navigation Button */}
          <button
            onClick={() => router.push('/result')}
            className="text-gray-400 hover:text-black transition-colors text-xs"
          >
            ◀
          </button>

          {/* Progress Track Bar */}
          <div className="flex-1 h-[10px] bg-gray-400 rounded-full"></div>

          {/* Forward Navigation Button */}
          <button
            onClick={() => router.push('/camera/capture')}
            className="text-gray-400 hover:text-black transition-colors text-xs"
          >
            ▶
          </button>
        </div>
      </div>
    </main>
  );
}
