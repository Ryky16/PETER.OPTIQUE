import { useState } from 'react';
import { Upload, User, Smartphone, Camera, Image as ImageIcon, FileText } from 'lucide-react';

export function OrdonnancePage() {
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError('');

    if (selectedFile) {
      const isValid = selectedFile.type.startsWith('image/') || selectedFile.type === 'application/pdf';
      
      if (!isValid) {
        setError("Seuls les fichiers photo (JPG, PNG) ou PDF sont acceptés.");
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("Le fichier est trop volumineux (maximum 10 Mo).");
        return;
      }

      setFile(selectedFile);

      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

      const sendToBackend = async () => {
    if (!file || !prenom.trim() || !telephone.trim()) {
      setError("Veuillez remplir tous les champs et sélectionner un fichier.");
      return;
    }

    setIsSending(true);
    setError('');

    const formData = new FormData();
    formData.append('ordonnance', file);
    formData.append('prenom', prenom);
    formData.append('telephone', telephone);

    try {
      // Utilise TON LIEN NGROK ici (très important)
      const response = await fetch('/api/ordonnance',  {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.fileUrl) {
        const message = 
`🟢 *NOUVELLE ORDONNANCE REÇUE* 🟢

👤 Nom : *${prenom}*
📞 Téléphone : *${telephone}*
📎 Fichier : ${file.name}

🔗 *CLIQUEZ ICI POUR OUVRIR LE FICHIER* :
${result.fileUrl}`;

        window.open(`https://wa.me/221767913986?text=${encodeURIComponent(message)}`, '_blank');

        setSent(true);
      } else {
        setError("Erreur lors de l'envoi.");
      }
    } catch (err) {
      console.error(err);
      setError("Impossible de se connecter au serveur. Erreur technique.");
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto bg-white dark:bg-gray-950 min-h-screen">
      <div className="text-center mb-14">
        <Upload className="w-20 h-20 mx-auto text-teal-500 mb-6" />
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-4">
          Déposez votre ordonnance
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Photo ou PDF • Réponse rapide</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                <User className="w-6 h-6 text-teal-600" />
                Votre prénom
              </label>
              <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Ex: Fatou Diop" className="w-full px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:border-teal-500 dark:bg-gray-800 dark:text-white" />
            </div>
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                <Smartphone className="w-6 h-6 text-teal-600" />
                Votre numéro WhatsApp
              </label>
              <input type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="77 123 45 67" className="w-full px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:border-teal-500 dark:bg-gray-800 dark:text-white" />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
              <Camera className="w-6 h-6 text-teal-600" />
              Photo ou PDF de votre ordonnance
            </label>

            <div className="border-4 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-12 text-center hover:border-teal-400 transition">
              <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer block">
                {preview ? (
                  <img src={preview} alt="preview" className="mx-auto max-h-80 rounded-2xl shadow" />
                ) : file ? (
                  <div className="flex flex-col items-center">
                    <FileText className="w-20 h-20 text-blue-500 mx-auto" />
                    <p className="mt-4 font-medium dark:text-white">{file.name}</p>
                  </div>
                ) : (
                  <div>
                    <ImageIcon className="w-20 h-20 mx-auto text-gray-400" />
                    <p className="mt-4 text-lg dark:text-gray-300">Cliquez pour sélectionner un fichier</p>
                  </div>
                )}
              </label>
            </div>
            {error && <p className="text-red-500 text-center mt-3 font-medium">{error}</p>}
          </div>

          <button
            onClick={sendToBackend}
            disabled={isSending || sent || !file || !prenom.trim() || !telephone.trim()}
            className="w-full py-7 rounded-3xl font-bold text-2xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:brightness-110 transition disabled:opacity-50"
          >
            {sent ? "✅ Ordonnance envoyée avec succès !" : isSending ? "Envoi en cours..." : "Envoyer sur WhatsApp"}
          </button>
        </div>
      </div>
    </section>
  );
}