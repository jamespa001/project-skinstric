'use client';

import React, { useState, useEffect } from 'react';
import { useSkinstricState } from '@/hooks/useSkinstricState';

interface NameStepProps {
  onNext: () => void;
}

// Function: NameStep
export default function NameStep({ onNext }: NameStepProps) {
  const { userData, updateUserData } = useSkinstricState();
  const [name, setName] = useState(userData.name || '');
  const [error, setError] = useState('');

  useEffect(() => {
    return () => {
      // Clear inputs or reset state when component unmounts (navigating away)
      setName('');
    };
  }, []);

  const isValidString = (val: string) => {
    return val.trim().length > 0 && !/\d/.test(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setError('');

      if (!isValidString(name)) {
        setError('Please enter a valid name (no numbers allowed).');
        return;
      }

      // Update global state and persist via our custom hook (syncs to localStorage)
      updateUserData({ name: name.trim(), error: null });

      // Trigger transition to next step
      onNext();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center text-center w-full">
        <p
          id="name-instruction"
          className="text-sm text-gray-700 tracking-wider uppercase mb-1"
        >
          CLICK TO TYPE
        </p>
        <input
          id="name-input"
          aria-label="Your name"
          aria-describedby="name-instruction"
          type="text"
          name="name"
          autoComplete="off"
          autoFocus
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError('');
          }}
          onKeyDown={handleKeyDown}
          placeholder="Introduce Yourself"
          className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10 placeholder-gray-500"
        />
        {error && (
          <p
            className="text-red-600 text-xs tracking-wide pt-3 font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
