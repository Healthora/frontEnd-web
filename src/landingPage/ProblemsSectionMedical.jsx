import React from 'react';
import { Phone, CalendarX, FileText, Clock, AlertCircle, TrendingDown, ArrowRight } from 'lucide-react';

const ProblemsSectionMedical = () => {
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

  const problems = [
    {
      icon: Phone,
      title: "20-30 Appels par Jour",
      description: "Votre secrétariat passe des heures au téléphone pour gérer les prises de rendez-vous, les annulations et les reprogrammations.",
      impact: "2-3h perdues/jour",
      color: "red"
    },
    {
      icon: CalendarX,
      title: "30% de No-Shows",
      description: "Les absences non justifiées désorganisent votre planning, créent des pertes de revenus et empêchent d'autres patients d'accéder aux soins.",
      impact: "Perte de 15-20% du CA",
      color: "orange"
    },
    {
      icon: FileText,
      title: "Dossiers Patients Éparpillés",
      description: "Les informations médicales dispersées entre papier et systèmes numériques rendent difficile le suivi patient et augmentent les risques d'erreur.",
      impact: "15 min/consultation perdues",
      color: "amber"
    },
    {
      icon: Clock,
      title: "Doubles Réservations",
      description: "La gestion manuelle des agendas entraîne des conflits d'horaires, créant du stress pour votre équipe et de l'insatisfaction chez vos patients.",
      impact: "Erreurs hebdomadaires",
      color: "rose"
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-white overflow-hidden" id='ProblemsSectionMedical'>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}></div>

      {/* Decorative colored blurs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-red-50/50 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-orange-50/50 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-700 tracking-wide">
              Les Défis du Quotidien
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Vous Reconnaissez Ces{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">
              Problèmes
            </span>
            {' '}?
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Ne laissez plus la logistique administrative empiéter sur la qualité de vos soins et votre bien-être professionnel.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            
            const colorClasses = {
              red: {
                border: 'border-red-100 hover:border-red-200',
                iconBg: 'bg-red-50',
                iconColor: 'text-red-600',
                badge: 'bg-red-50 text-red-700 border-red-100'
              },
              orange: {
                border: 'border-orange-100 hover:border-orange-200',
                iconBg: 'bg-orange-50',
                iconColor: 'text-orange-600',
                badge: 'bg-orange-50 text-orange-700 border-orange-100'
              },
              amber: {
                border: 'border-amber-100 hover:border-amber-200',
                iconBg: 'bg-amber-50',
                iconColor: 'text-amber-600',
                badge: 'bg-amber-50 text-amber-700 border-amber-100'
              },
              rose: {
                border: 'border-rose-100 hover:border-rose-200',
                iconBg: 'bg-rose-50',
                iconColor: 'text-rose-600',
                badge: 'bg-rose-50 text-rose-700 border-rose-100'
              }
            };

            const colors = colorClasses[problem.color] || colorClasses.red;

            return (
              <div
                key={index}
                className={`group relative bg-white border-2 ${colors.border} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl`}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 shrink-0 rounded-xl ${colors.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${colors.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {problem.description}
                    </p>

                    {/* Impact Badge */}
                    <div className="pt-2">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${colors.badge} text-sm font-semibold`}>
                        <TrendingDown className="w-4 h-4" />
                        <span>Impact: {problem.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto text-center bg-gray-50 border border-gray-100 rounded-2xl p-8 lg:p-10">
          <p className="text-gray-900 font-medium text-lg lg:text-xl mb-6">
            Ces problèmes vous coûtent en moyenne{' '}
            <span className="font-bold text-red-600">15 heures</span> par semaine et jusqu'à{' '}
            <span className="font-bold text-red-600">20% de votre chiffre d'affaires</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="flex items-center gap-2 text-sky-600 font-bold text-lg animate-pulse">
              <span className="w-2 h-2 bg-sky-600 rounded-full"></span>
              Il existe une solution simple
            </span>
            <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
            {/* Added Smooth Scroll here */}
            <a 
              href="#SolutionsSectionMedical" 
              onClick={(e) => handleSmoothScroll(e, "#SolutionsSectionMedical")}
              className="group inline-flex items-center gap-2 text-gray-600 hover:text-sky-600 font-medium transition-colors"
            >
              Découvrir comment on peut vous aider
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSectionMedical;