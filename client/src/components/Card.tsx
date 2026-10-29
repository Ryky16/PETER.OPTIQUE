import type { Lunette } from '../types/Lunette';

export function Card({ lunette }: { lunette: Lunette }) {
  // Utilise l'URL actuelle du site (Vercel)
  const imageUrl = `https://peteroptique.vercel.app/images/${lunette.image}`;

  const handleCommande = () => {
    const message = `🛍️ *COMMANDE DE LUNETTES* 🛍️\n\n` +
      `👁️ Modèle : *${lunette.nom}*\n` +
      `💰 Prix : *${lunette.prix}*\n\n` +
      `🔗 *VOIR LA PHOTO DU MODÈLE* :\n${imageUrl}\n\n` +
      `Bonjour Peter Optique, je suis intéressé par ce modèle. Est-il encore disponible ?`;

    window.open(`https://wa.me/221767913986?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 group border border-gray-100 dark:border-gray-800">
      <div className="relative h-[300px] overflow-hidden">
        <img 
          src={`/images/${lunette.image}`} 
          alt={lunette.nom}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/600x400?text=Photo+non+disponible";
          }}
        />
        
        {lunette.nouveau && (
          <span className="absolute top-6 left-6 bg-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg z-10">
            NOUVEAU
          </span>
        )}
        {lunette.promo && (
          <span className="absolute top-6 left-6 bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg z-10">
            PROMO
          </span>
        )}
        
        <span className="absolute top-6 right-6 bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow z-10">
          {lunette.genre.toUpperCase()}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-3">
          {lunette.nom}
        </h3>
        
        <p className="text-xl font-bold text-orange-500 mb-3">
          {lunette.prix}
        </p>

        <button
          onClick={handleCommande}
          className="w-full max-w-xs mx-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg text-lg transition-all hover:scale-102 active:scale-95 shadow-md"
        >
          Commander sur WhatsApp
        </button>
      </div>
    </div>
  );
}