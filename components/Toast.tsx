

import React, { useEffect } from 'react';
import { SaveIcon } from './Icons';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Show for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg border z-50 transition-all duration-300 ease-in-out bg-black border-pink-600 ${message ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      role="alert"
      aria-live="assertive"
    >
      {message && (
        <>
          <SaveIcon className="w-5 h-5 text-pink-400" />
          <p className="font-semibold text-pink-300">{message}</p>
        </>
      )}
    </div>
  );
};