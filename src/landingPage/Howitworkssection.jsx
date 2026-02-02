import React from 'react';
import { CalendarCheck, Smartphone, LayoutDashboard, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  // Smooth Scroll Function
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);

    if (elem) {
      elem.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const steps = [
    {
      icon: CalendarCheck,
      title: "Définissez Vos Disponibilités",
      description: "Configurez votre calendrier en quelques clics. Choisissez vos horaires et types de consultations personnalisés.",
      iconBg: "from-sky-500 to-sky-600 shadow-sky-200"
    },
    {
      icon: Smartphone,
      title: "Vos Patients Réservent",
      description: "Ils trouvent votre profil, consultent vos disponibilités en temps réel et réservent en ligne 24h/7.",
      iconBg: "from-indigo-500 to-indigo-600 shadow-indigo-200"
    },
    {
      icon: LayoutDashboard,
      title: "Gérez Votre Cabinet",
      description: "Suivez vos rendez-vous, accédez aux dossiers patients et analysez votre activité depuis une interface unique.",
      iconBg: "from-sky-600 to-indigo-600 shadow-blue-200"
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-white overflow-hidden" id='HowItWorksSection'>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}></div>

      {/* Background gradient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-sky-100/40 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-100/40 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Comment{' '}
            <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Ça Marche
            </span>
            {' '}?
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Trois étapes simples pour transformer la gestion de vos rendez-vous et libérer du temps pour vos patients.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          
          {/* Connection lines (desktop only) */}
          <div className="hidden md:block absolute top-[55px] left-0 right-0 px-[15%] pointer-events-none">
            <div className="flex items-center justify-between">
              <div className="flex-1 h-0.5 border-t-2 border-dashed border-sky-200"></div>
              <div className="w-16"></div>
              <div className="flex-1 h-0.5 border-t-2 border-dashed border-indigo-200"></div>
            </div>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div key={index} className="relative group">
                <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-white border-2 border-gray-100 shadow-sm flex items-center justify-center z-20">
                  <span className="text-sm font-bold text-gray-400">{index + 1}</span>
                </div>

                <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-sky-200 hover:shadow-xl transition-all duration-300 text-center z-10">
                  <div className="flex justify-center mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.iconBg} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300`}>
                      <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 pt-8 border-t border-gray-100">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-3 bg-gray-50 rounded-full border border-gray-100">
            <p className="text-gray-600 font-medium">
              Pas de formation complexe, pas de logiciel à installer
            </p>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            {/* Added onClick for Smooth Scrolling */}
            <button 
              onClick={(e) => handleSmoothScroll(e, "#FinalCTASectionMedical")}
              className="text-sky-600 font-bold hover:text-indigo-600 flex items-center gap-1 transition-colors group cursor-pointer"
            >
              Commencer maintenant 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;