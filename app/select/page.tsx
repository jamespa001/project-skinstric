'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import FooterNavigation from '@/components/FooterNavigation';

// Function: SelectAnalysisPage
export default function SelectAnalysisPage() {
  const router = useRouter();
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);

  // Base layout dimension used for scaling calculations (480px base)
  const BASE_SIZE = 480;

  // Configuration mapping with exact scale factors relative to the base size
  const getBoxConfig = () => {
    switch (hoveredBox) {
      case 'demographics':
        return {
          scale: 425 / BASE_SIZE,
          stroke: '#B0B4BA',
          strokeWidth: '2.5',
          dashArray: '0.1 8',
        };
      case 'cosmetic':
        return {
          scale: 480 / BASE_SIZE,
          stroke: '#D1D5DB',
          strokeWidth: '2.5',
          dashArray: '0.1 8',
        };
      case 'weather':
        return {
          scale: 538 / BASE_SIZE,
          stroke: '#C0C4CB',
          strokeWidth: '3.0',
          dashArray: '0.1 8',
        };
      case 'skin':
        return {
          scale: 480 / BASE_SIZE,
          stroke: '#D1D5DB',
          strokeWidth: '2.5',
          dashArray: '0.1 8',
        };
      default:
        return {
          scale: 400 / BASE_SIZE,
          stroke: '#9CA3AF',
          strokeWidth: '1.5',
          dashArray: '0.1 8',
        };
    }
  };

  const config = getBoxConfig();

  return (
    <main className="relative w-screen min-h-screen bg-white text-[#1A1B1C] flex flex-col select-none overflow-x-hidden">
      {/* Global Header Container */}
      <Header stepLabel="INTRO" />

      {/* Top Title & Instructions */}
      <div className="px-6 md:px-8 text-left my-4 z-20 flex-shrink-0">
        <h1 className="text-base font-semibold leading-[24px] tracking-tight">
          A.I. ANALYSIS
        </h1>
        <p className="text-sm mt-1 text-[#1A1B1C]/70 uppercase leading-[24px]">
          A.I. has estimated the following.
          <br />
          Fix estimated information if needed.
        </p>
      </div>

      {/* Central Diamond Nodes Grid */}
      <div className="flex flex-col items-center justify-start pt-[45px] md:pt-[70px] bg-white relative z-10 flex-grow">
        <div className="relative flex items-center justify-center p-16">
          {/* GPU-Accelerated Scaled Outline Box */}
          <div
            className={`absolute top-1/2 left-1/2 pointer-events-none transition-all duration-300 ease-out z-0 ${
              hoveredBox ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: `${BASE_SIZE}px`,
              height: `${BASE_SIZE}px`,
              transform: `translate(-50%, -50%) rotate(45deg) scale(${config.scale})`,
              transformOrigin: 'center center',
            }}
          >
            <svg
              width="100%"
              height="100%"
              className="overflow-visible pointer-events-none"
            >
              <rect
                x="1"
                y="1"
                width={BASE_SIZE - 2}
                height={BASE_SIZE - 2}
                fill="none"
                stroke={config.stroke}
                strokeWidth={config.strokeWidth}
                strokeDasharray={config.dashArray}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0">
            {/* Demographics (Active / Top) */}
            <div
              className="flex items-center justify-center col-start-2 transition-transform duration-300 hover:scale-[1.03] transform-gpu"
              onMouseEnter={() => setHoveredBox('demographics')}
              onMouseLeave={() => setHoveredBox(null)}
            >
              <button
                onClick={() => router.push('/summary')}
                className="w-[153.88px] h-[153.88px] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-pointer font-semibold leading-[24px] tracking-[-0.02em] uppercase transition-colors duration-300 shadow-sm"
              >
                <span className="transform -rotate-45 text-[16px] font-semibold tracking-[-0.02em]">
                  Demographics
                </span>
              </button>
            </div>

            {/* Cosmetic Concerns (Left) */}
            <div
              className="flex items-center justify-center row-start-2 col-start-1 transition-transform duration-300 hover:scale-[1.03] transform-gpu pointer-events-auto"
              onMouseEnter={() => setHoveredBox('cosmetic')}
              onMouseLeave={() => setHoveredBox(null)}
            >
              <button
                disabled
                className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-[-0.02em] uppercase cursor-not-allowed transition-colors duration-300 shadow-sm"
              >
                <span className="transform -rotate-45 text-[16px] font-semibold tracking-[-0.02em] text-center px-4 leading-[20px]">
                  Cosmetic
                  <br />
                  Concerns
                </span>
              </button>
            </div>

            {/* Skin Type Details (Right) */}
            <div
              className="flex items-center justify-center row-start-2 col-start-3 transition-transform duration-300 hover:scale-[1.03] transform-gpu pointer-events-auto"
              onMouseEnter={() => setHoveredBox('skin')}
              onMouseLeave={() => setHoveredBox(null)}
            >
              <button
                disabled
                className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-[-0.02em] uppercase cursor-not-allowed transition-colors duration-300 shadow-sm"
              >
                <span className="transform -rotate-45 text-[16px] font-semibold tracking-[-0.02em] text-center px-3 whitespace-nowrap">
                  Skin Type Details
                </span>
              </button>
            </div>

            {/* Weather (Bottom) */}
            <div
              className="flex items-center justify-center row-start-3 col-start-2 transition-transform duration-300 hover:scale-[1.03] transform-gpu pointer-events-auto"
              onMouseEnter={() => setHoveredBox('weather')}
              onMouseLeave={() => setHoveredBox(null)}
            >
              <button
                disabled
                className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-[-0.02em] uppercase cursor-not-allowed transition-colors duration-300 shadow-sm"
              >
                <span className="transform -rotate-45 text-[16px] font-semibold tracking-[-0.02em]">
                  Weather
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-[200px] md:mb-0 md:py-16 flex-shrink-0 pl-10 md:pl-6 md:pr-6 md:text-lg bg-white">
        <FooterNavigation
          onBack={() => router.push('/result')}
          nextLabel="GET SUMMARY"
          nextMobileLabel="SUM"
          onNext={() => router.push('/summary')}
          showNext={true}
          textSizeClass="text-[12px]"
          fontWeightClass="font-semibold"
          rightPaddingClass="pr-10"
        />
      </div>
    </main>
  );
}
