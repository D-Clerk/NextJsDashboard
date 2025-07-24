// src/app/components/DevConsoleSuppressor.jsx
'use client';

import { useEffect } from 'react';

export default function DevConsoleSuppressor() {
  useEffect(() => {
    const originalWarn = console.warn;
    const originalError = console.error;

    const suppressHydrationMessages = (message) => {
      if (typeof message !== 'string') return false;
      // Suppress hydration warnings/errors mentioning "hydration" and common extension keywords
      const lower = message.toLowerCase();
      return (
        lower.includes('hydration') ||
        lower.includes('norton') ||
        lower.includes('password manager') ||
        lower.includes('extension')
      );
    };

    console.warn = (message, ...args) => {
      if (suppressHydrationMessages(message)) return;
      originalWarn(message, ...args);
    };

    console.error = (message, ...args) => {
      if (suppressHydrationMessages(message)) return;
      originalError(message, ...args);
    };

    return () => {
      console.warn = originalWarn; // cleanup
      console.error = originalError;
    };
  }, []);

  return null;
}
