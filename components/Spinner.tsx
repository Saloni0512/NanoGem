import React from 'react';

export const Spinner: React.FC = () => (
  <svg
    className="h-10 w-10 text-pink-400"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <circle cx="4" cy="12" r="3">
        <animate
            attributeName="r"
            values="3;5;3"
            dur="1.2s"
            repeatCount="indefinite"
            begin="0s"
        />
    </circle>
    <circle cx="12" cy="12" r="3">
        <animate
            attributeName="r"
            values="3;5;3"
            dur="1.2s"
            repeatCount="indefinite"
            begin="0.2s"
        />
    </circle>
    <circle cx="20" cy="12" r="3">
        <animate
            attributeName="r"
            values="3;5;3"
            dur="1.2s"
            repeatCount="indefinite"
            begin="0.4s"
        />
    </circle>
  </svg>
);