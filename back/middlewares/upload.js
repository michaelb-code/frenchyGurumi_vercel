import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import fs from 'fs';

// S'assurer que le dossier uploads existe
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// OPTION 1: Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary config:", { 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  key_exists: !!process.env.CLOUDINARY_API_KEY,
  secret_exists: !!process.env.CLOUDINARY_API_SECRET 
});

// Du00e9cider si on utilise le stockage local ou Cloudinary
const useLocalStorage = process.env.USE_LOCAL_STORAGE === 'true' || !process.env.CLOUDINARY_API_KEY;

let storage;

if (useLocalStorage) {
  console.log("Utilisation du stockage local pour les fichiers");
  // OPTION 2: Stockage local
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
} else {
  console.log("Utilisation de Cloudinary pour les fichiers");
  // Configuration du stockage Cloudinary
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "frenchyGurumi", // Nom du dossier dans Cloudinary
      allowedFormats: ["jpg", "jpeg", "png", "gif"],
      transformation: [{ width: 1000, crop: "limit" }], // Redimensionnement automatique
    },
  });
}

// Middleware multer avec stockage configuru00e9
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite u00e0 5MB
  fileFilter: function (req, file, cb) {
    // Valider les types de fichiers
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Seules les images (jpeg, jpg, png, gif) sont autorisu00e9es!"));
  },
});

export default upload;