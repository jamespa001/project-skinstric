'use client';

import React from 'react';
import Image from 'next/image';

interface FooterNavigationProps {
  onBack?: () => void;
  backLabel?: string;
  backMobileLabel?: string;
  onNext?: () => void;
  nextLabel?: string;
  nextMobileLabel?: string;
  showNext?: boolean;
  showBack?: boolean;
  inverted?: boolean;
  textSizeClass?: string;
  fontWeightClass?: string;
  rightPaddingClass?: string;
  useAbsoluteBackOnMobile?: boolean;
  useAbsoluteNextOnMobile?: boolean;
  mobileTopOffsetClass?: string;
}

// Function: FooterNavigation
export default function FooterNavigation({
  onBack,
  backLabel = 'BACK',
  backMobileLabel,
  onNext,
  nextLabel = 'PROCEED',
  nextMobileLabel,
  showNext = !!onNext,
  showBack = !!onBack,
  inverted = false,
  textSizeClass = 'text-[8.5px]',
  fontWeightClass = 'font-extrabold',
  rightPaddingClass = 'pr-14',
  useAbsoluteBackOnMobile = true,
  useAbsoluteNextOnMobile = true,
  mobileTopOffsetClass = 'max-[767px]:-top-36',
}: FooterNavigationProps) {
  return (
    <div
      className={`relative w-full flex justify-between items-center pl-2 ${rightPaddingClass} sm:px-2`}
    >
      {/* Back Button (Left) */}
      <div>
        {showBack && onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label={backLabel}
            className={`flex items-center group focus:outline-none cursor-pointer ${
              useAbsoluteBackOnMobile
                ? `max-[767px]:absolute ${mobileTopOffsetClass} max-[767px]:left-[15px] max-[767px]:z-50 md:static md:top-auto md:left-auto`
                : 'md:static md:top-auto md:left-auto'
            }`}
          >
            {/* Mobile (< 640px): Rotated box with text inside */}
            <div
              className={`flex sm:hidden w-12 h-12 border rotate-45 items-center justify-center transition-transform duration-300 sm:group-hover:scale-110 ${
                inverted
                  ? 'border-white bg-gray-400/10 text-white'
                  : 'border-black bg-white text-black'
              }`}
              aria-hidden="true"
            >
              <span
                className={`${textSizeClass} ${fontWeightClass} text-[12px] font-semibold tracking-tighter -rotate-45 select-none whitespace-nowrap`}
              >
                {backMobileLabel || backLabel}
              </span>
            </div>

            {/* Desktop (sm and up): Original Icon + Text layout */}
            <div
              className={`hidden sm:flex w-10 h-10 border rotate-45 items-center justify-center transition-transform duration-300 sm:group-hover:scale-110 ${
                inverted ? 'border-white bg-gray-400/10' : 'border-black'
              }`}
              aria-hidden="true"
            >
              <Image
                src="/assets/arrow-left.png"
                alt=""
                width={12}
                height={12}
                style={{ width: 'auto', height: 'auto' }}
                className={`object-contain -rotate-45 ${
                  inverted ? 'brightness-0 invert' : ''
                }`}
              />
            </div>
            <span
              className={`hidden sm:inline ml-7 text-sm tracking-tight uppercase font-semibold ${
                inverted
                  ? 'text-white sm:hover:text-white/80'
                  : 'text-black sm:hover:text-black'
              }`}
            >
              {backLabel}
            </span>
          </button>
        ) : (
          <div className="w-12 sm:w-24" aria-hidden="true" />
        )}
      </div>

      {/* Next Button (Right) */}
      <div>
        {showNext && onNext ? (
          <button
            type="button"
            onClick={onNext}
            aria-label={nextLabel}
            className={`flex items-center group focus:outline-none cursor-pointer ${
              useAbsoluteNextOnMobile
                ? `max-[767px]:absolute ${mobileTopOffsetClass} max-[767px]:right-12 max-[767px]:z-50 md:static md:top-auto md:right-auto`
                : 'md:static md:top-auto md:right-auto'
            }`}
          >
            <span
              className={`hidden sm:inline mr-7 text-sm tracking-tight uppercase font-semibold ${
                inverted
                  ? 'text-white sm:hover:text-white/80'
                  : 'text-black sm:hover:text-black'
              }`}
            >
              {nextLabel}
            </span>

            {/* Desktop (sm and up): Original layout */}
            <div
              className={`hidden sm:flex w-10 h-10 border rotate-45 items-center justify-center transition-transform duration-300 sm:group-hover:scale-110 ${
                inverted ? 'border-white bg-black/30' : 'border-black'
              }`}
              aria-hidden="true"
            >
              <Image
                src="/assets/arrow-right.png"
                alt=""
                width={12}
                height={12}
                style={{ width: 'auto', height: 'auto' }}
                className={`object-contain -rotate-45 ${
                  inverted ? 'brightness-0 invert' : ''
                }`}
              />
            </div>

            {/* Mobile (< 640px): Rotated box with text inside */}
            <div
              className={`flex sm:hidden w-12 h-12 border rotate-45 items-center justify-center transition-transform duration-300 sm:group-hover:scale-110 ${
                inverted
                  ? 'border-white bg-black/30 text-white'
                  : 'border-black bg-white text-black'
              }`}
              aria-hidden="true"
            >
              <span
                className={`${textSizeClass} ${fontWeightClass} tracking-tighter -rotate-45 select-none whitespace-nowrap`}
              >
                {nextMobileLabel || nextLabel}
              </span>
            </div>
          </button>
        ) : (
          <div className="w-12 sm:w-24" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
