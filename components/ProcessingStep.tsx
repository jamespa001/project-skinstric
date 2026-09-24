'use client';

import LoadingDots from './LoadingDots';

// Function: ProcessingStep
export default function ProcessingStep() {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 select-none">
      {/* Content Container */}
      <p className="font-normal text-[18px] tracking-wide text-gray-500">
        Processing submission
      </p>

      {/* Animated dots */}
      <LoadingDots />
    </div>
  );
}
