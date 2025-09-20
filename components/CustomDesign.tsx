import React, { useState } from 'react';
import { NailPolishIcon } from './Icons';

interface CustomDesignProps {
  onSubmit: (prompt: string) => void;
  isDisabled: boolean;
}

export const CustomDesign: React.FC<CustomDesignProps> = ({ onSubmit, isDisabled }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isDisabled) {
      onSubmit(prompt.trim());
    }
  };

  return (
    <div className="bg-pink-900/20 p-6 rounded-xl shadow-lg border border-pink-700/50">
      <h2 className="text-xl font-bold text-pink-300 mb-4">Define Your Own Design</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'chrome metallic finish with tiny stars'"
          disabled={isDisabled}
          className="w-full h-24 p-3 bg-gray-900 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-white placeholder-gray-500 disabled:opacity-50"
          aria-label="Custom nail art design prompt"
        />
        <button
          type="submit"
          disabled={isDisabled || !prompt.trim()}
          className="w-full flex items-center justify-center gap-2 bg-pink-500 text-white px-4 py-2.5 rounded-lg hover:bg-pink-600 transition-colors font-semibold shadow disabled:bg-pink-500/50 disabled:cursor-not-allowed"
        >
          <NailPolishIcon className="w-5 h-5" />
          <span>Generate My Design</span>
        </button>
      </form>
    </div>
  );
};