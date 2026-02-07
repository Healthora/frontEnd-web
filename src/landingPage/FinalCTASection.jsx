import React from 'react';
import { ArrowRight, Check, Clock, Shield, Star, Phone, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const FinalCTASectionMedical = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-white overflow-hidden" id='FinalCTASectionMedical'>
      {/* Background pattern from Hero/Security Section */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}></div>

      {/* Decorative colored blurs from Hero Section */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-sky-200/40 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-200/40 to-transparent rounded-full blur-3xl"></div>

      {/* Decorative medical icon (Shield) */}
      <div className="absolute top-10 right-10 opacity-[0.03] hidden lg:block transform rotate-12">
        <Shield className="w-64 h-64 text-gray-900" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">

        {/* Main Content */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-8 mx-auto">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700 tracking-wide">
              Solution Certifiée & Sécurisée
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Prêt à Moderniser{' '}
            <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Votre Cabinet Médical ?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Rejoignez les centaines de confrères qui ont déjà repris le contrôle de leur temps
            et amélioré l'expérience de leurs patients.
          </p>
        </div>

        {/* Quick Benefits  */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          {["40 jours gratuits", "Sans carte bancaire", "Configuration en 5 min"].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="font-semibold text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons (Matching Hero Style) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          {isAuthenticated() ? (
            <Link
              to="/dashboard"
              className="group relative px-10 py-5 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl font-black text-lg text-white shadow-xl shadow-sky-100 hover:scale-[1.02] transition-all duration-300 min-w-[280px] text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Accéder au Tableau de Bord
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ) : (
            <Link
              to="/signup"
              className="group relative px-10 py-5 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl font-black text-lg text-white shadow-xl shadow-sky-100 hover:scale-[1.02] transition-all duration-300 min-w-[280px] text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Essai Gratuit Immédiat
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          )}

          <button className="cursor-pointer flex items-center justify-center gap-3 px-10 py-5 border-2 border-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 min-w-[280px]">
            <Phone className="w-5 h-5 text-gray-900" />
            Parler à un Expert
          </button>
        </div>

        {/* Stats Row (Refined for white background) */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <p className="text-5xl font-black text-gray-900 mb-2">500+</p>
            <p className="text-sky-600 font-bold uppercase tracking-wider text-xs">Médecins Actifs</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <p className="text-5xl font-black text-gray-900 mb-2">-70%</p>
            <p className="text-indigo-600 font-bold uppercase tracking-wider text-xs">Absences Réduites</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-emerald-600 font-bold uppercase tracking-wider text-xs">Excellence</p>
          </div>
        </div> */}

        {/* Testimonial (Clean glass effect) */}
        <div className="max-w-3xl mx-auto bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-10 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold">
                Dr
              </div>
            </div>
            <div className="flex-1 text-left">
              <p className="text-lg md:text-xl text-gray-700 italic mb-4 leading-relaxed">
                "En 3 mois, j'ai récupéré 5 heures par semaine et mes patients sont ravis.
                Le meilleur investissement pour mon cabinet."
              </p>
              <div>
                <p className="font-bold text-lg text-gray-900">Dr. abdou hadjou</p>
                <p className="text-sky-600 font-medium">Médecin Généraliste</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badges Footer */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-gray-100 text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-semibold">Certifié HDS</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-semibold">Conforme RGPD</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-500" />
            <span className="text-sm font-semibold">Support 7j/7</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASectionMedical;