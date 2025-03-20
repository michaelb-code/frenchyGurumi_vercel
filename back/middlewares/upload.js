import multer from "multer";
import path from "path";
import fs from "fs";

// S'assurer que le dossier uploads existe
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage local
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Vérification des fichiers acceptés
const fileFilter = (req, file, cb) => {
    console.log("🖼️ Fichier reçu dans fileFilter:", file); // Log important
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error("❌ Seules les images (jpeg, jpg, png, gif) sont autorisées !"));
};

// Middleware Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite à 5MB
    fileFilter: fileFilter
});

export default upload;
