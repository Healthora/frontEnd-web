import {
  Calendar,
  CalendarCheck,
  Users,
  Stethoscope,
  BarChart3,
  User,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Tableau de Bord
          </h1>
          <p className="text-gray-500">
            Bienvenue sur votre tableau de bord médical
          </p>
        </div>
      </div>
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-sky-50 rounded-xl flex items-center justify-center">
              <CalendarCheck className="w-6 h-6 text-sky-600" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              +12%
            </span>
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-1">48</h3>
          <p className="text-sm text-gray-500">RDV Aujourd'hui</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              +8%
            </span>
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-1">324</h3>
          <p className="text-sm text-gray-500">Patients Actifs</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              +24%
            </span>
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-1">94%</h3>
          <p className="text-sm text-gray-500">Taux de Présence</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-1 rounded-full">
              Stable
            </span>
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-1">12</h3>
          <p className="text-sm text-gray-500">Médecins Actifs</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Large Card - Left */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Rendez-vous de la Journée
              </h3>
              <p className="text-sm text-gray-500">Lundi 3 Février 2026</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 transition-all">
              Voir Tout
            </button>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              Aucun rendez-vous pour le moment
            </h4>
            <p className="text-sm text-gray-500 text-center max-w-xs">
              Les rendez-vous de la journée apparaîtront ici
            </p>
          </div>
        </div>

        {/* Sidebar Card - Right */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Activité Récente
          </h3>

          {/* Activity Items */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">
                    Nouveau patient inscrit
                  </p>
                  <p className="text-xs text-gray-500">
                    Il y a {i} heure{i > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-indigo-50 rounded-3xl border border-sky-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Besoin d'aide pour démarrer ?
            </h3>
            <p className="text-gray-600 mb-4">
              Découvrez comment optimiser votre utilisation de MedSaaS
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 transition-all">
              Guide de Démarrage
            </button>
          </div>
          <div className="hidden md:block w-32 h-32 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
