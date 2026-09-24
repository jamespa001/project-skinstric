'use client';

import { useState, useEffect } from 'react';
import { SkinstricUserData } from '@/types/skinstric';

const STORAGE_KEY = 'skinstric_user_session_v1';

const initialUserData: SkinstricUserData = {
  name: '',
  city: '',
  imageFile: null,
  imagePreviewUrl: null,
  captureMethod: null,
  isAnalyzing: false,
  analysisResults: null,
  error: null,
};

// Function: useSkinstricState
export function useSkinstricState() {
  const [userData, setUserData] = useState<SkinstricUserData>(() => {
    // Check if window is defined (to safely handle SSR in Next.js)
    if (typeof window === 'undefined') return initialUserData;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        // Note: File objects can't be stored in localStorage,
        // so we parse the structural state minus the raw File object
        const parsed = JSON.parse(saved);
        return { ...initialUserData, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    }
    return initialUserData;
  });

  // Sync state changes to localStorage automatically
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      // Exclude raw File object from JSON stringification since it cannot be serialized
      const { imageFile, ...stateToSave } = userData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [userData]);

  // Helper to update specific fields cleanly
  const updateUserData = (fields: Partial<SkinstricUserData>) => {
    setUserData((prev) => ({ ...prev, ...fields }));
  };

  // Helper to clear session data
  const resetUserData = () => {
    setUserData(initialUserData);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    userData,
    updateUserData,
    resetUserData,
  };
}
