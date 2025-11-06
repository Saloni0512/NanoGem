# NanoGem 

<div align="left">
<img width="800" height="400" alt="GHBanner" src="https://github.com/user-attachments/assets/f2da07b1-8e3b-47e5-bd0e-8c629a2b23df" />
</div>

> NanoGem is an AI powered  nail art studio that brings the delightful and creative experience of nail art to your acreens.

## Key Features

- AI-powered nail art 
  - Apply realistic nail art to an uploaded photo. The app transforms a user-supplied nail image into a generated design using prompt-driven image editing.

- Curated design palette
  - Choose from a set of ready-made nail styles to instantly preview a variety of looks — gradients, 3D accents, gels, mattes, and more.

- Custom prompt designer
  - Submit your own prompt to create bespoke nail art when the presets don't match your vision. Custom prompts are treated the same as palette designs and feed into the same image-editing pipeline.

- Multi-view variants (Sun‑kissed / Accessories)
  - Quickly generate alternate views of a saved/generated design:
    - Sun‑kissed view for an outdoor lighting preview.
    - Accessories add-on to visualize coordinating wrist jewelry.
  - These views are produced as additional edited images derived from the selected/generated design.

- Gallery with persistence
  - Save generated designs to a local gallery stored in localStorage. Duplicate prevention, deletion, and a modal gallery UI allow easy management of favorites.


## Demo
Checkout the detailed app demo here: https://youtu.be/YLBeBqHuWaY

## Technologies Used
- React + TypeScript and bundled with Vite.
- Uses the latest image gen and editing NanoBanana model.
- Image data is passed around as data URLs in-memory and persisted to localStorage for the gallery.


