
export interface NailArtDesign {
  title: string;
  prompt: string;
}

export interface UploadedImage {
  file: File;
  dataUrl: string;
}

export interface SavedDesign {
  id: string;
  dataUrl: string;
}
