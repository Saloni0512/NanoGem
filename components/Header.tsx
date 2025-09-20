import React from 'react';
import { SparklesIcon, GalleryIcon, HomeIcon } from './Icons';

interface HeaderProps {
    onOpenGallery: () => void;
    onNavigateHome: () => void;
    showHomeButton: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGallery, onNavigateHome, showHomeButton }) => {
  return (
    <header className="bg-black/70 backdrop-blur-sm border-b border-gray-700 shadow-lg sticky top-0 z-20">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex-1 flex justify-start items-center gap-4">
            <button
                onClick={onOpenGallery}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex-shrink-0"
                aria-label="Open design gallery"
            >
                <GalleryIcon className="w-5 h-5" />
            </button>
            {showHomeButton && (
                <button
                    onClick={onNavigateHome}
                    className="bg-gray-800 border border-gray-600 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold shadow whitespace-nowrap"
                    aria-label=" Back to Studio home"
                >
                     Back to Studio home
                </button>
            )}
        </div>
        <div 
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={onNavigateHome}
            aria-label="Go to home screen"
        >
            <SparklesIcon className="w-8 h-8 text-pink-400 mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            <span className="text-pink-300"> NanoGem <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">Studio</span></span>
            </h1>
        </div>
        <div className="flex-1 hidden md:flex justify-end"></div>
      </div>
    </header>
  );
};