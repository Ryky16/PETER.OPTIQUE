import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { heroData } from '../data/heroData';
import { featuredData } from '../data/featuredData';
import { ArrowRight } from 'lucide-react';

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {heroData.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1500 ease-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: `url(/images/${item.image})` }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-3 lg:px-12 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-2">
              <span className="text-white text-sm font-medium tracking-widest">PETER OPTIQUE • DAKAR</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-6">
              DES LUNETTES QUI<br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
                RACONTENT VOTRE STYLE
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-10">
              Collection 2026 • Qualité Premium • Livraison partout au Sénégal
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <a
                href="https://wa.me/221767913986?text=Bonjour Peter Optique, je veux découvrir votre collection"
                target="_blank"
                className="group bg-white hover:bg-yellow-400 text-black font-bold text-lg px-10 py-5 rounded-3xl flex items-center gap-3 transition-all hover:scale-105 shadow-xl"
              >
                Voir la Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </a>

              <Link
                to="/ordonnance"
                className="border-2 border-white/80 hover:border-white text-white font-semibold text-lg px-10 py-5 rounded-3xl hover:bg-white/10 backdrop-blur transition-all"
              >
                Déposer mon ordonnance
              </Link>
            </div>
          </div>
        </div>

        {/* Indicateurs à droite */}
        <div className="absolute bottom-12 right-12 flex flex-col gap-3 z-20">
          {heroData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                index === currentSlide ? 'bg-white w-12' : 'bg-white/40 hover:bg-white/70 w-8'
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        {/*<div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 text-sm tracking-widest flex flex-col items-center gap-1">
          DÉCOUVREZ NOS MODÈLES
          <span className="text-3xl animate-bounce">↓</span>
        </div>*/}
      </section>

      {/* Section Nos Modèles les Plus Demandés */}
      <section className="py-28 px-6 max-w-7xl mx-auto bg-white dark:bg-gray-950">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 text-gray-900 dark:text-white">Nos Modèles les Plus Demandés</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Sélection premium de notre collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {featuredData.map((lunette) => (
            <Card key={lunette.id} lunette={lunette} />
          ))}
        </div>
      </section>
    </>
  );
}