



import React, { useState, useCallback, useEffect } from 'react';
import { Uploader } from './components/Uploader';
import { Palette } from './components/Palette';
import { ImageDisplay } from './components/ImageDisplay';
import { NAIL_ART_DESIGNS, SUN_KISSED_PROMPT, ACCESSORIES_ADD_ON_PROMPT, MAX_SAVED_DESIGNS } from './constants';
import type { NailArtDesign, UploadedImage, SavedDesign } from './types';
import { editImageWithGemini } from './services/geminiService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CustomDesign } from './components/CustomDesign';
import { Onboarding } from './components/Onboarding';
import { Gallery } from './components/Gallery';
import { HomeScreen } from './components/HomeScreen';
import { PaletteScreen } from './components/PaletteScreen';
import { CustomDesignScreen } from './components/CustomDesignScreen';
import { Toast } from './components/Toast';

type Screen = 'onboarding' | 'home' | 'palette' | 'custom';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [sunKissedImage, setSunKissedImage] = useState<string | null>(null);
  const [accessoriesImage, setAccessoriesImage] = useState<string | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<NailArtDesign | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSunKissedLoading, setIsSunKissedLoading] = useState<boolean>(false);
  const [isAccessoriesLoading, setIsAccessoriesLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sunKissedError, setSunKissedError] = useState<string | null>(null);
  const [accessoriesError, setAccessoriesError] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canUndo = !!generatedImage;
  
  // Load saved designs from localStorage on initial render
  useEffect(() => {
    try {
      const storedDesigns = localStorage.getItem('savedNailArtDesigns');
      if (storedDesigns) {
        const parsedDesigns = JSON.parse(storedDesigns);
        if (Array.isArray(parsedDesigns)) {
            // Enforce the limit on initial load to clear out oversized storage
            // from previous versions of the app.
            const limitedDesigns = parsedDesigns.slice(0, MAX_SAVED_DESIGNS);
            setSavedDesigns(limitedDesigns);
        }
      }
    } catch (error) {
      console.error("Failed to parse saved designs from localStorage", error);
    }
  }, []);

  // Persist saved designs to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('savedNailArtDesigns', JSON.stringify(savedDesigns));
    } catch (error) {
      console.error("Failed to save designs to localStorage", error);
    }
  }, [savedDesigns]);


  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage({
        file,
        dataUrl: reader.result as string,
      });
      setGeneratedImage(null);
      setSunKissedImage(null);
      setAccessoriesImage(null);
      setError(null);
      setSunKissedError(null);
      setAccessoriesError(null);
      setSelectedDesign(null);
      setCurrentScreen('home');
    };
    reader.readAsDataURL(file);
  };

  const generateNailArt = useCallback(async (prompt: string, image: UploadedImage) => {
    setIsLoading(true);
    setError(null);
    setSunKissedImage(null);
    setSunKissedError(null);
    setAccessoriesImage(null);
    setAccessoriesError(null);
    try {
      const newImageBase64 = await editImageWithGemini(image.dataUrl, image.file.type, prompt);
      const newImage = `data:image/png;base64,${newImageBase64}`;
      setGeneratedImage(newImage);
// Fix: Renamed `err` to `error` in the catch block to resolve "Cannot find name 'err'".
    } catch (error) {
      console.error(error);
      setError('Failed to generate nail art. Please try another design or image.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleSunKissedView = useCallback(async () => {
    if (!generatedImage) {
      setError("No generated design to apply sun-kissed view to.");
      return;
    }

    setIsSunKissedLoading(true);
    setSunKissedError(null);
    setSunKissedImage(null);
    try {
      const mimeType = generatedImage.match(/data:(.*);base64,/)?.[1] || 'image/png';
      const newImageBase64 = await editImageWithGemini(generatedImage, mimeType, SUN_KISSED_PROMPT);
      const newImage = `data:image/png;base64,${newImageBase64}`;
      setSunKissedImage(newImage);
// Fix: Renamed `err` to `error` in the catch block.
    } catch (error) {
      console.error(error);
      setSunKissedError('Failed to generate sun-kissed view.');
    } finally {
      setIsSunKissedLoading(false);
    }
  }, [generatedImage]);

  const handleAccessoriesAddOn = useCallback(async () => {
    if (!generatedImage) {
      setError("No generated design to add accessories to.");
      return;
    }

    setIsAccessoriesLoading(true);
    setAccessoriesError(null);
    setAccessoriesImage(null);
    try {
        const mimeType = generatedImage.match(/data:(.*);base64,/)?.[1] || 'image/png';
        const newImageBase64 = await editImageWithGemini(generatedImage, mimeType, ACCESSORIES_ADD_ON_PROMPT);
        const newImage = `data:image/png;base64,${newImageBase64}`;
        setAccessoriesImage(newImage);
// Fix: Renamed `err` to `error` in the catch block.
    } catch (error) {
        console.error(error);
        setAccessoriesError('Failed to generate accessories view.');
    } finally {
        setIsAccessoriesLoading(false);
    }
  }, [generatedImage]);
  
  const handleDesignSelect = useCallback((design: NailArtDesign) => {
    if (uploadedImage) {
      setSelectedDesign(design);
      generateNailArt(design.prompt, uploadedImage);
    }
  }, [uploadedImage, generateNailArt]);

  const handleCustomDesignSubmit = useCallback((prompt: string) => {
    if (uploadedImage) {
      setSelectedDesign({ title: 'Custom Design', prompt });
      generateNailArt(prompt, uploadedImage);
    }
  }, [uploadedImage, generateNailArt]);

  const handleUndo = () => {
    setGeneratedImage(null);
    setSelectedDesign(null);
    setSunKissedImage(null);
    setAccessoriesImage(null);
    setError(null);
    setSunKissedError(null);
    setAccessoriesError(null);
  };
  
  const handleSaveToGallery = useCallback(() => {
    if (generatedImage) {
      // Prevent duplicates
      if (savedDesigns.some(d => d.dataUrl === generatedImage)) {
        setToastMessage('This design is already in your gallery!');
        return;
      }
      
      if (savedDesigns.length >= MAX_SAVED_DESIGNS) {
        setToastMessage(`Gallery is full! (Max ${MAX_SAVED_DESIGNS} designs)`);
        return;
      }

      const newDesign: SavedDesign = {
        id: new Date().toISOString(),
        dataUrl: generatedImage,
      };
      setSavedDesigns(prevDesigns => [newDesign, ...prevDesigns]);
      setToastMessage('Design saved to gallery!');
    }
  }, [generatedImage, savedDesigns]);

  const handleDeleteFromGallery = (id: string) => {
    setSavedDesigns(prevDesigns => prevDesigns.filter(d => d.id !== id));
  };
  
  const handleNavigateHome = () => {
    setCurrentScreen('home');
    setGeneratedImage(null);
    setSunKissedImage(null);
    setAccessoriesImage(null);
    setError(null);
    setSunKissedError(null);
    setAccessoriesError(null);
    setSelectedDesign(null);
  }

  const renderContent = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen 
          onImageUpload={handleImageUpload}
          uploadedImage={uploadedImage}
          onNavigateToPalette={() => setCurrentScreen('palette')}
          onNavigateToCustom={() => setCurrentScreen('custom')}
        />;
      case 'palette':
        return <PaletteScreen 
          uploadedImage={uploadedImage}
          generatedImage={generatedImage}
          selectedDesign={selectedDesign}
          isLoading={isLoading}
          error={error}
          onDesignSelect={handleDesignSelect}
          onSunKissed={handleSunKissedView}
          sunKissedImage={sunKissedImage}
          isSunKissedLoading={isSunKissedLoading}
          sunKissedError={sunKissedError}
          onAccessoriesAddOn={handleAccessoriesAddOn}
          accessoriesImage={accessoriesImage}
          isAccessoriesLoading={isAccessoriesLoading}
          accessoriesError={accessoriesError}
          onUndo={handleUndo}
          canUndo={canUndo}
          onSaveToGallery={handleSaveToGallery}
        />;
      case 'custom':
        return <CustomDesignScreen
          uploadedImage={uploadedImage}
          generatedImage={generatedImage}
          isLoading={isLoading}
          error={error}
          onCustomDesignSubmit={handleCustomDesignSubmit}
          onSunKissed={handleSunKissedView}
          sunKissedImage={sunKissedImage}
          isSunKissedLoading={isSunKissedLoading}
          sunKissedError={sunKissedError}
          onAccessoriesAddOn={handleAccessoriesAddOn}
          accessoriesImage={accessoriesImage}
          isAccessoriesLoading={isAccessoriesLoading}
          accessoriesError={accessoriesError}
          onUndo={handleUndo}
          canUndo={canUndo}
          onSaveToGallery={handleSaveToGallery}
        />;
      default:
        return null;
    }
  };
  
  if (currentScreen === 'onboarding') {
    return <Onboarding onStart={() => setCurrentScreen('home')} />;
  }

  return (
    <div className="bg-black min-h-screen flex flex-col font-sans text-gray-100 transition-colors duration-300">
      <Header
        onOpenGallery={() => setIsGalleryOpen(true)}
        onNavigateHome={handleNavigateHome}
        showHomeButton={currentScreen !== 'home'}
      />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8">
        {renderContent()}
      </main>
      <Footer />
      <Gallery 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
        designs={savedDesigns}
        onDelete={handleDeleteFromGallery}
      />
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default App;
