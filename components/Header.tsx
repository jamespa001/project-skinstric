'use client';

import Link from 'next/link';

interface HeaderProps {
  stepLabel?: string;
  showEnterCode?: boolean;
}

// Function: Header
export default function Header({
  stepLabel = 'INTRO',
  showEnterCode = true,
}: HeaderProps) {
  return (
    <header className="flex flex-row h-[64px] w-full justify-between items-center pt-2 relative z-[1000]">
      <div className="flex flex-row items-center scale-75">
        <Link
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-3 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#1A1B1C]"
          href="/"
        >
          SKINSTRIC
        </Link>
        <span
          className="text-slate-900 font-semibold text-sm"
          aria-hidden="true"
        >
          [
        </span>
        <p className="text-gray-700 font-semibold text-sm ml-1.5 mr-1.5 uppercase">
          {stepLabel}
        </p>
        <span
          className="text-slate-900 font-semibold text-sm"
          aria-hidden="true"
        >
          ]
        </span>
      </div>

      {/* Right block container */}
      {showEnterCode && (
        <div
          role="status"
          aria-label="Enter code status"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold shadow h-9 px-4 py-2 text-[#FCFCFC] text-[10px] scale-[0.8] bg-[#1A1B1C] leading-[16px] cursor-default select-none md:mr-4"
        >
          ENTER CODE
        </div>
      )}
    </header>
  );
}
