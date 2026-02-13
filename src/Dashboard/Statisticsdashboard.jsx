/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar, Users, TrendingUp, Activity, Clock, UserCheck,
  UserX, DollarSign, BarChart3, Download, Filter, ArrowUpRight,
  ArrowDownRight, RefreshCw, CalendarCheck, UserPlus,
  CheckCircle2, AlertCircle, ChevronRight, MoreVertical,
  Stethoscope, PieChart as PieChartIcon, LineChart as LineChartIcon,
  TrendingDown, PhoneOff, CalendarX, Repeat
} from 'lucide-react';
import { useDoctor } from '../hooks/useDoctor';
import { appointmentService } from '../services/appointmentService';
import { patientService } from '../services/patientService';

// --- Helpers ---
const isToday = (dateStr) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

const isThisWeek = (dateStr) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return date >= startOfWeek;
};

const isThisMonth = (dateStr) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const today = new Date();
  return date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

const isThisYear = (dateStr) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const today = new Date();
  return date.getFullYear() === today.getFullYear();
};

// --- Custom Components ---

const SimpleLineChart = ({ data, color = "#3b82f6" }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.value), 1);
  const height = 100;
  const width = 300;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (d.value / max) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40 overflow-visible">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M 0 ${height} L ${points} L ${width} ${height} Z`}
        fill="url(#lineGrad)"
      />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const SimplePieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return (
    <div className="h-48 flex items-center justify-center text-gray-400">
      <PieChartIcon className="w-12 h-12 opacity-20" />
    </div>
  );

  // Pre-calculate angles for each segment
  const segments = data.reduce((acc, item, i) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = i === 0 ? 0 : acc[i - 1].endAngle;
    const endAngle = startAngle + angle;

    acc.push({
      ...item,
      startAngle,
      endAngle,
      angle,
      percentage
    });
    return acc;
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <svg viewBox="0 0 100 100" className="w-40 h-40 -rotate-90">
        {segments.map((segment, i) => {
          // Special case: if this is the only segment (100%), draw a full circle
          if (segments.length === 1) {
            return (
              <circle
                key={i}
                cx="50"
                cy="50"
                r="40"
                fill={segment.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            );
          }

          // Normal case: multiple segments
          const x1 = 50 + 40 * Math.cos((segment.startAngle * Math.PI) / 180);
          const y1 = 50 + 40 * Math.sin((segment.startAngle * Math.PI) / 180);
          const x2 = 50 + 40 * Math.cos((segment.endAngle * Math.PI) / 180);
          const y2 = 50 + 40 * Math.sin((segment.endAngle * Math.PI) / 180);
          const largeArc = segment.angle > 180 ? 1 : 0;

          return (
            <path
              key={i}
              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={segment.color}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          );
        })}
        <circle cx="50" cy="50" r="28" fill="white" />
      </svg>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-full">
        {segments.map((segment, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: segment.color }} />
            <span className="text-xs font-bold text-gray-600 truncate">{segment.label}</span>
            <span className="text-[10px] text-gray-400 font-bold ml-auto">{segment.percentage.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatisticsDashboard = () => {
  const { doctor } = useDoctor();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    appointments: [],
    patients: []
  });
  const [chartRange, setChartRange] = useState('week'); // 'week' or 'month'
  const [chartDate, setChartDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      if (!doctor?.doctorId) return;
      setLoading(true);
      try {
        const [appointments, patients] = await Promise.all([
          appointmentService.getAll(doctor.doctorId),
          patientService.getAll(doctor.doctorId)
        ]);
        setData({ appointments, patients });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [doctor?.doctorId]);

  const stats = useMemo(() => {
    const now = new Date();
    const apps = data.appointments;
    const patients = data.patients;

    // 📆 1. Appointment Analytics
    const appsToday = apps.filter(a => isToday(a.appointment_date));
    const appsWeek = apps.filter(a => isThisWeek(a.appointment_date));
    const appsMonth = apps.filter(a => isThisMonth(a.appointment_date));
    const appsYear = apps.filter(a => isThisYear(a.appointment_date));

    // 🧾 2. Status Analysis
    const statusCounts = {
      confirme: apps.filter(a => a.status === 'confirme').length,
      absent: apps.filter(a => a.status === 'absent').length,
      reprogramme: apps.filter(a => a.status === 'reprogramme').length,
      termine: apps.filter(a => a.status === 'termine').length,
      ne_repond_pas: apps.filter(a => a.status === 'ne_repond_pas').length,
      nouveau: apps.filter(a => a.status === 'nouveau').length,
      suivi: apps.filter(a => a.status === 'suivi').length
    };

    const totalApps = apps.length;
    const statusPercentages = {
      confirme: totalApps > 0 ? ((statusCounts.confirme / totalApps) * 100).toFixed(1) : 0,
      absent: totalApps > 0 ? ((statusCounts.absent / totalApps) * 100).toFixed(1) : 0,
      reprogramme: totalApps > 0 ? ((statusCounts.reprogramme / totalApps) * 100).toFixed(1) : 0,
      termine: totalApps > 0 ? ((statusCounts.termine / totalApps) * 100).toFixed(1) : 0
    };

    // Status distribution for pie chart
    const statusDistribution = [
      { label: 'Confirmé', value: statusCounts.confirme, color: '#10b981' },
      { label: 'Terminé', value: statusCounts.termine, color: '#6366f1' },
      { label: 'Absent', value: statusCounts.absent, color: '#ef4444' },
      { label: 'Reprogrammé', value: statusCounts.reprogramme, color: '#f59e0b' },
      { label: 'Ne répond pas', value: statusCounts.ne_repond_pas, color: '#8b5cf6' },
      { label: 'Nouveau', value: statusCounts.nouveau, color: '#0ea5e9' },
      { label: 'Suivi', value: statusCounts.suivi, color: '#ec4899' }
    ].filter(s => s.value > 0);

    // 👥 3. Patient Behavior
    const patientAppointmentCounts = {};
    apps.forEach(app => {
      if (!patientAppointmentCounts[app.patient_id]) {
        patientAppointmentCounts[app.patient_id] = 0;
      }
      patientAppointmentCounts[app.patient_id]++;
    });

    const returningPatients = Object.values(patientAppointmentCounts).filter(count => count > 1).length;
    const newPatients = Object.values(patientAppointmentCounts).filter(count => count === 1).length;
    const avgVisitsPerPatient = patients.length > 0 ? (apps.length / patients.length).toFixed(1) : 0;

    // Retention rate (patients with more than 1 visit)
    const retentionRate = patients.length > 0 ? ((returningPatients / patients.length) * 100).toFixed(1) : 0;

    // ⏰ 4. Time Optimization (simplified - would need time data in appointments)
    // For now, we'll analyze by day of week
    const dayOfWeekCounts = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat
    apps.forEach(app => {
      const date = new Date(app.appointment_date);
      dayOfWeekCounts[date.getDay()]++;
    });

    const bestDay = dayOfWeekCounts.indexOf(Math.max(...dayOfWeekCounts));
    const worstDay = dayOfWeekCounts.indexOf(Math.min(...dayOfWeekCounts.filter(c => c > 0)));
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    // 📉 5. Lost Revenue Indicators
    const lostAppointments = {
      ne_repond_pas: statusCounts.ne_repond_pas,
      absent: statusCounts.absent,
      reprogramme: statusCounts.reprogramme
    };

    // 📊 6. Growth Metrics
    const patientsThisMonth = patients.filter(p => p.createdAt && isThisMonth(p.createdAt)).length;
    const patientsLastMonth = patients.filter(p => {
      if (!p.createdAt) return false;
      const date = new Date(p.createdAt);
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
    }).length;

    const patientGrowth = patientsLastMonth > 0
      ? (((patientsThisMonth - patientsLastMonth) / patientsLastMonth) * 100).toFixed(1)
      : 0;

    // Growth chart data
    let chartData = [];
    if (chartRange === 'week') {
      const start = new Date(chartDate);
      start.setDate(chartDate.getDate() - chartDate.getDay());

      chartData = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        return {
          label: d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
          value: apps.filter(a => a.appointment_date === dateStr).length
        };
      });
    } else {
      const year = chartDate.getFullYear();
      const month = chartDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      chartData = Array.from({ length: daysInMonth }, (_, i) => {
        const d = new Date(year, month, i + 1);
        const dateStr = d.toISOString().split('T')[0];
        return {
          label: (i + 1).toString(),
          value: apps.filter(a => a.appointment_date === dateStr).length
        };
      });
    }

    // Visit types
    const consultations = apps.filter(a => a.visit_type === 'consultation').length;
    const followups = apps.filter(a => a.visit_type === 'follow_up').length;

    return {
      // Appointment Analytics
      appsToday: appsToday.length,
      appsWeek: appsWeek.length,
      appsMonth: appsMonth.length,
      appsYear: appsYear.length,

      // Status Analysis
      statusCounts,
      statusPercentages,
      statusDistribution,

      // Patient Behavior
      returningPatients,
      newPatients,
      avgVisitsPerPatient,
      retentionRate,

      // Time Optimization
      bestDay: dayNames[bestDay],
      worstDay: dayNames[worstDay],
      dayOfWeekCounts,

      // Lost Revenue
      lostAppointments,
      totalLost: lostAppointments.ne_repond_pas + lostAppointments.absent,

      // Growth Metrics
      patientsThisMonth,
      patientGrowth,
      appsGrowth: appsMonth.length,

      // Charts
      growthChart: chartData,

      // Visit Types
      consultations,
      followups,

      // Totals
      totalApps: apps.length,
      totalPatients: patients.length
    };
  }, [data, chartRange, chartDate]);

  const handlePrev = () => {
    const newDate = new Date(chartDate);
    if (chartRange === 'week') {
      newDate.setDate(chartDate.getDate() - 7);
    } else {
      newDate.setMonth(chartDate.getMonth() - 1);
    }
    setChartDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(chartDate);
    if (chartRange === 'week') {
      newDate.setDate(chartDate.getDate() + 7);
    } else {
      newDate.setMonth(chartDate.getMonth() + 1);
    }
    setChartDate(newDate);
  };

  const getPeriodLabel = () => {
    if (chartRange === 'week') {
      const start = new Date(chartDate);
      start.setDate(chartDate.getDate() - chartDate.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`;
    }
    return chartDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-sky-100 border-t-sky-600 rounded-full animate-spin" />
        <p className="text-gray-500 font-bold">Chargement de vos analyses...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Statistiques
          </h1>
          <p className="text-gray-500 font-medium text-lg mt-1">
            Analyse approfondie et indicateurs de performance
          </p>
        </div>
      </div>

      {/* 📆 1. Appointment Analytics */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
          📆 Analyse des Rendez-vous
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <AnalyticsCard
            title="Aujourd'hui"
            value={stats.appsToday}
            icon={Calendar}
            color="sky"
          />
          <AnalyticsCard
            title="Cette Semaine"
            value={stats.appsWeek}
            icon={CalendarCheck}
            color="indigo"
          />
          <AnalyticsCard
            title="Ce Mois"
            value={stats.appsMonth}
            icon={BarChart3}
            color="emerald"
          />
          <AnalyticsCard
            title="Cette Année"
            value={stats.appsYear}
            icon={TrendingUp}
            color="purple"
          />
        </div>
      </div>

      {/* Trend Chart + Status Pie */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 📈 Evolution Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-1">Tendance des RDV</h3>
              <p className="text-gray-500 font-medium">Évolution temporelle</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100">
                <button
                  onClick={() => setChartRange('week')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${chartRange === 'week' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Semaine
                </button>
                <button
                  onClick={() => setChartRange('month')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${chartRange === 'month' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Mois
                </button>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                <button onClick={handlePrev} className="p-1 hover:bg-white rounded-lg transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-400 rotate-180" />
                </button>
                <span className="text-[10px] font-black text-gray-700 uppercase tracking-wider min-w-[100px] text-center">
                  {getPeriodLabel()}
                </span>
                <button onClick={handleNext} className="p-1 hover:bg-white rounded-lg transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <SimpleLineChart data={stats.growthChart} color="#6366f1" />
          </div>
          <div className="flex justify-between mt-6 px-2 overflow-x-auto pb-2 scrollbar-hide">
            {stats.growthChart.map((d, i) => (
              <span key={i} className={`text-[10px] font-black text-gray-300 uppercase tracking-tighter shrink-0 ${chartRange === 'month' ? 'w-6 text-center' : ''}`}>{d.label}</span>
            ))}
          </div>
        </div>

        {/* 🧾 Status Distribution Pie */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-gray-900 mb-1">Statuts</h3>
            <p className="text-gray-500 font-medium">Distribution</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <SimplePieChart data={stats.statusDistribution} />
          </div>
        </div>
      </div>

      {/* 🧾 2. Status Analysis Details */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
          🧾 Analyse des Statuts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatusCard
            title="Confirmés"
            percentage={stats.statusPercentages.confirme}
            count={stats.statusCounts.confirme}
            icon={CheckCircle2}
            color="emerald"
          />
          <StatusCard
            title="Absents"
            percentage={stats.statusPercentages.absent}
            count={stats.statusCounts.absent}
            icon={UserX}
            color="red"
          />
          <StatusCard
            title="Reprogrammés"
            percentage={stats.statusPercentages.reprogramme}
            count={stats.statusCounts.reprogramme}
            icon={Repeat}
            color="amber"
          />
          <StatusCard
            title="Terminés"
            percentage={stats.statusPercentages.termine}
            count={stats.statusCounts.termine}
            icon={CheckCircle2}
            color="indigo"
          />
        </div>
      </div>

      {/* 👥 3. Patient Behavior */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
          👥 Comportement des Patients
        </h2>
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-indigo-600" />
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-4xl font-black text-gray-900 mb-2">{stats.returningPatients}</p>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Patients Réguliers</p>
            <p className="text-xs text-gray-400 mt-2">Ont consulté 2+ fois</p>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-sky-600" />
            </div>
            <p className="text-4xl font-black text-gray-900 mb-2">{stats.avgVisitsPerPatient}</p>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Visites Moyennes</p>
            <p className="text-xs text-gray-400 mt-2">Par patient</p>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <UserCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-4xl font-black text-gray-900 mb-2">{stats.retentionRate}%</p>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Taux de Rétention</p>
            <p className="text-xs text-gray-400 mt-2">Patients fidélisés</p>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <UserPlus className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-4xl font-black text-gray-900 mb-2">{stats.newPatients}</p>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Nouveaux Patients</p>
            <p className="text-xs text-gray-400 mt-2">Première visite</p>
          </div>
        </div>
      </div>

      {/* ⏰ 4. Time Optimization */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
          ⏰ Optimisation du Temps
        </h2>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Meilleur Jour</p>
                <p className="text-2xl font-black text-gray-900">{stats.bestDay}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Jour avec le plus de rendez-vous</p>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-2xl">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Jour le Plus Faible</p>
                <p className="text-2xl font-black text-gray-900">{stats.worstDay}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Opportunité d'amélioration</p>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 rounded-2xl">
                <Stethoscope className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Types de Visites</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Consultations</span>
                <span className="font-bold text-gray-900">{stats.consultations}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Suivis</span>
                <span className="font-bold text-gray-900">{stats.followups}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📉 5. Lost Revenue Indicators */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
          📉 Indicateurs de Revenus Perdus
        </h2>
        <div className="grid lg:grid-cols-3 gap-6">
          <LostRevenueCard
            title="Ne Répond Pas"
            count={stats.lostAppointments.ne_repond_pas}
            icon={PhoneOff}
            color="amber"
            description="Patients non joignables"
          />
          <LostRevenueCard
            title="Absents"
            count={stats.lostAppointments.absent}
            icon={UserX}
            color="red"
            description="Rendez-vous manqués"
          />
          <LostRevenueCard
            title="Reprogrammés"
            count={stats.lostAppointments.reprogramme}
            icon={CalendarX}
            color="purple"
            description="RDV reportés"
          />
        </div>
        <div className="mt-6 bg-gradient-to-r from-red-50 to-amber-50 rounded-3xl border border-red-100 p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-red-600 uppercase tracking-wider mb-2">Total Pertes Potentielles</p>
              <p className="text-5xl font-black text-red-900">{stats.totalLost}</p>
              <p className="text-sm text-red-600 mt-2">Rendez-vous perdus ou à risque</p>
            </div>
            <AlertCircle className="w-16 h-16 text-red-300" />
          </div>
        </div>
      </div>

      {/* 📊 6. Growth Metrics */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
          📊 Métriques de Croissance
        </h2>
        <div className="grid lg:grid-cols-3 gap-6">
          <GrowthCard
            title="Patients ce Mois"
            value={stats.patientsThisMonth}
            growth={stats.patientGrowth}
            icon={Users}
            color="emerald"
          />
          <GrowthCard
            title="RDV ce Mois"
            value={stats.appsMonth}
            icon={Calendar}
            color="sky"
          />
          <GrowthCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={Activity}
            color="indigo"
          />
        </div>
      </div>
    </div>
  );
};

// --- Components ---

const AnalyticsCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    sky: 'bg-sky-100 text-sky-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[color]} mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-3xl font-black text-gray-900 mb-1">{value}</p>
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">{title}</h3>
    </div>
  );
};

const StatusCard = ({ title, percentage, count, icon: Icon, color }) => {
  const colorClasses = {
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', bar: 'bg-emerald-500' },
    red: { bg: 'bg-red-100', text: 'text-red-600', bar: 'bg-red-500' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600', bar: 'bg-amber-500' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', bar: 'bg-indigo-500' }
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${colors.bg} rounded-2xl`}>
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        <span className="text-2xl font-black text-gray-900">{percentage}%</span>
      </div>
      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{title}</p>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${colors.bar} transition-all duration-1000`} style={{ width: `${percentage}%` }} />
      </div>
      <p className="text-xs text-gray-400 mt-2">{count} rendez-vous</p>
    </div>
  );
};

const LostRevenueCard = ({ title, count, icon: Icon, color, description }) => {
  const colorClasses = {
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600' },
    red: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600' }
  };

  const colors = colorClasses[color];

  return (
    <div className={`${colors.bg} rounded-3xl border ${colors.border} p-8 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${colors.icon}`} />
        <p className="text-4xl font-black text-gray-900">{count}</p>
      </div>
      <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">{title}</p>
      <p className="text-xs text-gray-500 mt-2">{description}</p>
    </div>
  );
};

const GrowthCard = ({ title, value, growth, icon: Icon, color }) => {
  const colorClasses = {
    emerald: 'bg-emerald-100 text-emerald-600',
    sky: 'bg-sky-100 text-sky-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 ${colorClasses[color]} rounded-2xl`}>
          <Icon className="w-6 h-6" />
        </div>
        {growth && (
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${parseFloat(growth) >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {parseFloat(growth) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-xs font-bold">{growth}%</span>
          </div>
        )}
      </div>
      <p className="text-4xl font-black text-gray-900 mb-2">{value}</p>
      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{title}</p>
    </div>
  );
};

export default StatisticsDashboard;