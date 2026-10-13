'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import FooterNavigation from '@/components/FooterNavigation';
import NameStep from '@/components/NameStep';
import CityStep from '@/components/CityStep';
import ProcessingStep from '@/components/ProcessingStep';
import ThankYouStep from '@/components/ThankYouStep';
import RotatingRectangles from '@/components/RotatingRectangles';

// Function: TestingPage
export default function TestingPage() {
  const router = useRouter();

  // Internal sub-step state
  const [subStep, setSubStep] = useState<
    'name' | 'city' | 'processing' | 'thank-you'
  >('name');

  // Navigate back to the home page
  const handleBack = () => {
    router.push('/');
  };

  // Handle Proceed
  const handleNext =
    subStep === 'thank-you'
      ? () => {
          router.push('/result');
        }
      : undefined;

  return (
    <main className="relative w-screen h-screen bg-white text-[#1A1B1C] flex flex-col justify-between select-none overflow-hidden pb-16">
      {/* Global Header */}
      <Header stepLabel="INTRO" />

      {/* Sub-header snippet */}
      <div className="absolute top-16 left-8 text-left z-20">
        <p className="font-semibold text-xs text-gray-700">TO START ANALYSIS</p>
      </div>

      {/* Center Concentric Diamonds & Content Container */}
      <div className="absolute inset-0 flex items-center justify-center -mt-32 pointer-events-none z-10">
        <RotatingRectangles variant="large" />

        {/* Active Step Component Renders Here
         * Base (< 640px): tighter max-w and smaller padding/text scaling
         * sm: (>= 640px): normal desktop/tablet sizing */}
        <div
          role="region"
          aria-live="polite"
          aria-label="Consultation step"
          className="relative z-25 pointer-events-auto max-w-[260px] sm:max-w-lg w-full px-4 sm:px-6 flex flex-col items-center text-[13px] sm:text-[15px]"
        >
          {subStep === 'name' && <NameStep onNext={() => setSubStep('city')} />}

          {subStep === 'city' && (
            <CityStep
              onProcessing={() => setSubStep('processing')}
              onSuccess={() => setSubStep('thank-you')}
            />
          )}

          {subStep === 'processing' && <ProcessingStep />}

          {subStep === 'thank-you' && <ThankYouStep />}
        </div>
      </div>

      {/* Processing Page Footer */}
      {subStep === 'processing' && (
        <div className="absolute bottom-8 sm:bottom-8 left-6 sm:left-0 w-full px-4 sm:px-8 z-30">
          <FooterNavigation
            onBack={handleBack}
            textSizeClass="text-[12px]"
            fontWeightClass="font-semibold"
          />
        </div>
      )}

      {/* Thank You Page Footer */}
      {subStep !== 'processing' && (
        <div className="absolute bottom-8 sm:bottom-8 left-6 sm:left-0 w-full px-4 sm:px-8 z-30">
          <FooterNavigation
            onBack={handleBack}
            onNext={handleNext}
            textSizeClass="text-[12px]"
            fontWeightClass="font-semibold"
          />
        </div>
      )}
    </main>
  );
}
