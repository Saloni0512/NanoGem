import React from 'react';
import { Uploader } from './Uploader';
import type { UploadedImage } from '../types';
import { SimpleSparkleIcon, BrushIcon } from './Icons';

interface HomeScreenProps {
  onImageUpload: (file: File) => void;
  uploadedImage: UploadedImage | null;
  onNavigateToPalette: () => void;
  onNavigateToCustom: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onImageUpload,
  uploadedImage,
  onNavigateToPalette,
  onNavigateToCustom,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="w-full max-w-lg">
        <Uploader onImageUpload={onImageUpload} />
      </div>

      {uploadedImage && (
        <>
            <div className="text-center">
                <img src={uploadedImage.dataUrl} alt="Uploaded nails" className="rounded-lg max-h-64 mx-auto mb-4 border-2 border-pink-500 shadow-lg" />
                <p className="text-lg font-semibold text-gray-300">Your photo is ready!</p>
                <p className="text-gray-400">Now, choose how you want to design your nails.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-4">
                <button
                onClick={onNavigateToPalette}
                className="flex flex-col items-center justify-center text-center gap-4 bg-black p-6 rounded-xl shadow-lg border border-gray-700 transition-all hover:border-purple-500 hover:bg-gray-900 w-72 h-56 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                <SimpleSparkleIcon className="w-13 h-13 text-purple-500" />
                <div>
                    <h3 className="text-xl font-bold text-pink-400">Pick from Palette</h3>
                    <p className="text-sm text-gray-400 mt-2">Choose a design from a set of curated and tested beautiful nail art designs</p>
                </div>
                </button>
                <button
                onClick={onNavigateToCustom}
                className="flex flex-col items-center justify-center text-center gap-4 bg-black p-6 rounded-xl shadow-lg border border-gray-700 transition-all hover:border-purple-500 hover:bg-gray-900 w-72 h-56 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                <BrushIcon className="w-16 h-16 text-purple-500" />
                <div>
                    <h3 className="text-xl font-bold text-pink-400">Create Your Own Design</h3>
                    <p className="text-sm text-gray-400 mt-2">Craft your own dreamy nail art look using natural language</p>
                </div>
                </button>
            </div>
        </>
      )}
    </div>
  );
};