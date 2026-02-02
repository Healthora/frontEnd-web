import React from "react";
import {
  CheckCircle,
  Shield,
  Clock,
  TrendingUp,
  ArrowRight,
  PlayCircle,
} from "lucide-react";

const HeroSection = () => {
  function getCurrentDateFR() {
    const date = new Date();

    const formatter = new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    let formattedDate = formatter.format(date);
    formattedDate = formattedDate
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return formattedDate;
  }

  return (
    <section className="relative w-full py-20 md:py-24 lg:py-32 overflow-hidden bg-white">
      {/* Background pattern from Security Section */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}></div>

      {/* Decorative colored blurs (Lightened for white background) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-sky-200/40 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-200/40 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-8">
            {/* Trust Badge - Updated colors for light mode */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 w-fit">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700 tracking-wide">
                Certifié HDS & Conforme RGPD
              </span>
            </div>

            {/* Main Headline - Text colors updated to dark */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
                Réduisez les Absences de{" "}
                <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                  70%
                </span>{" "}
                et Reprenez le Contrôle
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                La solution SaaS complète pour moderniser votre cabinet médical.
                Plus de temps pour vos patients, moins pour l'administratif.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl font-bold text-lg text-white shadow-xl shadow-sky-200 hover:shadow-sky-300 hover:scale-[1.02] transition-all duration-300">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Démarrer l'Essai Gratuit
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
              </button>

              <button className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-200 rounded-xl font-semibold text-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
                <PlayCircle className="w-5 h-5 text-gray-900" />
                Voir la Démo
              </button>
            </div>

            {/* Trust Indicators - Text colors updated */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium">40 jours gratuits</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium">Sans carte bancaire</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium">
                  Configuration en 5 min
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative lg:scale-110">
            {/* Main Dashboard Card */}
            <div className="relative bg-white rounded-3xl p-1 shadow-2xl border border-gray-200">
              {/* Browser Chrome */}
              <div className="bg-[#1a1f2e] rounded-t-3xl p-4 flex items-center gap-2 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex-1 mx-4 px-4 py-1.5 bg-[#0f1419] rounded-lg">
                  <p className="text-xs text-gray-500">
                    cabinet.medirendezvous.fr
                  </p>
                </div>
              </div>

              {/* Dashboard Content (Kept dark for contrast against white page) */}
              <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] rounded-b-3xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">
                      Tableau de Bord
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {getCurrentDateFR()}
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                    <span className="text-emerald-400 text-sm font-semibold">
                      12 RDV aujourd'hui
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4">
                    <Clock className="w-6 h-6 text-sky-400 mb-2" />
                    <p className="text-2xl font-bold text-white">89</p>
                    <p className="text-xs text-gray-400">Patients/semaine</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                    <TrendingUp className="w-6 h-6 text-emerald-400 mb-2" />
                    <p className="text-2xl font-bold text-white">92%</p>
                    <p className="text-xs text-gray-400">Taux présence</p>
                  </div>
                  <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                    <Shield className="w-6 h-6 text-indigo-400 mb-2" />
                    <p className="text-2xl font-bold text-white">248</p>
                    <p className="text-xs text-gray-400">Patients actifs</p>
                  </div>
                </div>

                {/* Appointments List */}
                <div className="space-y-2">
                  {[
                    {
                      time: "09:00",
                      name: "kebdani issam",
                      type: "Consultation",
                    },
                    { time: "10:30", name: "aymen medlci", type: "Suivi" },
                    { time: "14:00", name: "Maria Kebdani", type: "En attente" },
                  ].map((apt, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                          {apt.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">
                            {apt.name}
                          </p>
                          <p className="text-gray-400 text-xs">{apt.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-300 text-sm font-mono">
                          {apt.time}
                        </span>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Stat Card - Background adjusted for light mode */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 max-w-[220px] hidden lg:block z-20">
              <p className="text-sky-600 font-bold text-4xl mb-2">-70%</p>
              <p className="text-gray-600 text-sm font-semibold">
                d'absences après 3 mois d'utilisation
              </p>
            </div>

            {/* Glow effect - Adjusted to be subtle on white */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/30 to-indigo-500/30 rounded-3xl blur-3xl -z-10 opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;