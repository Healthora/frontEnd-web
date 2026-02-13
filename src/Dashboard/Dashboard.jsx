/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar, Users, Clock, UserCheck, UserX, AlertCircle,
  CalendarCheck, UserPlus, CheckCircle2, Bell, TrendingUp,
  Activity, PhoneOff, CalendarX, ArrowRight, Stethoscope
} from 'lucide-react';
import { useDoctor } from '../hooks/useDoctor';
import { appointmentService } from '../services/appointmentService';
import { patientService } from '../services/patientService';

const isToday = (dateStr) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

const isTomorrow = (dateStr) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();
};

const isPast = (dateStr) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

const QuickKPI = ({ title, value, icon: Icon, color, subtitle }) => {
  const colorClasses = {
    sky: 'bg-sky-100 text-sky-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">{value}</p>
      <h3 className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest">{title}</h3>
      <p className="text-[10px] font-bold text-gray-300 mt-1 italic">{subtitle}</p>
    </div>
  );
};

const AppointmentQuickView = ({ title, count, color, icon: Icon, alert }) => {
  const colorClasses = {
    sky: 'bg-sky-50 border-sky-200 text-sky-900',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    red: 'bg-red-50 border-red-200 text-red-900',
    amber: 'bg-amber-50 border-amber-200 text-amber-900'
  };

  const iconColors = {
    sky: 'text-sky-400',
    indigo: 'text-indigo-400',
    red: 'text-red-400',
    amber: 'text-amber-400'
  };

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border-2 ${colorClasses[color]} flex items-center justify-between group hover:scale-[1.01] transition-transform`}>
      <div className="flex items-center gap-3 sm:gap-4">
        <Icon className={`w-5 h-5 sm:w-6 h-6 ${iconColors[color]}`} />
        <div>
          <p className="text-[10px] sm:text-sm font-bold opacity-70 uppercase tracking-wider">{title}</p>
          <p className="text-xl sm:text-2xl font-black mt-0.5">{count}</p>
        </div>
      </div>
      {alert && count > 0 && (
        <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
      )}
    </div>
  );
};

const StatusBar = ({ label, count, total, color }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  const colorClasses = {
    sky: 'bg-sky-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    indigo: 'bg-indigo-500',
    gray: 'bg-gray-500'
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-700 mb-2">
        <span>{label}</span>
        <span>{count} / {total}</span>
      </div>
      <div className="w-full h-2.5 sm:h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-1000`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const AppointmentCard = ({ appointment, patients }) => {
  const patient = patients.find(p => p.id === appointment.patient_id);

  const statusConfig = {
    'nouveau': { label: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
    'confirme': { label: 'Confirmé', color: 'bg-emerald-100 text-emerald-700' },
    'ne_repond_pas': { label: 'Non rep.', color: 'bg-amber-100 text-amber-700' },
    'reprogramme': { label: 'Reprog.', color: 'bg-purple-100 text-purple-700' },
    'absent': { label: 'Absent', color: 'bg-red-100 text-red-700' },
    'suivi': { label: 'Suivi', color: 'bg-indigo-100 text-indigo-700' },
    'termine': { label: 'Terminé', color: 'bg-gray-100 text-gray-700' }
  };

  const status = statusConfig[appointment.status] || statusConfig['nouveau'];

  return (
    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-sky-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
          {patient?.firstName?.[0]}{patient?.lastName?.[0]}
        </div>
        <div className="min-w-0">
          <p className="text-base sm:text-lg font-bold text-gray-900 truncate">
            {patient?.firstName} {patient?.lastName}
          </p>
          <p className="text-xs text-gray-500">{patient?.phone}</p>
        </div>
      </div>
      <div className="flex items-center self-end sm:self-center gap-3">
        <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap ${status.color}`}>
          {status.label}
        </span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { doctor } = useDoctor();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ appointments: [], patients: [] });

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
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [doctor?.doctorId]);

  const stats = useMemo(() => {
    const apps = data.appointments;
    const patients = data.patients;

    const todayApps = apps.filter(a => isToday(a.appointment_date));
    const tomorrowApps = apps.filter(a => isTomorrow(a.appointment_date));
    const overdueApps = apps.filter(a => isPast(a.appointment_date) && !['termine', 'absent'].includes(a.status));

    const newPatientsToday = patients.filter(p => p.createdAt && isToday(p.createdAt));
    const latestPatient = patients.length > 0 ? patients[patients.length - 1] : null;

    const getStatusCount = (status) => todayApps.filter(a => a.status === status).length;

    return {
      todayApps,
      tomorrowApps,
      overdueApps,
      newPatientsCount: newPatientsToday.length,
      latestPatient,
      nouveauToday: getStatusCount('nouveau'),
      confirmedToday: getStatusCount('confirme'),
      neRepondPasToday: getStatusCount('ne_repond_pas'),
      reprogrammedToday: getStatusCount('reprogramme'),
      absentToday: getStatusCount('absent'),
      suiviToday: getStatusCount('suivi'),
      termineToday: getStatusCount('termine'),
      consultationsToday: todayApps.filter(a => a.visit_type === 'consultation').length,
      followUpsToday: todayApps.filter(a => a.visit_type === 'follow_up').length,
      totalToday: todayApps.length,
      attendanceRate: todayApps.length > 0 ? ((getStatusCount('termine') / todayApps.length) * 100).toFixed(0) : 0
    };
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-sky-100 border-t-sky-600 rounded-full animate-spin" />
        <p className="text-gray-500 font-bold text-center">Chargement du tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-10">
      {/* Header */}
      <div className="px-1">
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Tableau de Bord
        </h1>
        <p className="text-gray-500 font-medium text-sm sm:text-lg mt-1">
          Vue d'ensemble de votre journée
        </p>
      </div>

      {/* 📊 KPIs Rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <QuickKPI
          title="RDV Aujourd'hui"
          value={stats.totalToday}
          icon={CalendarCheck}
          color="sky"
          subtitle="Total rendez-vous"
        />
        <QuickKPI
          title="Taux de Présence"
          value={`${stats.attendanceRate}%`}
          icon={CheckCircle2}
          color="emerald"
          subtitle="Aujourd'hui"
        />
        <QuickKPI
          title="Nouveaux Patients"
          value={stats.newPatientsCount}
          icon={UserPlus}
          color="indigo"
          subtitle="Aujourd'hui"
        />
      </div>

      {/* 📅 Rendez-vous Rapides + 🚦 État du Travail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rendez-vous Rapides */}
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-gray-100 p-5 sm:p-8 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
            📅 Rendez-vous
          </h3>
          <div className="space-y-4">
            <AppointmentQuickView title="Aujourd'hui" count={stats.todayApps.length} color="sky" icon={Calendar} />
            <AppointmentQuickView title="Demain" count={stats.tomorrowApps.length} color="indigo" icon={Clock} />
            <AppointmentQuickView title="En Retard" count={stats.overdueApps.length} color="red" icon={CalendarX} alert={stats.overdueApps.length > 0} />
          </div>
        </div>

        {/* État du Travail */}
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-gray-100 p-5 sm:p-8 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-6">
            🚦 État du Travail
          </h3>
          <div className="space-y-1">
            <StatusBar label="Nouveau" count={stats.nouveauToday} total={stats.totalToday} color="sky" />
            <StatusBar label="Confirmé" count={stats.confirmedToday} total={stats.totalToday} color="emerald" />
            <StatusBar label="Absent" count={stats.absentToday} total={stats.totalToday} color="red" />
            <StatusBar label="Terminé" count={stats.termineToday} total={stats.totalToday} color="gray" />
          </div>
        </div>
      </div>

      {/* 👤 Patients + Types de Visite */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-gray-100 p-5 sm:p-8 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-6">👤 Patients</h3>
          <div className="space-y-5">
            <div className="p-5 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl border border-sky-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Nouveaux Aujourd'hui</p>
                <UserPlus className="w-5 h-5 text-sky-400" />
              </div>
              <p className="text-3xl font-black text-sky-900">{stats.newPatientsCount}</p>
            </div>
            {stats.latestPatient && (
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Dernier Ajouté</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs uppercase">
                    {stats.latestPatient.firstName?.[0]}{stats.latestPatient.lastName?.[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 truncate text-sm">{stats.latestPatient.firstName} {stats.latestPatient.lastName}</p>
                    <p className="text-xs text-gray-500">{stats.latestPatient.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-gray-100 p-5 sm:p-8 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-6">Visites</h3>
          <div className="space-y-4">
            <div className="p-4 sm:p-6 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm"><Stethoscope className="w-6 h-6 text-sky-600" /></div>
              <div>
                <p className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Consultation</p>
                <p className="text-2xl font-black text-sky-900">{stats.consultationsToday}</p>
              </div>
            </div>
            <div className="p-4 sm:p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm"><Activity className="w-6 h-6 text-indigo-600" /></div>
              <div>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Suivi</p>
                <p className="text-2xl font-black text-indigo-900">{stats.followUpsToday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prochains Rendez-vous */}
      {stats.todayApps.length > 0 && (
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-gray-100 p-5 sm:p-8 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-6">Prochains RDV</h3>
          <div className="grid gap-3">
            {stats.todayApps.slice(0, 5).map((app) => (
              <AppointmentCard key={app.id} appointment={app} patients={data.patients} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;