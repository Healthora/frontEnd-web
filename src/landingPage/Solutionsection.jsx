import React from "react";
import {
  Calendar,
  Smartphone,
  Bell,
  Users,
  BarChart3,
  FileText,
  Shield,
  Zap,
  Star,
} from "lucide-react";

const SolutionsSectionMedical = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Réservation en Ligne 24/7",
      description:
        "Vos patients réservent directement depuis leur smartphone, même en dehors des heures d'ouverture. Fini les appels manqués.",
      benefit: "Économisez 2-3h/jour",
      gradient: "from-sky-500 to-sky-600",
    },
    {
      icon: Bell,
      title: "Rappels email Automatiques",
      description:
        "Envoi automatique de rappels personnalisés 24h avant le rendez-vous et aussi 2h avant le rendez vous. Réduisez drastiquement vos absences.",
      benefit: "70% moins de no-shows",
      gradient: "from-emerald-500 to-emerald-600",
      featured: true,
    },
    {
      icon: Calendar,
      title: "Agenda Intelligent Multi-vues",
      description:
        "Visualisez votre planning par jour, semaine ou mois. Codes couleur par type de consultation et gestion des urgences.",
      benefit: "Zéro double réservation",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Users,
      title: "Dossier Patient Centralisé",
      description:
        "Toutes les informations médicales en un clic : historique, allergies, prescriptions, documents. Sécurisé et conforme HDS.",
      benefit: "15 min économisées/patient",
      gradient: "from-sky-500 to-indigo-500",
    },
    {
      icon: BarChart3,
      title: "Statistiques en Temps Réel",
      description:
        "Suivez vos KPIs : taux de présence, revenus, pathologies fréquentes. Optimisez votre pratique avec des données concrètes.",
      benefit: "Décisions éclairées",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: FileText,
      title: "Facturation Automatisée",
      description:
        "Génération automatique des factures et relances. Export comptable en un clic. Gagnez du temps sur l'administratif.",
      benefit: "100% des paiements suivis",
      gradient: "from-sky-600 to-indigo-600",
    },
  ];

  return (
    <section
      className="relative lg:py-32 bg-white overflow-hidden"
      id="SolutionsSectionMedical"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Decorative colored blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-sky-100/50 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-100/50 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 mb-6">
              <Zap className="w-4 h-4 text-sky-600" />
              <span className="text-sm font-semibold text-sky-700 tracking-wide">
                La Solution Complète
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Une Plateforme Pensée{" "}
              <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                Pour Vous
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              Conçue en collaboration avec des praticiens pour répondre aux
              réalités du terrain médical.
            </p>
          </div>
          <div className="hidden lg:block">
            <img
              src="/src/assets/doctorimg.png"
              alt="doctor"
              className="w-64 h-64 object-cover rounded-2xl shadow-lg border-4 border-transparent"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className={`group relative bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-sky-200 hover:shadow-xl transition-all duration-300 ${
                  feature.featured
                    ? "ring-2 ring-emerald-500 ring-offset-2"
                    : ""
                }`}
              >
                {/* Featured badge */}
                {feature.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                    ⭐ LE PLUS EFFICACE
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Benefit badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-50 border border-sky-100 rounded-full">
                  <Zap className="w-3.5 h-3.5 text-sky-600" />
                  <span className="text-sm font-semibold text-sky-700">
                    {feature.benefit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonial Card */}
        <div className="bg-gradient-to-br from-sky-600 to-indigo-600 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left - Testimonial */}
            <div className="flex flex-col gap-6 text-white">
              <div className="flex gap-1 text-yellow-300">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <blockquote className="text-2xl md:text-3xl font-bold leading-snug">
                "Depuis que j'utilise cette plateforme, mon cabinet est
                transformé. J'ai récupéré 5 heures par semaine et mes patients
                adorent la simplicité."
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
                  <span className="text-2xl font-bold">Dr</span>
                </div>
                <div>
                  <p className="font-bold text-lg">Dr. abdou hadjou</p>
                  <p className="text-sky-100">Médecin Généraliste</p>
                </div>
              </div>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <p className="text-5xl font-black text-white mb-2">92%</p>
                <p className="text-sky-100 font-medium">Taux de présence</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <p className="text-5xl font-black text-white mb-2">-70%</p>
                <p className="text-sky-100 font-medium">No-shows</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <p className="text-5xl font-black text-white mb-2">5h</p>
                <p className="text-sky-100 font-medium">Gagnées/semaine</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <p className="text-5xl font-black text-white mb-2">248</p>
                <p className="text-sky-100 font-medium">Patients actifs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold">Certifié HDS</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-sky-600" />
            <span className="font-semibold">Conforme RGPD</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold">ISO 27001</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSectionMedical;
