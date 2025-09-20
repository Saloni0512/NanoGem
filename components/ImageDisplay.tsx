import React from 'react';
import { Spinner } from './Spinner';
import { SparklesIcon, SunIcon, JewelryIcon, UndoIcon, SaveIcon } from './Icons';

interface ImageDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
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

interface Placeholder {
    title: string;
    message: string;
}

const ImageContainer: React.FC<{
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
  icon: React.ReactNode;
  error?: string | null;
  placeholder: Placeholder;
}> = ({ title, imageUrl, isLoading = false, icon, error, placeholder }) => {
    
  return (
    <div className="w-full flex flex-col gap-3">
       <div className="w-full flex justify-between items-center min-h-[36px]">
        <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">{icon} {title}</h3>
        </div>
      </div>
      <div
        className="aspect-square w-full bg-gray-900 rounded-lg border-2 border-gray-700 flex items-center justify-center overflow-hidden relative select-none"
      >
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-20">
            <Spinner />
            <p className="mt-4 text-sm text-pink-300">Generating view...</p>
          </div>
        )}
        {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
        ) : (
          <div className="text-gray-500 text-center p-4">
            {!isLoading && (
              error ? <p className="text-red-400">{error}</p> :
              <>
                <p className="text-base">{placeholder.title}</p>
                <p className="text-sm">{placeholder.message}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ 
    generatedImage, 
    isLoading, 
    error, 
    onSunKissed,
    sunKissedImage,
    isSunKissedLoading,
    sunKissedError,
    onAccessoriesAddOn,
    accessoriesImage,
    isAccessoriesLoading,
    accessoriesError,
    onUndo,
    canUndo,
    onSaveToGallery
}) => {
    
  return (
    <div className="bg-pink-900/30 p-8 rounded-xl shadow-lg border border-pink-700 h-full flex flex-col gap-6">
      {error && !isLoading && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
          <strong>Oops!</strong> {error}
        </div>
      )}
      
      {/* Main generated image section */}
      <div className="flex flex-col gap-3 max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="w-full flex justify-between items-center min-h-[36px]">
            <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5"/> Applied Design
            </h3>
            <div className="flex items-center gap-2">
                {generatedImage && !isLoading && (
                    <button
                        onClick={onSaveToGallery}
                        className="p-1.5 rounded-full hover:bg-gray-800 transition-colors"
                        aria-label="Save to Gallery"
                    >
                        <SaveIcon className="w-5 h-5" />
                    </button>
                )}
                {generatedImage && !isLoading && canUndo && <div className="h-6 w-px bg-gray-600" />}
                <button
                    onClick={onUndo}
                    disabled={!canUndo}
                    className="p-1.5 rounded-full hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Undo"
                >
                    <UndoIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
        
        {/* Image and side buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-grow aspect-square bg-gray-900 rounded-lg border-2 border-gray-700 flex items-center justify-center overflow-hidden relative select-none">
                {isLoading && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-20">
                        <Spinner />
                        <p className="mt-4 text-sm text-pink-300">Applying new design...</p>
                    </div>
                )}
                {generatedImage ? (
                    <>
                        <img 
                            src={generatedImage} 
                            alt="Applied Design" 
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                    </>
                ) : (
                    <div className="text-gray-500 text-center p-4">
                        {!isLoading && (
                            // Error is shown at the top of the component
                            <>
                                <p className="text-base">Your new nail art will appear here.</p>
                                <p className="text-sm">Select a style to begin.</p>
                            </>
                        )}
                    </div>
                )}
            </div>
            
            {/* Side buttons */}
            {generatedImage && !isLoading && (
                <div className="flex flex-col gap-4 w-full md:w-auto">
                    <button
                        onClick={onSunKissed}
                        className="flex items-center justify-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded-md hover:bg-orange-600 transition-colors text-sm font-semibold shadow w-full"
                        aria-label="Apply sun-kissed view"
                    >
                        <SunIcon className="w-4 h-4" />
                        <span>Sun-kissed View</span>
                    </button>
                    <button
                        onClick={onAccessoriesAddOn}
                        className="flex items-center justify-center gap-2 bg-teal-500 text-white px-3 py-1.5 rounded-md hover:bg-teal-600 transition-colors text-sm font-semibold shadow w-full"
                        aria-label="Add accessories"
                    >
                        <JewelryIcon className="w-4 h-4" />
                        <span>Use add-on</span>
                    </button>
                </div>
            )}
        </div>
      </div>
      
      {/* Add-ons section */}
      {(sunKissedImage || accessoriesImage || isSunKissedLoading || isAccessoriesLoading || sunKissedError || accessoriesError) && (
        <div className="border-t-2 border-pink-700/50 pt-6">
            <h3 className="text-xl font-bold text-pink-300 mb-4 text-center">✨ Custom Studio Views ✨</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageContainer 
                  title="Sun-kissed View" 
                  imageUrl={sunKissedImage} 
                  isLoading={isSunKissedLoading} 
                  icon={<SunIcon className="w-5 h-5"/>}
                  error={sunKissedError}
                  placeholder={{
                    title: "Sun-kissed view will appear here.",
                    message: "Apply from the main design."
                  }}
              />
              <ImageContainer 
                  title="Accessories Add-on" 
                  imageUrl={accessoriesImage} 
                  isLoading={isAccessoriesLoading} 
                  icon={<JewelryIcon className="w-5 h-5"/>}
                  error={accessoriesError}
                  placeholder={{
                    title: "Accessories view will appear here.",
                    message: "Apply from the main design."
                  }}
              />
            </div>
        </div>
      )}
    </div>
  );
};
