import React from 'react';
import { Shield, Lock, FileCheck, Server, Eye, AlertCircle } from 'lucide-react';

const SecuritySectionMedical = () => {
  const certifications = [
    {
      icon: Lock,
      title: "Conformité RGPD",
      description: "Respect total du Règlement Général sur la Protection des Données. Vos patients contrôlent leurs informations personnelles.",
      badge: "100% Conforme",
      color: "sky"
    },
    {
      icon: FileCheck,
      title: "ISO 27001 Certifié",
      description: "Norme internationale pour la gestion de la sécurité de l'information. Audits réguliers et processus de sécurité stricts.",
      badge: "Gold Standard",
      color: "indigo"
    },
    {
      icon: Server,
      title: "Chiffrement de Bout en Bout",
      description: "Toutes les données sont chiffrées en transit (SSL/TLS) et au repos (AES-256). Protection maximale contre les accès non autorisés.",
      badge: "AES-256",
      color: "purple"
    },
    {
      icon: Eye,
      title: "Traçabilité Complète",
      description: "Logs d'accès détaillés et horodatés. Vous savez toujours qui a consulté quelles informations et quand.",
      badge: "Audit Trail",
      color: "sky"
    },
    {
      icon: AlertCircle,
      title: "Sauvegarde Automatique",
      description: "Backups quotidiens automatiques avec rétention de 30 jours. Récupération possible en cas d'incident.",
      badge: "Quotidien",
      color: "emerald"
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700 tracking-wide">
              Sécurité & Conformité
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Vos Données Médicales en{' '}
            <span className="text-emerald-600">Sécurité Maximale</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            La confidentialité médicale est sacrée. Nous adhérons aux normes de sécurité les plus strictes du secteur de la santé.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            const colorClasses = {
              emerald: {
                bg: 'from-emerald-500 to-emerald-600',
                badge: 'bg-emerald-50 text-emerald-700 border-emerald-200'
              },
              sky: {
                bg: 'from-sky-500 to-sky-600',
                badge: 'bg-sky-50 text-sky-700 border-sky-200'
              },
              indigo: {
                bg: 'from-indigo-500 to-indigo-600',
                badge: 'bg-indigo-50 text-indigo-700 border-indigo-200'
              },
              purple: {
                bg: 'from-purple-500 to-purple-600',
                badge: 'bg-purple-50 text-purple-700 border-purple-200'
              }
            };

            const colors = colorClasses[cert.color];

            return (
              <div
                key={index}
                className="group bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-emerald-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${colors.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border mb-4 ${colors.badge}`}>
                  {cert.badge}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {cert.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {cert.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Banner */}
        <div className="bg-gradient-to-r from-emerald-50 via-sky-50 to-indigo-50 border-2 border-emerald-100 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Left - Icon & Title */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Center - Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Conformité Totale aux Normes mondial
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nous prenons la confidentialité médicale au sérieux. Toutes vos données sont hébergées en France sur des serveurs dédiés à la santé, avec un niveau de sécurité équivalent aux établissements hospitaliers.
              </p>
            </div>

            {/* Right - Stats */}
            <div className="flex flex-col gap-3 flex-shrink-0">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-emerald-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">
                  Conformité RGPD
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-sky-200">
                <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">
                  Traçabilité Complète
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-indigo-200">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">
                  Audits réguliers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Nos certificats et attestations de conformité sont disponibles sur demande
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecuritySectionMedical;