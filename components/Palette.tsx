

import React from 'react';
import type { NailArtDesign } from '../types';
import { BrushIcon } from './Icons';

interface PaletteProps {
  designs: NailArtDesign[];
  onSelect: (design: NailArtDesign) => void;
  selectedDesign: NailArtDesign | null;
  isDisabled: boolean;
}

export const Palette: React.FC<PaletteProps> = ({ designs, onSelect, selectedDesign, isDisabled }) => {
  return (
    <div className="bg-black p-6 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-xl font-bold text-pink-400 mb-4">Pick a Style</h2>
      <div className="space-y-3">
        {designs.map((design) => {
          const isSelected = selectedDesign?.title === design.title;
          return (
            <button
              key={design.title}
              onClick={() => onSelect(design)}
              disabled={isDisabled}
              className={`w-full text-left p-4 rounded-lg transition-all flex items-center gap-4
                ${isSelected ? 'bg-pink-500 text-white shadow-md ring-2 ring-pink-300' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <BrushIcon className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">{design.title}</p>
                <p className="text-sm opacity-80">{design.prompt}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};