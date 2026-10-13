'use client';

import React from 'react';
import Image from 'next/image';
import RotatingRectangles from '@/components/RotatingRectangles';

interface CaptureMethodStepProps {
  onSelectCamera: () => void;
  onSelectUpload: () => void;
  onBack: () => void;
  isPermissionOpen?: boolean;
}

// Function: CaptureMethodStep
export default function CaptureMethodStep({
  onSelectCamera,
  onSelectUpload,
  onBack,
  isPermissionOpen = false,
}: CaptureMethodStepProps) {
  return (
    <div className="w-full min-h-[55vh] flex items-center justify-center relative px-4 md:px-8 -mt-40 md:mt-0">
      {/* Two Options Container */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-40 items-center justify-center w-full max-w-6xl mx-auto">
        {/* Left Option: Camera Scan */}
        <button
          type="button"
          onClick={onSelectCamera}
          aria-label="Allow A.I. to scan your face using camera"
          className="group relative aspect-square w-full max-w-[280px] md:max-w-[482px] mx-auto flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 bg-transparent border-none p-0 text-left"
        >
          {/* Background Dashed Boxes Frame */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <RotatingRectangles variant="small" sizeTier="compact" />
          </div>

          {/* Content & Absolute Text Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-[90px] h-[90px] md:w-[136px] md:h-[136px] relative flex items-center justify-center pointer-events-auto">
              <Image
                src="/assets/camera-icon.png"
                alt=""
                width={136}
                height={136}
                priority
                className="object-contain"
              />
            </div>

            {/* Single Straight Diagonal Line SVG: Hidden on mobile (< 768px) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible hidden md:block"
              aria-hidden="true"
            >
              <line
                x1="270"
                y1="190"
                x2="332"
                y2="135"
                stroke="#1A1B1C"
                strokeWidth="1"
              />
              <circle
                cx="332"
                cy="135"
                r="2"
                fill="white"
                stroke="#1A1B1C"
                strokeWidth="1"
              />
            </svg>

            {/* Text Position */}
            <div className="absolute top-[75%] left-[25%] md:top-[28%] md:left-[78%] text-left md:text-left pointer-events-none">
              <p className="text-[12px] md:text-[13px] font-normal leading-[16px] md:leading-[18px] uppercase tracking-[0.05em] text-[#1A1B1C] whitespace-nowrap tracking-tight">
                ALLOW A.I.
                <br />
                TO SCAN YOUR FACE
              </p>
            </div>
          </div>
        </button>

        {/* Right Option: Gallery Upload */}
        <button
          type="button"
          onClick={!isPermissionOpen ? onSelectUpload : undefined}
          disabled={isPermissionOpen}
          aria-disabled={isPermissionOpen}
          aria-label="Allow A.I. access gallery to upload photo"
          className={`group relative aspect-square w-full max-w-[280px] md:max-w-[482px] mx-auto flex flex-col items-center justify-center transition-all duration-300 bg-transparent border-none p-0 text-left ${
            isPermissionOpen
              ? 'opacity-40 pointer-events-none cursor-not-allowed'
              : 'cursor-pointer hover:scale-105'
          } -mt-6 md:mt-0`}
        >
          {/* Background Dashed Boxes Frame */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <RotatingRectangles variant="small" sizeTier="compact" />
          </div>

          {/* Content & Absolute Text Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-[90px] h-[90px] md:w-[136px] md:h-[136px] relative flex items-center justify-center pointer-events-auto">
              <Image
                src="/assets/gallery-icon.png"
                alt=""
                width={136}
                height={136}
                className="object-contain"
              />
            </div>

            {/* Single Straight Diagonal Line SVG: Hidden on mobile (< 768px) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible hidden md:block"
              aria-hidden="true"
            >
              <line
                x1="179"
                y1="260"
                x2="120"
                y2="317"
                stroke="#1A1B1C"
                strokeWidth="1"
              />
              <circle
                cx="120"
                cy="317"
                r="2"
                fill="white"
                stroke="#1A1B1C"
                strokeWidth="1"
              />
            </svg>

            {/* Text Position */}
            <div className="absolute top-[75%] right-[30%] md:bottom-[20%] md:right-[74%] text-right md:text-right pointer-events-none">
              <p className="text-[12px] md:text-[14px] font-normal leading-[16px] md:leading-[18px] uppercase tracking-[0.05em] text-[#1A1B1C] whitespace-nowrap tracking-tight">
                ALLOW A.I.
                <br />
                ACCESS GALLERY
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
