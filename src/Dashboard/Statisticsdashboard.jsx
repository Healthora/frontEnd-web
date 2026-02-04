/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/static-components */
import React, { useState } from 'react';
import {
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  UserCheck,
  UserX,
  DollarSign,
  BarChart3,
  Download,
  Filter,
  Calendar as CalendarIcon,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const StatisticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Sample data
  const stats = {
    appointmentsToday: 48,
    weeklyPatients: 324,
    noShowRate: 6.2,
    attendanceRate: 93.8,
    revenue: 12540,
    avgConsultationTime: 32,
    newPatients: 28,
    returningPatients: 296
  };

  const trends = {
    appointmentsToday: +12,
    weeklyPatients: +8,
    noShowRate: -2.3,
    attendanceRate: +5.1,
    revenue: +18.5
  };

  // Chart data
  const weeklyAppointments = [
    { day: 'Lun', value: 45 },
    { day: 'Mar', value: 52 },
    { day: 'Mer', value: 48 },
    { day: 'Jeu', value: 61 },
    { day: 'Ven', value: 55 },
    { day: 'Sam', value: 38 },
    { day: 'Dim', value: 25 }
  ];

  const patientsByAge = [
    { range: '0-17', value: 45 },
    { range: '18-30', value: 78 },
    { range: '31-50', value: 125 },
    { range: '51-70', value: 98 },
    { range: '70+', value: 54 }
  ];

  const appointmentTypes = [
    { type: 'Consultation', count: 156, color: 'sky' },
    { type: 'Suivi', count: 89, color: 'indigo' },
    { type: 'Check-up', count: 52, color: 'emerald' },
    { type: 'Urgence', count: 27, color: 'red' }
  ];

  // Mini Chart Component
  const MiniLineChart = ({ data, color = 'sky' }) => {
    const max = Math.max(...data.map(d => d.value));
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (d.value / max) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className="w-full h-16" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className={`text-${color}-500`} stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" className={`text-${color}-500`} stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={`0,100 ${points} 100,100`}
          fill={`url(#gradient-${color})`}
        />
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          className={`text-${color}-500`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  // Bar Chart Component
  const MiniBarChart = ({ data }) => {
    const max = Math.max(...data.map(d => d.value));
    
    return (
      <div className="flex items-end justify-between gap-2 h-24">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden relative" style={{ height: '100%' }}>
              <div
                className="absolute bottom-0 w-full bg-gradient-to-t from-sky-500 to-indigo-500 rounded-t-lg transition-all duration-500"
                style={{ height: `${(item.value / max) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-semibold text-gray-500">{item.day}</span>
          </div>
        ))}
      </div>
    );
  };

  // KPI Card Component
  const KPICard = ({ title, value, icon: Icon, trend, suffix = '', color = 'sky', chart, large = false }) => {
    const isPositive = trend > 0;
    const trendColor = isPositive ? 'text-emerald-600' : 'text-red-600';
    const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

    return (
      <div className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all ${large ? 'lg:col-span-2' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br from-${color}-100 to-${color}-50 rounded-xl flex items-center justify-center`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-50' : 'bg-red-50'}`}>
              <TrendIcon className={`w-3.5 h-3.5 ${trendColor}`} />
              <span className={`text-xs font-bold ${trendColor}`}>
                {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>

        <div className="mb-2">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">{title}</h3>
          <p className="text-3xl font-black text-gray-900">
            {value}
            {suffix && <span className="text-xl text-gray-500 ml-1">{suffix}</span>}
          </p>
        </div>

        {chart && (
          <div className="mt-4">
            {chart}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50/30 p-8">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Statistiques</h1>
              <p className="text-gray-500">Vue d'ensemble de votre activité médicale</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
                {['day', 'week', 'month', 'year'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      timeRange === range
                        ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {range === 'day' ? 'Jour' : range === 'week' ? 'Semaine' : range === 'month' ? 'Mois' : 'Année'}
                  </button>
                ))}
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                Filtrer
              </button>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 transition-all">
                <Download className="w-4 h-4" />
                Exporter
              </button>
            </div>
          </div>
        </div>

        {/* Main KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Rendez-vous Aujourd'hui"
            value={stats.appointmentsToday}
            icon={Calendar}
            trend={trends.appointmentsToday}
            color="sky"
          />

          <KPICard
            title="Patients cette Semaine"
            value={stats.weeklyPatients}
            icon={Users}
            trend={trends.weeklyPatients}
            color="indigo"
          />

          <KPICard
            title="Taux de Présence"
            value={stats.attendanceRate}
            suffix="%"
            icon={UserCheck}
            trend={trends.attendanceRate}
            color="emerald"
          />

          <KPICard
            title="Taux d'Absence"
            value={stats.noShowRate}
            suffix="%"
            icon={UserX}
            trend={trends.noShowRate}
            color="red"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Weekly Appointments Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Rendez-vous de la Semaine
                </h3>
                <p className="text-sm text-gray-500">
                  Évolution quotidienne
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 rounded-xl">
                <TrendingUp className="w-4 h-4 text-sky-600" />
                <span className="text-sm font-bold text-sky-700">+12% vs semaine dernière</span>
              </div>
            </div>

            <MiniBarChart data={weeklyAppointments} />

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Total</p>
                <p className="text-2xl font-black text-gray-900">324</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Moyenne/jour</p>
                <p className="text-2xl font-black text-gray-900">46</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Pic</p>
                <p className="text-2xl font-black text-gray-900">61</p>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-sm font-semibold text-emerald-100 mb-2">
                Revenus ce Mois
              </h3>
              <p className="text-4xl font-black text-white mb-4">
                {stats.revenue.toLocaleString()}€
              </p>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg w-fit">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-bold">+{trends.revenue}% vs mois dernier</span>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-emerald-100 mb-1">Nouveaux</p>
                    <p className="text-xl font-bold">{stats.newPatients}</p>
                  </div>
                  <div>
                    <p className="text-xs text-emerald-100 mb-1">Récurrents</p>
                    <p className="text-xl font-bold">{stats.returningPatients}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Patient Age Distribution */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Distribution par Âge
              </h3>
              <p className="text-sm text-gray-500">
                Répartition des patients
              </p>
            </div>

            <div className="space-y-4">
              {patientsByAge.map((item, i) => {
                const max = Math.max(...patientsByAge.map(d => d.value));
                const percentage = (item.value / max) * 100;
                
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{item.range} ans</span>
                      <span className="text-sm font-bold text-gray-900">{item.value}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Appointment Types */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Types de Consultations
              </h3>
              <p className="text-sm text-gray-500">
                Répartition des rendez-vous
              </p>
            </div>

            <div className="space-y-3">
              {appointmentTypes.map((item, i) => {
                const total = appointmentTypes.reduce((sum, t) => sum + t.count, 0);
                const percentage = ((item.count / total) * 100).toFixed(1);
                
                const colorClasses = {
                  sky: 'from-sky-500 to-sky-600 bg-sky-50 text-sky-700 border-sky-200',
                  indigo: 'from-indigo-500 to-indigo-600 bg-indigo-50 text-indigo-700 border-indigo-200',
                  emerald: 'from-emerald-500 to-emerald-600 bg-emerald-50 text-emerald-700 border-emerald-200',
                  red: 'from-red-500 to-red-600 bg-red-50 text-red-700 border-red-200'
                };
                
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 rounded-xl border ${colorClasses[item.color]}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[item.color]} rounded-lg flex items-center justify-center text-white font-bold shadow-md`}>
                        {item.count}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{item.type}</p>
                        <p className="text-xs text-gray-600">{percentage}% du total</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${colorClasses[item.color]}`}>
                      {item.count} RDV
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Total</span>
              <span className="text-xl font-black text-gray-900">
                {appointmentTypes.reduce((sum, t) => sum + t.count, 0)} rendez-vous
              </span>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Temps Moyen</p>
                <p className="text-2xl font-black text-gray-900">{stats.avgConsultationTime} min</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-sky-50 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Taux de Satisfaction</p>
                <p className="text-2xl font-black text-gray-900">4.8/5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Taux de Remplissage</p>
                <p className="text-2xl font-black text-gray-900">87%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;