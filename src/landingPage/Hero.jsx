import React from 'react';
import { Calendar, Users, Clock, TrendingUp, Check, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-[#0B0C10] overflow-hidden">
      {/* Radial gradient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
      
      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 backdrop-blur-sm">
              <div className="relative">
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-ping absolute"></div>
                <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-sky-300">Plateforme En Direct</span>
              <Sparkles className="w-4 h-4 text-sky-400" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">Transformez Votre</span>
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-500 bg-clip-text text-transparent">
                Pratique Médicale
              </span>
              <br />
              <span className="text-white">avec une Planification Intelligente</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Réduisez les absences de 70%, éliminez les doubles réservations et économisez des heures chaque semaine. 
              Notre plateforme intelligente de rendez-vous aide les médecins à se concentrer sur l'essentiel — les soins aux patients.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full font-semibold text-white shadow-2xl shadow-sky-500/50 hover:shadow-sky-500/70 hover:scale-105 transition-all duration-300">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Essai Gratuit
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </button>
              
              <button className="px-8 py-4 border border-gray-700 hover:border-sky-500/50 rounded-full font-semibold text-gray-300 hover:text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
                Voir la Démo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Check className="w-5 h-5 text-sky-400" />
                <span className="text-sm">Aucune carte bancaire requise</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Check className="w-5 h-5 text-sky-400" />
                <span className="text-sm">Essai gratuit de 14 jours</span>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Mockup */}
          <div className="relative lg:scale-110">
            
            {/* Glow effect behind card */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/30 to-indigo-500/30 rounded-3xl blur-3xl animate-pulse"></div>
            
            {/* Main dashboard card */}
            <div className="relative bg-[#111318]/80 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-6 shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Planning d'Aujourd'hui</h3>
                    <p className="text-gray-500 text-sm">8 rendez-vous</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-sky-500/20 border border-sky-500/30 rounded-full text-sky-400 text-xs font-medium">
                  En Direct
                </div>
              </div>

              {/* Appointments list */}
              <div className="space-y-3 mb-6">
                {[
                  { time: '09:00', name: 'aymen medelci', type: 'Consultation', status: 'confirmed' },
                  { time: '10:30', name: 'issam kebdani', type: 'Suivi médical', status: 'confirmed' },
                  { time: '14:00', name: 'abdou hadjou', type: 'Contrôle', status: 'pending' }
                ].map((apt, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-gray-800/50 rounded-xl transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <Clock className="w-5 h-5 text-sky-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm">{apt.name}</p>
                      <p className="text-gray-500 text-xs">{apt.type}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm font-mono">{apt.time}</span>
                      <div className={`w-2 h-2 rounded-full ${apt.status === 'confirmed' ? 'bg-sky-400' : 'bg-yellow-400'}`}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20 rounded-xl">
                  <Users className="w-5 h-5 text-sky-400 mb-2" />
                  <p className="text-2xl font-bold text-white">248</p>
                  <p className="text-xs text-gray-500">Patients</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-indigo-400 mb-2" />
                  <p className="text-2xl font-bold text-white">92%</p>
                  <p className="text-xs text-gray-500">Présence</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20 rounded-xl">
                  <Clock className="w-5 h-5 text-sky-400 mb-2" />
                  <p className="text-2xl font-bold text-white">12h</p>
                  <p className="text-xs text-gray-500">Économisées</p>
                </div>
              </div>
            </div>

            {/* Floating notification card */}
            <div className="absolute -top-6 -right-6 bg-[#111318]/90 backdrop-blur-xl border border-sky-500/30 rounded-2xl p-4 shadow-xl shadow-sky-500/20 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Réservation Confirmée</p>
                  <p className="text-gray-400 text-xs">Sarah - 15:00</p>
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-6 bg-[#111318]/90 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-4 shadow-xl shadow-indigo-500/20 animate-float-delayed">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-indigo-400" />
                <div>
                  <p className="text-2xl font-bold text-white">-70%</p>
                  <p className="text-gray-400 text-xs">Absences réduites</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
};

export default Hero;