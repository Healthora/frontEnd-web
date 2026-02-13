/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar, Users, TrendingUp, Activity, Clock, UserCheck,
  UserX, DollarSign, BarChart3, Download, Filter, ArrowUpRight,
  ArrowDownRight, RefreshCw, CalendarCheck, UserPlus,
  CheckCircle2, AlertCircle, ChevronRight, MoreVertical,
  Stethoscope, PieChart as PieChartIcon, LineChart as LineChartIcon,
  TrendingDown
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

  let currentAngle = 0;
  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <svg viewBox="0 0 100 100" className="w-40 h-40 -rotate-90">
        {data.map((item, i) => {
          const percentage = (item.value / total) * 100;
          const angle = (percentage / 100) * 360;
          const x1 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
          const y1 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
          currentAngle += angle;
          const x2 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
          const y2 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
          const largeArc = angle > 180 ? 1 : 0;

          return (
            <path
              key={i}
              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={item.color}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          );
        })}
        <circle cx="50" cy="50" r="28" fill="white" />
      </svg>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-full">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-xs font-bold text-gray-600 truncate">{item.label}</span>
            <span className="text-[10px] text-gray-400 font-bold ml-auto">{((item.value / total) * 100).toFixed(0)}%</span>
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

    // 1. Top Cards Metrics
    const appsToday = apps.filter(a => isToday(a.appointment_date));
    const upcomingApps = apps.filter(a => new Date(a.appointment_date) > now);

    const newPatientsToday = patients.filter(p => p.createdAt && isToday(p.createdAt));
    const newPatientsWeek = patients.filter(p => p.createdAt && isThisWeek(p.createdAt));
    const newPatientsMonth = patients.filter(p => p.createdAt && isThisMonth(p.createdAt));

    // Attendance & Success Rates
    const totalClosed = apps.filter(a => a.status === 'termine' || a.status === 'absent').length;
    const attended = apps.filter(a => a.status === 'termine').length;
    const absents = apps.filter(a => a.status === 'absent').length;
    const confirmed = apps.filter(a => a.status === 'confirme' || a.status === 'termine').length;

    const attendanceRate = totalClosed > 0 ? (attended / totalClosed * 100).toFixed(1) : 0;
    const missedRate = apps.length > 0 ? (absents / apps.length * 100).toFixed(1) : 0;
    const confirmationSuccess = apps.length > 0 ? (confirmed / apps.length * 100).toFixed(1) : 0;

    // 2. Pipeline distribution
    const statusMap = {
      'nouveau': { label: 'Nouveau', color: '#0ea5e9' },
      'confirme': { label: 'Confirmé', color: '#6366f1' },
      'termine': { label: 'Terminé', color: '#10b981' },
      'absent': { label: 'Absent', color: '#f43f5e' },
      'reprogramme': { label: 'Reprogrammé', color: '#3b82f6' }
    };

    const statusDistribution = Object.keys(statusMap).map(key => ({
      label: statusMap[key].label,
      value: apps.filter(a => a.status === key).length,
      color: statusMap[key].color
    })).filter(s => s.value > 0);

    // 3. Growth over time - Dynamic Range
    let chartData = [];
    if (chartRange === 'week') {
      // Get the start of the week for chartDate
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
      // Get all days of the month for chartDate
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

    // 4. Patient Analytics
    const returningPatients = patients.filter(p => (p.totalPast || 0) > 0).length;
    const firstTimePatients = patients.filter(p => (p.totalPast || 0) === 0).length;

    // 5. Visit Types
    const consultations = apps.filter(a => a.visit_type !== 'follow_up').length;
    const followups = apps.filter(a => a.visit_type === 'follow_up').length;

    return {
      totalApps: apps.length,
      todayCount: appsToday.length,
      upcomingCount: upcomingApps.length,
      newPatients: {
        today: newPatientsToday.length,
        week: newPatientsWeek.length,
        month: newPatientsMonth.length
      },
      attendanceRate,
      missedRate,
      confirmationSuccess,
      statusDistribution,
      growthChart: chartData,
      patientMix: [
        { label: 'Réguliers', value: returningPatients, color: '#6366f1' },
        { label: 'Nouveaux', value: firstTimePatients, color: '#10b981' }
      ],
      visitTypes: { consultations, followups },
      recentApps: apps.slice(0, 6)
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
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Tableau de Bord Statistique</h1>
          <p className="text-gray-500 font-medium text-lg">Indicateurs de performance et analyse métier</p>
        </div>
      </div>

      {/* Top Row (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="RDV Aujourd'hui"
          value={stats.todayCount}
          icon={CalendarCheck}
          color="sky"
          subtitle="Total RDV aujourd'hui"
        />
        <StatCard
          title="RDV À Venir"
          value={stats.upcomingCount}
          icon={Clock}
          color="indigo"
          subtitle="Prochains rendez-vous"
        />
        <StatCard
          title="Nouveaux Patients"
          value={stats.newPatients.week}
          icon={UserPlus}
          color="emerald"
          subtitle="Cette semaine"
          trend={`+${stats.newPatients.today} aujourd'hui`}
        />
        <StatCard
          title="Taux de Présence"
          value={`${stats.attendanceRate}%`}
          icon={CheckCircle2}
          color="purple"
          subtitle="Performance globale"
        />
      </div>

      {/* Middle Section: Growth & Distribution */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 📈 Evolution Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-1">Croissance des Mouvements</h3>
              <p className="text-gray-500 font-medium">Evolution des rendez-vous par jour</p>
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

        {/*  Status Distribution Pie */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-gray-900 mb-1">Pipeline Analytics</h3>
            <p className="text-gray-500 font-medium">Distribution des statuts</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <SimplePieChart data={stats.statusDistribution} />
          </div>
        </div>
      </div>

      {/* Patient & Business Analytics Row */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Smart Indicators */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            Smart Indicators <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">PRO</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Confirmation Success</p>
                <div className="p-2 bg-indigo-100 rounded-xl"><Calendar className="w-4 h-4 text-indigo-600" /></div>
              </div>
              <p className="text-4xl font-black text-indigo-600 mb-2">{stats.confirmationSuccess}%</p>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${stats.confirmationSuccess}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-3 font-bold">confirmed / total</p>
            </div>
            <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-red-200 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Missed Appointments</p>
                <div className="p-2 bg-red-100 rounded-xl"><UserX className="w-4 h-4 text-red-600" /></div>
              </div>
              <p className="text-4xl font-black text-red-600 mb-2">{stats.missedRate}%</p>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `${stats.missedRate}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-3 font-bold">absent / total</p>
            </div>
          </div>
        </div>

        {/* Returning vs New */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8">Patient Analytics</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-black text-gray-500 mb-2 uppercase tracking-widest">
                <span>Returning Patients</span>
                <span className="text-indigo-600">{stats.patientMix[0].value}</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${(stats.patientMix[0].value / (stats.patientMix[0].value + stats.patientMix[1].value) * 100) || 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-black text-gray-500 mb-2 uppercase tracking-widest">
                <span>New Patients</span>
                <span className="text-emerald-600">{stats.patientMix[1].value}</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${(stats.patientMix[1].value / (stats.patientMix[0].value + stats.patientMix[1].value) * 100) || 0}%` }} />
              </div>
            </div>
            <div className="pt-4 grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-lg font-black text-gray-900">{stats.newPatients.today}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase">Today</p>
              </div>
              <div className="text-center border-x border-gray-100">
                <p className="text-lg font-black text-gray-900">{stats.newPatients.week}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase">Week</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-gray-900">{stats.newPatients.month}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase">Month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visit Types */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-8">Visites par Type</h3>
          <div className="flex flex-col gap-4 flex-1">
            <div className="p-4 bg-sky-50 rounded-2xl flex items-center justify-between group hover:bg-sky-100 transition-colors">
              <div>
                <p className="text-xs font-bold text-sky-600 mb-1 uppercase tracking-widest leading-none">Consultation</p>
                <p className="text-2xl font-black text-sky-900 leading-none mt-1">{stats.visitTypes.consultations}</p>
              </div>
              <Stethoscope className="w-8 h-8 text-sky-200 group-hover:text-sky-300 transition-colors" />
            </div>
            <div className="p-4 bg-indigo-50 rounded-2xl flex items-center justify-between group hover:bg-indigo-100 transition-colors">
              <div>
                <p className="text-xs font-bold text-indigo-600 mb-1 uppercase tracking-widest leading-none">Suivi (Follow-up)</p>
                <p className="text-2xl font-black text-indigo-900 leading-none mt-1">{stats.visitTypes.followups}</p>
              </div>
              <Activity className="w-8 h-8 text-indigo-200 group-hover:text-indigo-300 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, subtitle, trend }) => {
  const bgColor = {
    sky: 'bg-sky-100 text-sky-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    purple: 'bg-purple-100 text-purple-600'
  }[color];

  const shadowColor = {
    sky: 'shadow-sky-500/10',
    indigo: 'shadow-indigo-500/10',
    emerald: 'shadow-emerald-500/10',
    purple: 'shadow-purple-500/10'
  }[color];

  return (
    <div className={`bg-white rounded-4xl border border-gray-100 p-8 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden ${shadowColor}`}>
      <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 translate-x-8 -translate-y-8 rounded-full bg-${color}-500 group-hover:scale-150 transition-transform duration-1000`} />
      <div className="flex items-start justify-between relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bgColor} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8" />
        </div>
        {trend && (
          <span className="text-[10px] font-black text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-6 relative z-10">
        <p className="text-4xl font-black text-gray-900 tracking-tighter">{value}</p>
        <h3 className="text-sm font-black text-gray-400 mt-1 uppercase tracking-widest">{title}</h3>
        <p className="text-[10px] font-bold text-gray-300 mt-2 italic">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
