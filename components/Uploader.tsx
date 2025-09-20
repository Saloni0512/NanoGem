

import React, { useRef } from 'react';
import { UploadIcon } from './Icons';

interface UploaderProps {
  onImageUpload: (file: File) => void;
}

export const Uploader: React.FC<UploaderProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-black p-6 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-xl font-bold text-pink-400 mb-4">Upload Your Nails Photo</h2>
      <div
        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors border-gray-600 hover:border-pink-500 hover:bg-gray-900"
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg"
        />
        <div className="flex flex-col items-center text-gray-400 pointer-events-none">
          <UploadIcon className="w-10 h-10 mb-3" />
          <p className="font-semibold">Click to upload an image</p>
          <p className="text-sm">PNG or JPG</p>
        </div>
      </div>
    </div>
  );
};