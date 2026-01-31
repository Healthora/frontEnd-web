import React from 'react';
import { Phone, CalendarX, CalendarClock, Users, Clock, AlertCircle } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: Phone,
      title: "Trop d'Appels Téléphoniques",
      description: "Des heures passées chaque jour à répondre aux appels pour prendre, modifier ou annuler des rendez-vous.",
      color: "sky"
    },
    {
      icon: CalendarX,
      title: "Absences et Rendez-vous Manqués",
      description: "Jusqu'à 30% de vos rendez-vous sont manqués sans préavis, créant des pertes de revenus importantes.",
      color: "indigo"
    },
    {
      icon: CalendarClock,
      title: "Doubles Réservations",
      description: "Gestion manuelle des agendas entraînant des conflits d'horaires et des patients mécontents.",
      color: "sky"
    },
    {
      icon: Users,
      title: "Aucune Vue d'Ensemble des Patients",
      description: "Informations éparpillées rendant difficile le suivi de l'historique et des besoins de chaque patient.",
      color: "indigo"
    },
    {
      icon: Clock,
      title: "Temps Gaspillé en Administration",
      description: "Vos compétences médicales sont sous-utilisées par des tâches administratives chronophages.",
      color: "sky"
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-[#0B0C10] overflow-hidden">
      {/* Background gradient glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-sm mb-6">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-red-300">Les Défis Quotidiens</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Vous Reconnaissez Ces{' '}
            <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Problèmes {' '}?
            </span>
           
          </h2>
          
          <p className="text-lg text-gray-400 leading-relaxed">
            Chaque jour, les médecins perdent un temps précieux sur des tâches qui pourraient être automatisées. 
            Il est temps de changer cela.
          </p>
        </div>

        {/* Problems grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon;          
            return (
              <div
                key={index}
                className={`group relative bg-[#111318]/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-${problem.color}-500/50 transition-all duration-300 hover:scale-[1.02]`}
              >
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${problem.color}-500/0 to-${problem.color}-500/0 group-hover:from-${problem.color}-500/5 group-hover:to-transparent rounded-xl transition-all duration-300`}></div>
                
                {/* Card content */}
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br from-${problem.color}-500/10 to-${problem.color}-500/5 border border-${problem.color}-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-${problem.color}-500/40 transition-all duration-300`}>
                    <Icon className={`w-6 h-6 text-${problem.color}-400`} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-sky-100 transition-colors">
                    {problem.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {problem.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-${problem.color}-500/10 to-transparent rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA hint */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">
            Ces problèmes vous coûtent du temps et de l'argent chaque jour
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
            <p className="text-sky-400 font-medium">Une solution existe</p>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>

      {/* Custom animation delay */}
      <style jsx>{`
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </section>
  );
};

export default ProblemSection;