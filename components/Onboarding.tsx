
import React from 'react';

interface OnboardingProps {
  onStart: () => void;
}

const SPARKLE_COUNT = 35;
const sparkles = Array.from({ length: SPARKLE_COUNT });

export const Onboarding: React.FC<OnboardingProps> = ({ onStart }) => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white font-sans relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {/* Orbs */}
        <div className="floating-orb" style={{ top: '10%', left: '15%', width: '150px', height: '150px', animationDelay: '0s' }}></div>
        <div className="floating-orb" style={{ top: '60%', left: '80%', width: '200px', height: '200px', animationDelay: '1s' }}></div>
        <div className="floating-orb" style={{ top: '70%', left: '10%', width: '100px', height: '100px', animationDelay: '2s' }}></div>
        <div className="floating-orb" style={{ top: '20%', left: '70%', width: '120px', height: '120px', animationDelay: '3s' }}></div>
        <div className="floating-orb" style={{ top: '10%', left: '15%', width: '120px', height: '120px', animationDelay: '4s' }}></div>
        
        {/* Sparkles */}
        {sparkles.map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`, // 2s to 5s duration
              animationDelay: `${Math.random() * 4}s`,      // 0s to 4s delay
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-shadow-glow">
          Experience nail art at your fingertips
        </h1>
        <button
          onClick={onStart}
          className="bg-pink-500 text-white px-20 py-3 rounded-full text-xl font-medium hover:bg-pink-700 transition-all shadow-lg hover:shadow-pink-500/50 transform hover:scale-105"
          aria-label="Start the nail art experience"
        >
          Welcome to NanoGem 💅🏻
        </button>
      </div>
    </div>
  );
};
