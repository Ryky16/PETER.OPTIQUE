const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// ====================== MIDDLEWARE ======================
app.use(cors());
app.use(express.json());

// Créer le dossier uploads s'il n'existe pas (utilise /tmp sur Vercel)
const uploadDir = process.env.VERCEL ? '/tmp/uploads' : 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(uploadDir));

// ====================== MULTER CONFIG ======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const cleanName = file.originalname.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');
    cb(null, uniqueSuffix + '-' + cleanName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 Mo max
});

// ====================== ROUTE ORDONNANCE ======================
app.post('/api/ordonnance', upload.single('ordonnance'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Aucun fichier reçu" });
    }

    const { prenom, telephone } = req.body;
    
    // Utilise l'URL de Vercel automatiquement
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:5000';
      
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    console.log("=== ORDONNANCE REÇUE ===");
    console.log("Lien complet :", fileUrl);

    res.json({ 
      success: true, 
      message: "Ordonnance reçue avec succès",
      fileUrl 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend fonctionne' });
});

// ====================== EXPORT POUR VERCEL ======================
// Très important pour Vercel
module.exports = app;

// Pour le développement local uniquement
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
  });
}