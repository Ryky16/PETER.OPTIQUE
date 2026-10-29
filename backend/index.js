const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { put } = require('@vercel/blob');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Fichier en mémoire (pas de disque)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10 Mo max
});

// ====================== ROUTE ORDONNANCE ======================
app.post('/api/ordonnance', upload.single('ordonnance'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Aucun fichier reçu' });
    }

    const { prenom, telephone } = req.body;

    // Nom unique pour le fichier
    const uniqueName = `${Date.now()}-${req.file.originalname
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9.-]/g, '')}`;

    // Upload vers Vercel Blob (lien permanent)
    const blob = await put(`ordonnances/${uniqueName}`, req.file.buffer, {
      access: 'public',
      contentType: req.file.mimetype,
    });

    console.log('=== ORDONNANCE REÇUE ===');
    console.log('Prénom:', prenom);
    console.log('Téléphone:', telephone);
    console.log('URL fichier:', blob.url);

    res.json({
      success: true,
      message: 'Ordonnance reçue avec succès',
      fileUrl: blob.url
    });
  } catch (error) {
    console.error('Erreur upload:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Test santé
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Export pour Vercel
module.exports = app;

// Local uniquement
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Backend sur http://localhost:${PORT}`);
  });
}