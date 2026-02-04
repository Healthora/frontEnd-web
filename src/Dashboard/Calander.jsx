import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
  MoreVertical,
  Plus,
  Filter,
  Download,
  Search
} from 'lucide-react';

const Calendar = () => {
  const [view, setView] = useState('week'); 
  /* eslint-disable no-unused-vars */
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 3)); 

  // Updated Data: Only name, time, type (and id/day/status for logic)
  const appointments = [
    {
      id: 1,
      patientName: 'Marie Dupont',
      time: '09:00',
      type: 'Consultation',
      status: 'confirmed',
      day: 4
    },
    {
      id: 2,
      patientName: 'Ahmed Ben Ali',
      time: '10:30',
      type: 'Suivi',
      status: 'pending',
      day: 1
    },
    {
      id: 3,
      patientName: 'Sophie Martin',
      time: '14:00',
      type: 'Check-up',
      status: 'confirmed',
      day: 2 
    },
    {
      id: 4,
      patientName: 'Lucas Bernard',
      time: '09:30',
      type: 'Consultation',
      status: 'cancelled',
      day: 2
    },
    {
      id: 5,
      patientName: 'Emma Dubois',
      time: '11:00',
      type: 'Urgence',
      status: 'confirmed',
      day: 3 
    },
    {
      id: 6,
      patientName: 'Thomas Petit',
      time: '15:30',
      type: 'Suivi',
      status: 'pending',
      day: 4 
    },
  ];

  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const timeSlots = Array.from({ length: 11 }, (_, i) => `${8 + i}:00`); 

  const statusColors = {
    confirmed: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      hover: 'hover:border-emerald-300 hover:shadow-emerald-200/50'
    },
    pending: {
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      text: 'text-sky-700',
      dot: 'bg-sky-500',
      hover: 'hover:border-sky-300 hover:shadow-sky-200/50'
    },
    cancelled: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-500',
      dot: 'bg-gray-400',
      hover: 'hover:border-gray-300 hover:shadow-gray-200/50'
    }
  };

  const AppointmentCard = ({ appointment }) => {
    const colors = statusColors[appointment.status];
    return (
      <div
        className={`group ${colors.bg} ${colors.border} border-2 rounded-xl p-3 cursor-pointer transition-all duration-200 ${colors.hover} hover:shadow-md`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 ${colors.dot} rounded-full`} />
            <span className={`text-xs font-bold ${colors.text}`}>
              {appointment.time}
            </span>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/50 rounded">
            {/* edit button */}
            <MoreVertical className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
        <p className="font-bold text-gray-900 text-sm mb-1 truncate">
          {appointment.patientName}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span className="font-medium">{appointment.type}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50/30 ">
      <div className="max-w-[1400px] mx-auto ">  
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Calendrier</h1>
              <p className="text-gray-500">Gérez vos rendez-vous et votre planning</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 transition-all">
              <Plus className="w-5 h-5" />
              Nouveau RDV
            </button>
          </div>

          {/* Toolbar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4 ">
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                {['month', 'week', 'day'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
                      view === v
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {v === 'month' ? 'Mois' : v === 'week' ? 'Semaine' : 'Jour'}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="px-4 py-2 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 rounded-xl">
                  <p className="text-sm font-bold text-gray-900">Février 2026</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
                <button className="ml-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  Aujourd'hui
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"><Search className="w-5 h-5 text-gray-600" /></button>
                <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"><Filter className="w-5 h-5 text-gray-600" /></button>
                <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"><Download className="w-5 h-5 text-gray-600" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {view === 'week' && (
            <div className="p-6">
              {/* days */}
              <div className="grid grid-cols-8 gap-4 mb-4">
                {/* <div className="text-xs font-bold text-gray-500 uppercase flex items-end pb-2">Heure</div> */}
                {weekDays.map((day, idx) => (
                  <div key={day} className="text-center">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-2">{day}</div>
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm ${idx === 1 ? 'bg-sky-500 text-white' : 'text-gray-700'}`}>{idx + 2}</div>
                  </div>
                ))}
              </div>
              {/* time */}
              <div className="grid grid-cols-8 gap-4">
                {/* <div className="space-y-16">
                  {timeSlots.map((time) => (
                    <div key={time} className="text-xs font-semibold text-gray-500 -mt-2">{time}</div>
                  ))}
                </div> */}
                {weekDays.map((day, dayIdx) => (
                  <div key={day} className="relative">
                    <div className="absolute inset-0 space-y-16">
                      {timeSlots.map((_, idx) => (
                        <div key={idx} className="h-16 border-t border-gray-100" />
                      ))}
                    </div>
                    <div className="relative space-y-2 pt-2">
                      {appointments.filter(apt => apt.day === dayIdx).map(apt => (
                        <AppointmentCard key={apt.id} appointment={apt} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day View */}
          {view === 'day' && (
            <div className="p-6">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-2 space-y-16">
                  {timeSlots.map((time) => (
                    <div key={time} className="text-sm font-bold text-gray-600">{time}</div>
                  ))}
                </div>
                <div className="col-span-10 relative">
                  <div className="absolute inset-0 space-y-16">
                    {timeSlots.map((_, idx) => (
                      <div key={idx} className="h-16 border-t border-gray-100" />
                    ))}
                  </div>
                  <div className="relative space-y-3 pt-3">
                    {appointments.filter(apt => apt.day === 1).map(apt => (
                      <div key={apt.id} className="max-w-xl">
                        <AppointmentCard appointment={apt} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Month View */}
          {view === 'month' && (
            <div className="p-6">
              <div className="grid grid-cols-7 gap-3 mb-4">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-xs font-bold text-gray-500 uppercase py-3">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-3">
                {Array.from({ length: 35 }, (_, i) => {
                  const dayNum = i - 1;
                  const isToday = dayNum === 1;
                  return (
                    <div key={i} className={`min-h-[120px] rounded-2xl border-2 p-3 ${dayNum < 0 || dayNum > 28 ? 'bg-gray-50/50 border-gray-100' : isToday ? 'bg-sky-50 border-sky-200' : 'bg-white border-gray-100'}`}>
                      {dayNum >= 0 && dayNum <= 28 && (
                        <>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-bold ${isToday ? 'bg-sky-500 text-white w-7 h-7 flex items-center justify-center rounded-lg' : 'text-gray-700'}`}>{dayNum + 1}</span>
                          </div>
                          <div className="space-y-1">
                            {appointments.filter(apt => apt.day === dayNum).slice(0, 2).map(apt => (
                              <div key={apt.id} className={`${statusColors[apt.status].bg} border rounded-lg p-1.5 text-xs`}>
                                <p className="font-semibold truncate">{apt.time} - {apt.patientName}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex gap-6">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full" /><span className="text-sm text-gray-700">Confirmé</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-sky-500 rounded-full" /><span className="text-sm text-gray-700">En attente</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-400 rounded-full" /><span className="text-sm text-gray-700">Annulé</span></div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;