import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configuration for PDF files
export const pdfCloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "pdfs",
    allowed_formats: ["pdf"],
    // transformation: [{ width: 500, height: 500, crop: 'limit' }], // PDFs don't need image transformations
  } as any,
});

export const pdfMulterOptions = multer({ storage: pdfCloudinaryStorage });

// Configuration for Audio files
export const audioCloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "audios",
    allowed_formats: ["mp3", "wav", "ogg"], // Add more audio formats if needed
    resource_type: "video", // Use 'video' for audio uploads
  } as any,
});

export const audioMulterOptions = multer({ storage: audioCloudinaryStorage });
