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



// --- Components ---

const QuickKPI = ({ title, value, icon: Icon, color, subtitle }) => {
  const colorClasses = {
    sky: 'bg-sky-100 text-sky-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-3xl font-black text-gray-900 mb-1">{value}</p>
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">{title}</h3>
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
    <div className={`p-5 rounded-2xl border-2 ${colorClasses[color]} flex items-center justify-between group hover:scale-[1.02] transition-transform`}>
      <div className="flex items-center gap-4">
        <Icon className={`w-6 h-6 ${iconColors[color]}`} />
        <div>
          <p className="text-sm font-bold opacity-70 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-black mt-1">{count}</p>
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
    <div>
      <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
        <span>{label}</span>
        <span>{count} / {total}</span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-1000`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const AlertCard = ({ title, count, icon: Icon, color, description }) => {
  const colorClasses = {
    amber: 'bg-amber-50 border-amber-200',
    sky: 'bg-sky-50 border-sky-200',
    indigo: 'bg-indigo-50 border-indigo-200'
  };

  const iconColors = {
    amber: 'text-amber-600',
    sky: 'text-sky-600',
    indigo: 'text-indigo-600'
  };

  return (
    <div className={`p-5 rounded-2xl border ${colorClasses[color]} flex items-center gap-4`}>
      <div className={`p-3 bg-white rounded-xl ${iconColors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-600">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div className="text-2xl font-black text-gray-900">{count}</div>
    </div>
  );
};

const AppointmentCard = ({ appointment, patients }) => {
  const patient = patients.find(p => p.id === appointment.patient_id);

  const statusConfig = {
    'nouveau': { label: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
    'confirme': { label: 'Confirmé', color: 'bg-emerald-100 text-emerald-700' },
    'ne_repond_pas': { label: 'Ne répond pas', color: 'bg-amber-100 text-amber-700' },
    'reprogramme': { label: 'Reprogrammé', color: 'bg-purple-100 text-purple-700' },
    'absent': { label: 'Absent', color: 'bg-red-100 text-red-700' },
    'suivi': { label: 'Suivi', color: 'bg-indigo-100 text-indigo-700' },
    'termine': { label: 'Terminé', color: 'bg-gray-100 text-gray-700' }
  };

  const status = statusConfig[appointment.status] || statusConfig['nouveau'];

  return (
    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-sky-200 transition-all flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold">
          {patient?.firstName?.[0]}{patient?.lastName?.[0]}
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">
            {patient?.firstName} {patient?.lastName}
          </p>
          <p className="text-xs text-gray-500">{patient?.phone}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${status.color}`}>
          {status.label}
        </span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { doctor } = useDoctor();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    appointments: [],
    patients: []
  });

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

    // 📅 Rendez-vous rapides
    const todayApps = apps.filter(a => isToday(a.appointment_date));
    const tomorrowApps = apps.filter(a => isTomorrow(a.appointment_date));
    const overdueApps = apps.filter(a => isPast(a.appointment_date) &&
      !['termine', 'absent'].includes(a.status));

    // 👤 Patients
    const newPatientsToday = patients.filter(p => p.createdAt && isToday(p.createdAt));
    const latestPatient = patients.length > 0 ? patients[patients.length - 1] : null;

    // 🚦 État du travail (aujourd'hui) - Tous les statuts
    const nouveauToday = todayApps.filter(a => a.status === 'nouveau').length;
    const confirmedToday = todayApps.filter(a => a.status === 'confirme').length;
    const neRepondPasToday = todayApps.filter(a => a.status === 'ne_repond_pas').length;
    const reprogrammedToday = todayApps.filter(a => a.status === 'reprogramme').length;
    const absentToday = todayApps.filter(a => a.status === 'absent').length;
    const suiviToday = todayApps.filter(a => a.status === 'suivi').length;
    const termineToday = todayApps.filter(a => a.status === 'termine').length;

    // � Types de Visite (aujourd'hui)
    const consultationsToday = todayApps.filter(a => a.visit_type === 'consultation').length;
    const followUpsToday = todayApps.filter(a => a.visit_type === 'follow_up').length;

    // 📊 KPIs rapides
    const totalToday = todayApps.length;
    const uniquePatientsToday = new Set(todayApps.map(a => a.patient_id)).size;
    const attendedToday = todayApps.filter(a => a.status === 'termine').length;
    const attendanceRate = totalToday > 0 ? ((attendedToday / totalToday) * 100).toFixed(0) : 0;

    return {
      todayApps,
      tomorrowApps,
      overdueApps,
      newPatientsToday,
      latestPatient,
      nouveauToday,
      confirmedToday,
      neRepondPasToday,
      reprogrammedToday,
      absentToday,
      suiviToday,
      termineToday,
      consultationsToday,
      followUpsToday,
      totalToday,
      uniquePatientsToday,
      attendanceRate,
      newPatientsCount: newPatientsToday.length
    };
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-sky-100 border-t-sky-600 rounded-full animate-spin" />
        <p className="text-gray-500 font-bold">Chargement du tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Tableau de Bord
          </h1>
          <p className="text-gray-500 font-medium text-lg mt-1">
            Vue d'ensemble de votre journée
          </p>
        </div>
      </div>

      {/* 📊 KPIs Rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Rendez-vous Rapides */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500">
          <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
            📅 Rendez-vous Rapides
          </h3>
          <div className="space-y-4">
            <AppointmentQuickView
              title="Aujourd'hui"
              count={stats.todayApps.length}
              color="sky"
              icon={Calendar}
            />
            <AppointmentQuickView
              title="Demain"
              count={stats.tomorrowApps.length}
              color="indigo"
              icon={Clock}
            />
            <AppointmentQuickView
              title="En Retard"
              count={stats.overdueApps.length}
              color="red"
              icon={CalendarX}
              alert={stats.overdueApps.length > 0}
            />
          </div>
        </div>

        {/* État du Travail */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500">
          <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
            🚦 État du Travail
          </h3>
          <div className="space-y-4">
            <StatusBar
              label="Nouveau"
              count={stats.nouveauToday}
              total={stats.totalToday}
              color="sky"
            />
            <StatusBar
              label="Confirmé"
              count={stats.confirmedToday}
              total={stats.totalToday}
              color="emerald"
            />
            <StatusBar
              label="Ne Répond Pas"
              count={stats.neRepondPasToday}
              total={stats.totalToday}
              color="amber"
            />
            <StatusBar
              label="Reprogrammé"
              count={stats.reprogrammedToday}
              total={stats.totalToday}
              color="purple"
            />
            <StatusBar
              label="Absent"
              count={stats.absentToday}
              total={stats.totalToday}
              color="red"
            />
            <StatusBar
              label="Suivi"
              count={stats.suiviToday}
              total={stats.totalToday}
              color="indigo"
            />
            <StatusBar
              label="Terminé"
              count={stats.termineToday}
              total={stats.totalToday}
              color="gray"
            />
          </div>
        </div>
      </div>

      {/* 👤 Patients + 🔔 Alertes */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Patients */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500">
          <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
            👤 Patients
          </h3>
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-3xl border border-sky-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-sky-600 uppercase tracking-wider">
                  Nouveaux Aujourd'hui
                </p>
                <UserPlus className="w-5 h-5 text-sky-400" />
              </div>
              <p className="text-4xl font-black text-sky-900">{stats.newPatientsCount}</p>
            </div>

            {stats.latestPatient && (
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Dernier Patient Ajouté
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                    {stats.latestPatient.firstName?.[0]}{stats.latestPatient.lastName?.[0]}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {stats.latestPatient.first_name} {stats.latestPatient.last_name}
                    </p>
                    <p className="text-xs text-gray-500">{stats.latestPatient.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Types de Visite */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500">
          <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
            Types de Visite
          </h3>
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-br from-sky-50 to-sky-100 rounded-3xl border border-sky-200 flex items-center justify-between group hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white rounded-2xl shadow-sm">
                  <Stethoscope className="w-8 h-8 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-sky-600 uppercase tracking-wider">Consultation</p>
                  <p className="text-3xl font-black text-sky-900 mt-1">{stats.consultationsToday}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl border border-indigo-200 flex items-center justify-between group hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white rounded-2xl shadow-sm">
                  <Activity className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Suivi</p>
                  <p className="text-3xl font-black text-indigo-900 mt-1">{stats.followUpsToday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prochains Rendez-vous */}
      {stats.todayApps.length > 0 && (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
          <h3 className="text-2xl font-black text-gray-900 mb-6">
            Prochains Rendez-vous Aujourd'hui
          </h3>
          <div className="grid gap-4">
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
