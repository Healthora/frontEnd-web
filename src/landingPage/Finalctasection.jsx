import React from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0B0C10] overflow-hidden">
      {/* Large radial gradient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-gradient-to-r from-sky-500/30 via-indigo-500/30 to-sky-500/30 rounded-full blur-[150px] animate-pulse-slow"></div>
      </div>

      {/* Secondary glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-400/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-[120px]"></div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        
        {/* Sparkle badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 backdrop-blur-sm mb-8 animate-float">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-medium text-sky-300">Commencez Aujourd'hui</span>
          <Sparkles className="w-4 h-4 text-sky-400" />
        </div>

        {/* Main headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Prêt à Reprendre le Contrôle{' '}
          <span className="block mt-2 bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-500 bg-clip-text text-transparent">
            de Votre Planning ?
          </span>
        </h2>

        {/* Supporting text */}
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Rejoignez des centaines de médecins qui économisent du temps et améliorent leur pratique chaque jour.
        </p>

        {/* Benefits mini-list */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-5 h-5 bg-sky-500/20 border border-sky-500/30 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-sky-400" />
            </div>
            <span className="text-sm font-medium">14 jours gratuits</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-5 h-5 bg-sky-500/20 border border-sky-500/30 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-sky-400" />
            </div>
            <span className="text-sm font-medium">Sans carte bancaire</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-5 h-5 bg-sky-500/20 border border-sky-500/30 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-sky-400" />
            </div>
            <span className="text-sm font-medium">Configuration en 5 min</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative px-10 py-5 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full font-bold text-lg text-white shadow-2xl shadow-sky-500/50 hover:shadow-sky-500/80 hover:scale-105 transition-all duration-300">
            <span className="relative z-10 flex items-center justify-center gap-3">
              Démarrer Gratuitement
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
          </button>

          <button className="px-10 py-5 border-2 border-gray-700 hover:border-sky-500/50 rounded-full font-semibold text-lg text-gray-300 hover:text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
            Planifier une Démo
          </button>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-sky-400 rounded-full animate-ping opacity-40"></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-ping opacity-40 delay-300"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-sky-400 rounded-full animate-ping opacity-40 delay-700"></div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </section>
  );
};

export default FinalCTASection;