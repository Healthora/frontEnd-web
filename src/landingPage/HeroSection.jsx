import {
  CheckCircle,
  Shield,
  Clock,
  TrendingUp,
  ArrowRight,
  Stethoscope,
  Calendar,
  Users,
  Activity,
  PlayCircle,
  Heart,
  Phone,
  Video,
  Bell,
  FileText,
  AlertCircle,
  Star,
  Zap,
  Award,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

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
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}></div>

      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-sky-200/40 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-200/40 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Marketing Content */}
          <div className="flex flex-col gap-8">
            {/* Trust Badge with Social Proof
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 shadow-sm">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700">
                  Certifié HDS & RGPD
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 shadow-sm">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-bold text-amber-700">
                  4.9/5 sur 2,500+ avis
                </span>
              </div>
            </div> */}

            {/* Main Value Proposition */}
            <div className="flex flex-col gap-5">
              {/* Eye-catching headline */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200 w-fit">
                <Zap className="w-4 h-4 text-sky-600" />
                <span className="text-sm font-bold text-sky-700">
                  Rejoignez Nos médecins qui ont transformé leur cabinet
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.08] tracking-tight">
                Réduisez les Absences de{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                    70%
                  </span>
                  {/* Underline decoration */}
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10C60 5 140 5 198 10" stroke="#0ea5e9" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>{" "}
                et Gagnez{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                  10h par Semaine
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed font-normal max-w-xl">
                La solution n°1 des cabinets médicaux en Algérie.{" "}
                <span className="font-semibold text-gray-900">
                  Configuration en 2 minutes
                </span>, résultats garantis dès le premier mois.
              </p>
            </div>

            {/* Results Preview Stats */}
            <div className="grid grid-cols-3 gap-4 p-5 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl border border-sky-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <p className="text-2xl font-black text-gray-900">+25%</p>
                </div>
                <p className="text-xs text-gray-600 font-semibold">Revenus moyens</p>
              </div>
              <div className="text-center border-x border-sky-200/50">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <p className="text-2xl font-black text-gray-900">15h</p>
                </div>
                <p className="text-xs text-gray-600 font-semibold">Économisées/sem</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <p className="text-2xl font-black text-gray-900">94%</p>
                </div>
                <p className="text-xs text-gray-600 font-semibold">Taux présence</p>
              </div>
            </div>

            {/* CTA Buttons with Urgency */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated() ? (
                  <Link
                    to="/dashboard"
                    className="group relative px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl font-bold text-lg text-white shadow-xl shadow-sky-200 hover:shadow-2xl hover:shadow-sky-300 hover:scale-[1.02] transition-all duration-300 text-center overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Accéder au Tableau de Bord
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="group relative px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl font-bold text-lg text-white shadow-xl shadow-sky-200 hover:shadow-2xl hover:shadow-sky-300 hover:scale-[1.02] transition-all duration-300 text-center overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5" />
                      Commencer Gratuitement
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                )}

                <button className="group flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-200 rounded-xl font-semibold text-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 relative overflow-hidden cursor-pointer">
                  <PlayCircle className="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                  Voir la Démo
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>

              {/* Urgency element */}
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-700 font-bold">
                    🔥 plusieurs médecins inscrits cette semaine
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Indicators - Enhanced */}
            <div className="flex flex-col gap-3">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                Pourquoi choisir MedSaaS ?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 text-gray-700">
                  <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold">30 jours gratuits</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-700">
                  <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold">Sans engagement</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-700">
                  <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold">Support 24/7</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-700">
                  <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold">Formation incluse</span>
                </div>
              </div>
            </div>

            {/* Testimonial Preview */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  DK
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-gray-900 text-sm">Dr. Karim M.</p>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "En 2 mois, j'ai réduit mes absences de 65% et gagné 8h par semaine. Le ROI est incroyable !"
                </p>
                <p className="text-xs text-gray-500 mt-1">Médecin Généraliste, Alger</p>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview (kept as is but enhanced) */}
          <div className="relative lg:scale-110">
            {/* Animated "Live Demo" Badge */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-xl border-2 border-sky-200">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-gray-900">Demo en Direct</span>
            </div>

            {/* Main Dashboard Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Medical Header Bar with Doctor Profile */}
              <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 p-6">
                <div className="flex items-center justify-between">
                  {/* Doctor Profile Section */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-lg overflow-hidden border-2 border-white/50">
                        <img
                          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%230ea5e9;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%236366f1;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23grad1)'/%3E%3Ctext x='100' y='120' font-family='Arial' font-size='80' fill='white' text-anchor='middle' font-weight='bold'%3EDr%3C/text%3E%3C/svg%3E"
                          alt="Doctor"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-2 border-sky-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-bold text-xl mb-0.5">
                        Dr. Sarah Martin
                      </h3>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-sky-200" />
                        <p className="text-sky-100 text-sm font-medium">
                          Médecin Généraliste
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats Badge */}
                  <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-white" />
                      <div>
                        <p className="text-white/80 text-xs font-medium">Aujourd'hui</p>
                        <p className="text-white text-lg font-bold">12 Rendez-vous</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="bg-gradient-to-br from-gray-50 via-white to-sky-50/30 p-6">
                {/* Date & Welcome */}
                <div className="mb-6">
                  <p className="text-gray-500 text-sm mb-1">{getCurrentDateFR()}</p>
                  <h4 className="text-gray-900 font-bold text-lg">Votre planning de la journée</h4>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-sky-200 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-sky-50 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-sky-600" />
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-full">
                        <TrendingUp className="w-3 h-3 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-600">+12%</span>
                      </div>
                    </div>
                    <p className="text-2xl font-black text-gray-900 mb-1">89</p>
                    <p className="text-xs text-gray-500 font-medium">Patients/semaine</p>
                  </div>

                  <div className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-sky-50 rounded-full">
                        <Activity className="w-3 h-3 text-sky-600" />
                        <span className="text-xs font-bold text-sky-600">Top</span>
                      </div>
                    </div>
                    <p className="text-2xl font-black text-gray-900 mb-1">94%</p>
                    <p className="text-xs text-gray-500 font-medium">Taux présence</p>
                  </div>

                  <div className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl flex items-center justify-center">
                        <Heart className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-indigo-50 rounded-full">
                        <span className="text-xs font-bold text-indigo-600">Actifs</span>
                      </div>
                    </div>
                    <p className="text-2xl font-black text-gray-900 mb-1">248</p>
                    <p className="text-xs text-gray-500 font-medium">Patients suivis</p>
                  </div>
                </div>

                {/* Appointments List */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-gray-900 font-bold text-sm">Prochains rendez-vous</h5>
                    <button className="text-sky-600 text-xs font-semibold hover:text-sky-700">
                      Voir tout →
                    </button>
                  </div>

                  <div className="space-y-2">
                    {[
                      { time: "09:00", name: "Marie Dupont", type: "Consultation", initials: "MD", gradient: "from-pink-400 to-pink-600", urgent: false },
                      { time: "10:30", name: "Ahmed Ben Ali", type: "Suivi post-op", initials: "AB", gradient: "from-blue-400 to-blue-600", urgent: false },
                      { time: "11:45", name: "Sophie Martin", type: "Urgence", initials: "SM", gradient: "from-red-400 to-red-600", urgent: true },
                    ].map((apt, idx) => (
                      <div key={idx} className={`group flex items-center justify-between p-3 rounded-xl border-2 transition-all hover:shadow-md cursor-pointer ${apt.urgent ? 'bg-red-50/50 border-red-200' : 'bg-white border-gray-100 hover:border-sky-200'}`}>
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${apt.gradient} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                            {apt.initials}
                            {apt.urgent && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                                <AlertCircle className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 font-bold text-sm">{apt.name}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-gray-500 text-xs">{apt.type}</p>
                              {apt.urgent && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-full">URGENT</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="hidden group-hover:flex items-center gap-1.5">
                            <button className="p-1.5 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors">
                              <Phone className="w-3.5 h-3.5 text-sky-600" />
                            </button>
                            <button className="p-1.5 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                              <Video className="w-3.5 h-3.5 text-emerald-600" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 text-sm font-bold font-mono">{apt.time}</span>
                          </div>
                          <div className={`w-2.5 h-2.5 rounded-full ${apt.urgent ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gradient-to-r from-gray-50 to-sky-50/50 px-6 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-600 font-medium">Système actif</span>
                    </div>
                    <div className="text-xs text-gray-400">•</div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-sky-600" />
                      <span className="text-xs text-gray-600 font-medium">Données sécurisées</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {['from-sky-400 to-sky-600', 'from-emerald-400 to-emerald-600', 'from-indigo-400 to-indigo-600'].map((gradient, i) => (
                        <div key={i} className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} border-2 border-white`}></div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">+245 patients</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl border-2 border-emerald-100 max-w-[260px] hidden lg:block z-20">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-emerald-600 font-black text-4xl mb-1">-70%</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">D'absences</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm font-semibold leading-snug mb-4">
                Résultats moyens après 3 mois d'utilisation
              </p>
              <div className="pt-4 border-t border-gray-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Satisfaction</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm text-gray-900 font-bold">4.9/5</span>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Médecins actifs</span>
                  <span className="text-sm text-sky-600 font-bold">2,500+</span>
                </div> */}
              </div>
            </div>

            {/* Glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 via-emerald-400/10 to-indigo-500/20 rounded-3xl blur-3xl -z-10 opacity-60"></div>
            <div className="absolute inset-0 rounded-3xl -z-10">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-sky-400/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;