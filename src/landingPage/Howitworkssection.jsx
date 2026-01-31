import React from 'react';
import { CalendarCheck, Smartphone, LayoutDashboard } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: CalendarCheck,
      title: "Définissez Vos Disponibilités",
      description: "Configurez votre calendrier en quelques clics. Choisissez vos horaires et types de consultations.",
      iconBg: "bg-gradient-to-br from-sky-400 to-sky-500"
    },
    {
      icon: Smartphone,
      title: "Vos Patients Réservent",
      description: "Ils trouvent votre profil, consultent vos disponibilités et réservent en ligne 24/7.",
      iconBg: "bg-gradient-to-br from-indigo-400 to-indigo-500"
    },
    {
      icon: LayoutDashboard,
      title: "Gérez Tout Depuis Un Tableau",
      description: "Suivez tous vos rendez-vous, patients et statistiques depuis une interface unique.",
      iconBg: "bg-gradient-to-br from-sky-400 to-sky-500"
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-[#0B0C10] overflow-hidden">
      {/* Background gradient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-sky-500/10 to-indigo-500/10 rounded-full blur-[150px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Comment{' '}
            <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Ça Marche
            </span>
            {' '}?
          </h2>
          
          <p className="text-lg text-gray-400 leading-relaxed">
            Trois étapes simples pour transformer votre gestion de rendez-vous
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          
          {/* Connection lines between steps (desktop only) */}
          <div className="hidden md:block absolute top-[70px] left-0 right-0 px-[16.666%]">
            <div className="flex items-center justify-between">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-sky-500/40"></div>
              <div className="w-8"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/40 via-indigo-500/40 to-transparent"></div>
            </div>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div key={index} className="relative">
                
                {/* Step card */}
                <div className="relative bg-[#0f1419]/60 backdrop-blur-sm border border-gray-800/40 rounded-2xl p-8 text-center">
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-20 h-20 ${step.iconBg} rounded-3xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom text */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">
            Pas de formation complexe, pas de logiciel à installer
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;