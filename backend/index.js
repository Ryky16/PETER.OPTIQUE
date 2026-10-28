const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ====================== MIDDLEWARE ======================
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques
app.use('/uploads', express.static('uploads'));           // Pour les ordonnances
app.use('/images', express.static('../client/public/images')); // ← Pour les photos des lunettes

// ====================== MULTER CONFIG ======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
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
    /*const NGROK_URL = 'https://ripcord-riches-fraternal.ngrok-free.dev';
    const fileUrl = `${NGROK_URL}/uploads/${req.file.filename}`;
*/
    const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'http://localhost:5000';
const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    const message = `🟢 *NOUVELLE ORDONNANCE REÇUE* 🟢\n\n` +
      `👤 Nom : *${prenom}*\n` +
      `📞 Téléphone : *${telephone}*\n` +
      `📎 Fichier : ${req.file.originalname}\n\n` +
      `🔗 *CLIQUEZ POUR OUVRIR LE FICHIER* :\n${fileUrl}`;

    console.log("\n=== ORDONNANCE REÇUE ===");
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

// ====================== DÉMARRAGE SERVEUR ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
  console.log(`📸 Images servies depuis : /images`);
});