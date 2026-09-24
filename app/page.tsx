'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import FooterNavigation from '@/components/FooterNavigation';
import StaticRectangles from '@/components/StaticRectangles';

// Function: LandingPage
export default function LandingPage() {
  const router = useRouter();
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  return (
    <main className="relative w-screen h-screen bg-white text-[#1A1B1C] flex flex-col justify-between select-none overflow-hidden pb-16">
      {/* 1. Shared Header Component */}
      <Header />
      {/* =================================================== */}
      {/* MOBILE & TABLET LAYOUT (< 1024px)               */}
      {/* =================================================== */}
      <div className="flex -translate-y-20 sm:translate-y-0 lg:hidden flex-col items-center justify-center my-auto px-4 z-10 w-full relative h-full">
        {/* Unified Static Rectangles with built-in responsive sizing */}
        <StaticRectangles />

        {/* Inner Content centered inside the static frames */}
        <div className="relative z-20 flex flex-col items-center text-center space-y-4 max-w-[280px] sm:max-w-[320px]">
          <h1 className="text-[44px] sm:text-[58px] tracking-tighter sm:tracking-tight leading-none text-[#1A1B1C]">
            Sophisticated
            <br />
            <span className="block text-[#1A1B1C]">skincare</span>
          </h1>

          <p className="text-[12px] sm:text-[16px] tracking-tight font-semibold text-gray-400 leading-relaxed max-w-[260px] sm:max-w-none">
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>

          {/* Enter Experience Button */}
          <div
            onClick={() => router.push('/testing')}
            className="inline-flex items-center gap-3 sm:gap-3 -mt-2 sm:mt-0 cursor-pointer group sm:pt-0 pointer-events-auto hover:scale-105 duration-300 "
          >
            <span className="text-[9px] sm:text-[12px] uppercase tracking-tighter sm:tracking-tight font-bold sm:font-extrabold text-[#1A1B1C]">
              ENTER EXPERIENCE
            </span>
            <div className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] -translate-y-0.5 border border-solid border-black rotate-45 flex items-center justify-center">
              <img
                src="/assets/arrow-right.png"
                alt="Arrow Icon"
                className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] sm:translate-x-0.5 sm:-translate-y-0.5 object-contain select-none"
                style={{ transform: 'rotate(-45deg)' }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* =================================================== */}
      {/* DESKTOP LAYOUT (>= 1024px)                      */}
      {/* =================================================== */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {/* Center Heading Text Block (Shifts and changes alignment dynamically) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <h1
            className="text-[100px] text-[#1A1B1C] font-normal tracking-tighter leading-none select-none transition-all duration-700 ease-out pointer-events-auto"
            style={{
              fontFamily: 'var(--font-roobert), var(--font-inter), sans-serif',
              transform:
                hoveredSide === 'left'
                  ? 'translateX(340px)'
                  : hoveredSide === 'right'
                    ? 'translateX(-340px)'
                    : 'translateX(0px)',
              textAlign:
                hoveredSide === 'left'
                  ? 'right'
                  : hoveredSide === 'right'
                    ? 'left'
                    : 'center',
            }}
          >
            Sophisticated
            <br />
            <span className="block text-[#1A1B1C]">skincare</span>
          </h1>
        </div>

        {/* Desktop Description Paragraph (Bottom-Left) */}
        <div className="absolute bottom-16 left-20 z-20 max-w-[320px] pointer-events-auto">
          <p className="text-[13px] tracking-tight font-normal text-black uppercase leading-relaxed">
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>
        </div>

        {/* --- LEFT ROTATED CONTAINER BLOCK --- */}
        <div
          className="absolute pointer-events-auto cursor-pointer group z-25 transition-opacity duration-500 ease-out"
          style={{
            width: '720px',
            height: '720px',
            top: '50%',
            left: '-548px',
            transform: 'translateY(-50%) rotate(45deg)',
            transformOrigin: 'center',
            opacity: hoveredSide === 'right' ? 0 : 1,
            pointerEvents: hoveredSide === 'right' ? 'none' : 'auto',
          }}
          onMouseEnter={() => setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* 1. Diamond Border */}
          <svg
            width="100%"
            height="100%"
            className="absolute inset-0 overflow-visible pointer-events-none"
          >
            <rect
              x="1"
              y="1"
              width="718"
              height="718"
              fill="none"
              stroke="#A0A4AB"
              strokeWidth="1"
              strokeDasharray="0.1 2"
              strokeLinecap="round"
            />
          </svg>

          {/* 2. Inner Content */}
          <div
            className="absolute"
            style={{
              top: '7%',
              right: '7%',
              transform: 'rotate(-45deg)',
              transformOrigin: 'right bottom',
            }}
          >
            <div className="flex items-center gap-4 text-sm font-normal text-[#1A1B1C] group-hover:opacity-80 transition-opacity">
              <div className="w-[30px] h-[30px] border border-solid border-black rotate-45 group-hover:scale-110 duration-300 flex items-center justify-center">
                <img
                  src="/assets/arrow-left.png"
                  alt="Arrow Icon"
                  className="w-[10px] h-[10px] object-contain select-none rotate-180"
                  style={{ transform: 'rotate(-225deg)' }}
                />
              </div>
              <span className="text-xs uppercase tracking-widest font-medium ml-2">
                DISCOVER A.I.
              </span>
            </div>
          </div>
        </div>

        {/* --- RIGHT ROTATED CONTAINER BLOCK --- */}
        <div
          className="absolute pointer-events-auto cursor-pointer group z-25 transition-opacity duration-500 ease-out"
          style={{
            width: '720px',
            height: '720px',
            top: '50%',
            right: '-548px',
            transform: 'translateY(-50%) rotate(-45deg)',
            transformOrigin: 'center',
            opacity: hoveredSide === 'left' ? 0 : 1,
            pointerEvents: hoveredSide === 'left' ? 'none' : 'auto',
          }}
          onMouseEnter={() => setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={() => router.push('/testing')}
        >
          {/* 1. Diamond Border */}
          <svg
            width="100%"
            height="100%"
            className="absolute inset-0 overflow-visible pointer-events-none"
          >
            <rect
              x="1"
              y="1"
              width="718"
              height="718"
              fill="none"
              stroke="#A0A4AB"
              strokeWidth="1"
              strokeDasharray="0.1 2"
              strokeLinecap="round"
            />
          </svg>

          {/* 2. Inner Content */}
          <div
            className="absolute"
            style={{
              top: '7%',
              left: '7%',
              transform: 'rotate(45deg)',
              transformOrigin: 'left bottom',
            }}
          >
            <div className="flex items-center gap-4 text-sm font-normal text-[#1A1B1C] group-hover:opacity-80 transition-opacity flex-row-reverse">
              <div className="w-[30px] h-[30px] border border-solid border-black rotate-45 group-hover:scale-110 duration-300 flex items-center justify-center">
                <img
                  src="/assets/arrow-right.png"
                  alt="Arrow Icon"
                  className="w-[10px] h-[10px] object-contain select-none"
                  style={{ transform: 'rotate(-45deg)' }}
                />
              </div>
              <span className="text-xs uppercase tracking-widest font-medium mr-2">
                TAKE TEST
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* 3. Shared Footer Component */}
      <div className="hidden lg:block">
        <FooterNavigation showBack={false} onBack={() => {}} />
      </div>
    </main>
  );
}
