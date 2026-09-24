'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import FooterNavigation from '@/components/FooterNavigation';
import { AnalysisData, getSortedScores } from '@/services/skinstricApi';
import radioButtonImg from '@/public/assets/radio-button.png';
import activeRadioButtonImg from '@/public/assets/radio-button-active.png';

// Function: SummaryPage
export default function SummaryPage() {
  const router = useRouter();

  // Lazy initialize state from localStorage to prevent synchronous setState warnings during mount
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem('skinstric_analysis');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error(
        'Failed to parse skinstric_analysis from localStorage:',
        error,
      );
      return null;
    }
  });

  const [activeCategory, setActiveCategory] = useState<
    'race' | 'age' | 'gender'
  >('race');

  const [selectedValues, setSelectedValues] = useState(() => {
    if (typeof window === 'undefined') return { race: '', age: '', gender: '' };
    try {
      const stored = localStorage.getItem('skinstric_analysis');
      if (stored) {
        const parsed: AnalysisData = JSON.parse(stored);
        return {
          race: getSortedScores(parsed.race)[0]?.key || '',
          age: getSortedScores(parsed.age)[0]?.key || '',
          gender: getSortedScores(parsed.gender)[0]?.key || '',
        };
      }
    } catch (error) {
      console.error(
        'Failed to parse selected values from localStorage:',
        error,
      );
    }
    return { race: '', age: '', gender: '' };
  });

  const currentScoresMap = analysisData ? analysisData[activeCategory] : null;

  const sortedScores = currentScoresMap
    ? Object.entries(currentScoresMap)
        .sort(([, a], [, b]) => b - a)
        .map(([key, value]) => ({
          key,
          percentage: (value * 100).toFixed(2),
          raw: value,
        }))
    : [];

  const currentSelection = selectedValues[activeCategory];
  const currentSelectionScore =
    sortedScores.find((s) => s.key === currentSelection)?.percentage || '0';

  if (!analysisData) {
    return (
      <div className="p-12 text-center text-xs tracking-wider">
        Loading analysis data...
      </div>
    );
  }

  // Circular progress calculations
  const radius = 49.15;
  const circumference = 2 * Math.PI * radius;
  const targetScore = parseFloat(currentSelectionScore);
  const strokeDashoffset = circumference - (circumference * targetScore) / 100;

  const categoryLabels: {
    key: 'race' | 'age' | 'gender';
    label: string;
    title: string;
  }[] = [
    { key: 'race', label: selectedValues.race || 'RACE', title: 'RACE' },
    { key: 'age', label: selectedValues.age || 'AGE', title: 'AGE' },
    { key: 'gender', label: selectedValues.gender || 'SEX', title: 'SEX' },
  ];

  // Format selection display text for the center grid
  const formattedSelectionDisplay = (() => {
    if (!currentSelection) return '';
    if (activeCategory === 'age') {
      return `${currentSelection} y.o.`;
    }
    if (activeCategory === 'gender') {
      return currentSelection.toUpperCase();
    }
    // Capitalize ONLY the first letter of the entire string (e.g., "Southeast asian")
    return (
      currentSelection.charAt(0).toUpperCase() +
      currentSelection.slice(1).toLowerCase()
    );
  })();

  return (
    <>
      {/* Global Header */}
      <Header stepLabel="INTRO" />

      {/* Main */}
      <main className="relative w-screen min-h-screen bg-white text-[#1A1B1C] flex flex-col select-none overflow-x-hidden p-8 md:pt-0 md:px-8 ">
        {/* Main Content Area */}
        <div className="flex flex-col w-full -mt-4 md:mt-8">
          <div className="text-start mb-6 md:mb-10">
            <h2 className="text-base md:text-base font-semibold mb-1 leading-[24px]">
              A.I. ANALYSIS
            </h2>
            <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">
              DEMOGRAPHICS
            </h3>
            <h4 className="text-sm mt-2 leading-[24px]">
              PREDICTED RACE &amp; AGE
            </h4>
          </div>

          <div className="grid mt-6 md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 md:gap-4 md:mt-8">
            {/* Left Navigation Buttons */}
            <div className="bg-white space-y-3 md:flex md:flex-col h-[62%]">
              {categoryLabels.map((cat) => {
                const isActive = activeCategory === cat.key;
                const displayLabel = (() => {
                  const val = cat.label;
                  if (val === 'RACE' || val === 'AGE' || val === 'SEX')
                    return val;

                  if (cat.key === 'gender') {
                    return val.toUpperCase();
                  }
                  if (cat.key === 'race') {
                    return (
                      val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
                    );
                  }
                  return val;
                })();

                return (
                  <div
                    key={cat.key}
                    role="tab"
                    tabIndex={0}
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`p-3 cursor-pointer flex-1 flex flex-col justify-between border-t transition-colors ${
                      isActive
                        ? 'bg-[#1A1B1C] text-white hover:bg-black'
                        : 'bg-[#F3F3F4] text-[#1A1B1C] hover:bg-[#E1E1E2]'
                    }`}
                  >
                    <p className="text-base font-semibold">{displayLabel}</p>
                    <h4
                      className={`text-base font-semibold mb-1 ${
                        isActive ? 'text-white' : 'text-[#1A1B1C]'
                      }`}
                    >
                      {cat.title}
                    </h4>
                  </div>
                );
              })}
            </div>

            {/* Center Graphic & Visualization */}
            <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t">
              <p className="hidden md:block md:absolute text-[40px] mb-2 left-5 top-2">
                {formattedSelectionDisplay}
              </p>
              <div className="relative md:absolute w-full max-w-[384px] aspect-square mb-4 md:right-5 md:bottom-2">
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '384px',
                    position: 'relative',
                    transform: 'scale(1)',
                    transformOrigin: 'center center',
                  }}
                >
                  <svg
                    className="CircularProgressbar text-[#1A1B1C]"
                    viewBox="0 0 100 100"
                    data-test-id="CircularProgressbar"
                  >
                    <path
                      className="CircularProgressbar-trail"
                      d="
                      M 50,50
                      m 0,-49.15
                      a 49.15,49.15 0 1 1 0,98.3
                      a 49.15,49.15 0 1 1 0,-98.3
                    "
                      strokeWidth="1.7"
                      fillOpacity="0"
                      style={{
                        stroke: '#E5E7EB',
                        strokeLinecap: 'butt',
                        strokeDasharray: `${circumference}px, ${circumference}px`,
                        strokeDashoffset: '0px',
                      }}
                    />
                    <path
                      className="CircularProgressbar-path"
                      d="
                      M 50,50
                      m 0,-49.15
                      a 49.15,49.15 0 1 1 0,98.3
                      a 49.15,49.15 0 1 1 0,-98.3
                    "
                      strokeWidth="1.7"
                      fillOpacity="0"
                      style={{
                        stroke: 'rgb(26, 27, 28)',
                        strokeLinecap: 'butt',
                        transition:
                          'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        strokeDasharray: `${circumference}px, ${circumference}px`,
                        strokeDashoffset: `${strokeDashoffset}px`,
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-3xl md:text-[40px] font-normal">
                      {currentSelectionScore}
                      <span className="absolute text-xl md:text-3xl">%</span>
                    </p>
                  </div>
                </div>
              </div>
              <p className="md:absolute text-xs text-[#A0A4AB] md:text-sm lg:text-base font-normal mb-1 leading-[24px] md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
                If A.I. estimate is wrong, select the correct one.
              </p>
            </div>

            {/* Right Breakdown Table */}
            <div className="bg-gray-100 pt-4 pb-4 md:border-t overflow-y-auto max-h-[57vh]">
              <div className="space-y-0">
                <div className="flex justify-between px-4">
                  <h4 className="text-base leading-[24px] tracking-tight font-semibold mb-2 uppercase">
                    {activeCategory}
                  </h4>
                  <h4 className="text-base leading-[24px] tracking-tight font-semibold mb-2">
                    A.I. CONFIDENCE
                  </h4>
                </div>

                {sortedScores.map((item) => {
                  const isSelected = currentSelection === item.key;

                  // Format item display key for the right table rows
                  const itemDisplayKey = (() => {
                    if (activeCategory === 'gender') {
                      return item.key.toUpperCase();
                    }
                    if (activeCategory === 'race') {
                      return (
                        item.key.charAt(0).toUpperCase() +
                        item.key.slice(1).toLowerCase()
                      );
                    }
                    return item.key;
                  })();

                  return (
                    <div
                      key={item.key}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() =>
                        setSelectedValues((prev) => ({
                          ...prev,
                          [activeCategory]: item.key,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedValues((prev) => ({
                            ...prev,
                            [activeCategory]: item.key,
                          }));
                        }
                      }}
                      className={`flex items-center justify-between h-[48px] px-4 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#1A1B1C] text-white hover:bg-black'
                          : 'hover:bg-[#E1E1E2] text-[#1A1B1C]'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <Image
                          alt="radio button"
                          loading="lazy"
                          width={12}
                          height={12}
                          decoding="async"
                          className="w-[12px] h-[12px] mr-2"
                          src={
                            isSelected ? activeRadioButtonImg : radioButtonImg
                          }
                        />
                        <span className="font-normal text-base leading-6 tracking-tight">
                          {itemDisplayKey}
                        </span>
                      </div>
                      <span className="font-normal text-base leading-6 tracking-tight">
                        {item.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full h-[160px]"></div>
          </div>
        </div>

        {/* Footer Navigation Component */}
        <div className="fixed bottom-22 left-0 w-full pt-2 pb-6 md:py-8 bg-white/90 backdrop-blur-md border-gray-100 z-50 pl-8 pr-0 md:px-8">
          <FooterNavigation
            onBack={() => router.push('/select')}
            onNext={() => router.push('/')}
            showNext={true}
            nextLabel="HOME"
            textSizeClass="text-[12px]"
            fontWeightClass="font-bold"
            rightPaddingClass="pr-10"
            useAbsoluteBackOnMobile={false}
            useAbsoluteNextOnMobile={false}
          />
        </div>
      </main>
    </>
  );
}
