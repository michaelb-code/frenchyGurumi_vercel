// Module pour gérer les opérations sur les fichiers
const fs = require('fs')
// Module pour gérer l'upload de fichiers
const multer = require('multer')
// Module pour gérer les chemins de fichiers
const path = require('path')

// Je définis le chemin du dossier où seront stockés les fichiers uploadés
const uploadFolder = path.join(process.cwd(), '../uploads');

// Vérifier si le dossier uploads existe, sinon on le créer
if (!fs.existsSync(uploadFolder)) {
fs.mkdirSync(uploadFolder);
console.log('Dossier "uploads" créé');
}
const storage = multer.diskStorage({
// Je définis la destination des fichiers uploadés
destination: (req, file, cb) => {cb(null, uploadFolder);
},

// Je définis le nom des fichiers uploadés
filename: (req, file, cb) => {
cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}
});

//Je crée l'instance multer avec la configuration de stockage
const upload = multer({ storage: storage });

// J'exporte le middleware configuré
module.exports = upload;