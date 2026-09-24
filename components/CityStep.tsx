'use client';

import React, { useState, useEffect } from 'react';
import { useSkinstricState } from '@/hooks/useSkinstricState';
import { callSkinstricPhaseOne } from '@/services/skinstricApi';

interface CityStepProps {
  onProcessing: () => void;
  onSuccess: () => void;
}

// Function: CityStep
export default function CityStep({ onProcessing, onSuccess }: CityStepProps) {
  const { userData, updateUserData } = useSkinstricState();
  const [city, setCity] = useState(userData.city || '');
  const [error, setError] = useState('');

  useEffect(() => {
    return () => {
      // Clear inputs or reset state when component unmounts (navigating away)
      setCity('');
    };
  }, []);

  const isValidString = (val: string) => {
    return val.trim().length > 0 && !/\d/.test(val);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setError('');

      if (!isValidString(city)) {
        setError('Please enter a valid city (no numbers allowed).');
        return;
      }

      const name =
        userData.name ||
        localStorage.getItem('skinstric_user_name') ||
        'Unknown';
      const location = city.trim();

      // 1. Trigger container to show ProcessingStep
      onProcessing();

      try {
        updateUserData({ city: location, error: null });

        // Call Phase 1 API using our centralized service along with a 3-second minimum timer
        const apiCall = callSkinstricPhaseOne({ name, location });
        const minTimer = new Promise((resolve) => setTimeout(resolve, 3000));

        const [data] = await Promise.all([apiCall, minTimer]);

        // 2. Trigger container to show ThankYouStep
        onSuccess();
      } catch (err) {
        console.error(err);
        setError('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center text-center w-full">
        <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
          CLICK TO TYPE
        </p>
        <input
          type="text"
          name="city"
          autoComplete="off"
          autoFocus
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            if (error) setError('');
          }}
          onKeyDown={handleKeyDown}
          placeholder="your city name"
          className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10 placeholder-[#1A1B1C]/40"
        />
        {error && (
          <p className="text-red-500 text-xs tracking-wide pt-3">{error}</p>
        )}
      </div>
    </div>
  );
}
