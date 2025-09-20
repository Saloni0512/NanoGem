import React from 'react';
import { Palette } from './Palette';
import { ImageDisplay } from './ImageDisplay';
import { NAIL_ART_DESIGNS } from '../constants';
import type { NailArtDesign, UploadedImage } from '../types';


interface PaletteScreenProps {
  uploadedImage: UploadedImage | null;
  generatedImage: string | null;
  selectedDesign: NailArtDesign | null;
  isLoading: boolean;
  error: string | null;
  onDesignSelect: (design: NailArtDesign) => void;
  onSunKissed: () => void;
  sunKissedImage: string | null;
  isSunKissedLoading: boolean;
  sunKissedError: string | null;
  onAccessoriesAddOn: () => void;
  accessoriesImage: string | null;
  isAccessoriesLoading: boolean;
  accessoriesError: string | null;
  onUndo: () => void;
  canUndo: boolean;
  onSaveToGallery: () => void;
}

export const PaletteScreen: React.FC<PaletteScreenProps> = (props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Panel */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        {props.uploadedImage && (
            <div className="bg-black p-4 rounded-xl shadow-lg border border-gray-700">
                <h2 className="text-xl font-bold text-pink-400 mb-4">Your Nails</h2>
                <img src={props.uploadedImage.dataUrl} alt="Your nails" className="w-full rounded-lg" />
            </div>
        )}
        <Palette
          designs={NAIL_ART_DESIGNS}
          onSelect={props.onDesignSelect}
          selectedDesign={props.selectedDesign}
          isDisabled={!props.uploadedImage || props.isLoading}
        />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-2/3">
        <ImageDisplay
          generatedImage={props.generatedImage}
          isLoading={props.isLoading}
          error={props.error}
          onSunKissed={props.onSunKissed}
          sunKissedImage={props.sunKissedImage}
          isSunKissedLoading={props.isSunKissedLoading}
          sunKissedError={props.sunKissedError}
          onAccessoriesAddOn={props.onAccessoriesAddOn}
          accessoriesImage={props.accessoriesImage}
          isAccessoriesLoading={props.isAccessoriesLoading}
          accessoriesError={props.accessoriesError}
          onUndo={props.onUndo}
          canUndo={props.canUndo}
          onSaveToGallery={props.onSaveToGallery}
        />
      </div>
    </div>
  );
};