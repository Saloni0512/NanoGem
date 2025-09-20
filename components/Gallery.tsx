import React from 'react';
import type { SavedDesign } from '../types';
import { CloseIcon, DownloadIcon, TrashIcon } from './Icons';

interface GalleryProps {
  isOpen: boolean;
  onClose: () => void;
  designs: SavedDesign[];
  onDelete: (id: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ isOpen, onClose, designs, onDelete }) => {
  const handleDownload = (dataUrl: string, id: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `ai-nail-art-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/60 z-40 flex justify-start items-start transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-title"
    >
      <div 
        className="w-11/12 max-w-md h-full bg-gray-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
          <h2 id="gallery-title" className="text-xl font-bold text-pink-400">
          <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">Designs Gallery</span>
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-800"
            aria-label="Close gallery"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="flex-grow p-4 overflow-y-auto">
          {designs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <p className="text-lg font-semibold">Your gallery is empty.</p>
              <p className="mt-2">Use the "Save to Gallery" button to add your favorite designs here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {designs.map((design) => (
                <div key={design.id} className="relative group aspect-square rounded-lg overflow-hidden border border-pink-700">
                  <img src={design.dataUrl} alt="Saved nail art design" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => handleDownload(design.dataUrl, design.id)} 
                      className="p-3 rounded-full bg-white/20 hover:bg-white/40 text-white"
                      aria-label="Download design"
                    >
                      <DownloadIcon className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this design?')) {
                          onDelete(design.id);
                        }
                      }} 
                      className="p-3 rounded-full bg-white/20 hover:bg-white/40 text-white"
                      aria-label="Delete design"
                    >
                      <TrashIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};