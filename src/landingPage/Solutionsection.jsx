import React from 'react';
import { Calendar, Smartphone, Bell, Users, BarChart3, Check, Sparkles, TrendingUp } from 'lucide-react';

const SolutionSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "Calendrier Intelligent",
      description: "Visualisez tous vos rendez-vous en un clin d'œil. Fini les conflits d'horaires.",
      gradient: "from-sky-500 to-sky-600"
    },
    {
      icon: Smartphone,
      title: "Réservation en Ligne 24/7",
      description: "Vos patients réservent directement, même en dehors des heures d'ouverture.",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Bell,
      title: "Rappels Automatiques",
      description: "SMS et emails envoyés automatiquement. Réduisez les absences de 70%.",
      gradient: "from-sky-500 to-indigo-500"
    },
    {
      icon: Users,
      title: "Liste de Patients Centralisée",
      description: "Toutes les informations essentielles accessibles en un clic.",
      gradient: "from-indigo-500 to-sky-500"
    },
    {
      icon: BarChart3,
      title: "Suivi des Rendez-vous",
      description: "Statistiques en temps réel pour optimiser votre planning.",
      gradient: "from-sky-600 to-indigo-600"
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-[#0B0C10] to-[#111318] overflow-hidden">
      {/* Background gradient glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-medium text-sky-300">La Solution</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Tout Ce Dont Vous Avez Besoin,{' '}
            <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              En Un Seul Endroit
            </span>
          </h2>
          
          <p className="text-lg text-gray-400 leading-relaxed">
            Une plateforme complète conçue pour simplifier votre quotidien et améliorer l'expérience de vos patients.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <div
                  key={index}
                  className="group relative bg-[#111318]/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-sky-500/30 hover:bg-[#111318]/80 transition-all duration-300"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 to-indigo-500/0 group-hover:from-sky-500/5 group-hover:to-indigo-500/5 rounded-2xl transition-all duration-300"></div>
                  
                  <div className="relative flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-sky-100 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                    </div>

                    {/* Check mark */}
                    <div className="flex-shrink-0 w-6 h-6 bg-sky-500/20 border border-sky-500/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Check className="w-4 h-4 text-sky-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            
            {/* Glow effect behind card */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-indigo-500/20 rounded-3xl blur-3xl"></div>
            
            {/* Main dashboard card */}
            <div className="relative bg-[#111318]/90 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Tableau de Bord</h3>
                  <p className="text-gray-400 text-sm">Vue d'ensemble de votre pratique</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-sky-400" />
                    <p className="text-gray-400 text-sm">Aujourd'hui</p>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">12</p>
                  <p className="text-sky-400 text-sm font-medium">Rendez-vous</p>
                </div>

                <div className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-indigo-400" />
                    <p className="text-gray-400 text-sm">Cette semaine</p>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">89</p>
                  <p className="text-indigo-400 text-sm font-medium">Patients vus</p>
                </div>
              </div>

              {/* Performance indicator */}
              <div className="bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-sky-500/10 border border-gray-700/50 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-sky-400" />
                    <p className="text-white font-semibold">Taux de Présence</p>
                  </div>
                  <span className="px-3 py-1 bg-sky-500/20 border border-sky-500/30 rounded-full text-sky-400 text-sm font-bold">
                    +18%
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="relative w-full h-3 bg-gray-800/50 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-400 rounded-full w-[92%]"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400/50 to-indigo-400/50 rounded-full w-[92%] blur-sm"></div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <p className="text-gray-400 text-sm">Mois dernier: 74%</p>
                  <p className="text-white font-bold text-lg">92%</p>
                </div>
              </div>

              {/* Bottom action hint */}
              <div className="mt-6 pt-6 border-t border-gray-800/50">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent rounded-full"></div>
                  <Bell className="w-4 h-4 text-sky-400" />
                  <p className="text-xs">Rappels automatiques activés</p>
                  <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Floating indicator */}
            <div className="absolute -top-4 -left-4 bg-[#111318]/90 backdrop-blur-xl border border-sky-500/30 rounded-2xl px-4 py-3 shadow-xl shadow-sky-500/20 animate-float">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-sky-400 rounded-full animate-ping absolute"></div>
                  <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                </div>
                <p className="text-white text-sm font-semibold">Synchronisé</p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full font-semibold text-white shadow-lg shadow-sky-500/50 hover:shadow-sky-500/70 hover:scale-105 transition-all duration-300">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Découvrir Toutes les Fonctionnalités
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          </button>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default SolutionSection;