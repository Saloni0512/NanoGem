
import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function editImageWithGemini(
  imageDataUrl: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  
  const base64ImageData = imageDataUrl.split(',')[1];
  if (!base64ImageData) {
    throw new Error("Invalid image data URL provided.");
  }

  const imagePart = {
    inlineData: {
      data: base64ImageData,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: prompt,
  };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: [imagePart, textPart],
    },
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  const imagePartResponse = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

  if (imagePartResponse?.inlineData) {
    return imagePartResponse.inlineData.data;
  }

  throw new Error("No image was generated in the API response.");
}