import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  User,
  MoreVertical,
  Plus,
  Filter,
  Download,
  Search
} from 'lucide-react';
import { useDoctor } from '../hooks/useDoctor';
import { appointmentService } from '../services/appointmentService';
import NewAppointmentModal from '../components/NewAppointmentModal';

import Toast from '../components/Toast';

const Calendar = () => {
  const [view, setView] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { doctor } = useDoctor();
  const [appointments, setAppointments] = useState([]);
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Fetch appointments
  const fetchAppointments = async () => {
    if (!doctor?.doctorId) return;
    setLoading(true);
    try {
      const data = await appointmentService.getAll(doctor.doctorId);

      // Transform data for calendar
      const formatted = data.map(app => {
        // Fix: Parse YYYY-MM-DD manually to avoid timezone shift
        const [year, month, day] = app.appointment_date.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);

        return {
          id: app.id,
          patientName: `${app.patient_first_name} ${app.patient_last_name}`,
          type: app.visit_type === 'follow_up' ? 'Suivi' : 'Consultation',
          status: app.status,
          date: dateObj,
          original: app,
          phone: app.patient_phone
        };
      });
      setAppointments(formatted);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctor?.doctorId]);

  // Date Utilities
  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
    return new Date(d.setDate(diff));
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  };

  const isSameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  };

  // Navigation Handlers
  const handlePrev = () => {
    if (view === 'day') setSelectedDate(addDays(selectedDate, -1));
    else if (view === 'week') setSelectedDate(addDays(selectedDate, -7));
    else if (view === 'month') setSelectedDate(addMonths(selectedDate, -1));
  };

  const handleNext = () => {
    if (view === 'day') setSelectedDate(addDays(selectedDate, 1));
    else if (view === 'week') setSelectedDate(addDays(selectedDate, 7));
    else if (view === 'month') setSelectedDate(addMonths(selectedDate, 1));
  };

  // Data helpers
  const getFilteredAppointments = (date) => {
    return appointments.filter(apt => {
      const matchesDate = isSameDay(apt.date, date);
      if (!searchTerm) return matchesDate;

      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        apt.patientName.toLowerCase().includes(searchLower) ||
        (apt.phone && apt.phone.includes(searchTerm));

      return matchesDate && matchesSearch;
    });
  };

  const weekStart = getStartOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekDayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  // Month Generation
  const getMonthDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Start from Monday
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const days = [];

    // Previous month filler
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month - 1, prevMonthLastDay - i), isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Next month filler
    const remaining = 42 - days.length; // 6 rows * 7 cols
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  const statusColors = {
    confirme: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      hover: 'hover:border-emerald-300 hover:shadow-emerald-200/50'
    },
    nouveau: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-700',
      dot: 'bg-indigo-500',
      hover: 'hover:border-indigo-300 hover:shadow-indigo-200/50'
    },
    ne_repond_pas: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700',
      dot: 'bg-orange-500',
      hover: 'hover:border-orange-300 hover:shadow-orange-200/50'
    },
    absent: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      dot: 'bg-red-500',
      hover: 'hover:border-red-300 hover:shadow-red-200/50'
    },
    reprogramme: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      dot: 'bg-blue-500',
      hover: 'hover:border-blue-300 hover:shadow-blue-200/50'
    },
    suivi: {
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      text: 'text-sky-700',
      dot: 'bg-sky-500',
      hover: 'hover:border-sky-300 hover:shadow-sky-200/50'
    },
    termine: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      hover: 'hover:border-emerald-300 hover:shadow-emerald-200/50'
    }
  };

  const getStatusColor = (status) => statusColors[status] || statusColors.nouveau;

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment.original);
    setIsNewAppointmentModalOpen(true);
  };

  const AppointmentCard = ({ appointment, compact = false }) => {
    const colors = getStatusColor(appointment.status);

    if (compact) {
      return (
        <div
          onClick={(e) => { e.stopPropagation(); handleEditAppointment(appointment); }}
          className={`cursor-pointer ${colors.bg} border-l-2 ${colors.border} p-1 mb-1 rounded-sm text-[10px] truncate hover:scale-105 transition-transform`}
          title={`${appointment.patientName}`}
        >
          {appointment.patientName}
        </div>
      );
    }

    return (
      <div
        onClick={() => handleEditAppointment(appointment)}
        className={`group ${colors.bg} ${colors.border} border-2 rounded-xl p-3 cursor-pointer transition-all duration-200 ${colors.hover} hover:shadow-md mb-2`}
      >
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
    <div className="min-h-screen ">
      <div className="max-w-[1400px] mx-auto ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Calendrier</h1>
              <p className="text-gray-500">Gérez vos rendez-vous et votre planning</p>
            </div>
            <button
              onClick={() => setIsNewAppointmentModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              Nouveau RDV
            </button>
          </div>

          <NewAppointmentModal
            isOpen={isNewAppointmentModalOpen}
            onClose={() => {
              setIsNewAppointmentModalOpen(false);
              setSelectedAppointment(null);
            }}
            onSuccess={(message) => {
              fetchAppointments();
              setIsNewAppointmentModalOpen(false);
              setSelectedAppointment(null);
              setToast({ show: true, message: message || 'Opération réussie', type: 'success' });
            }}
            appointment={selectedAppointment}
          />

          {toast.show && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ ...toast, show: false })}
            />
          )}

          {/* Toolbar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4 ">
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                {['month', 'week', 'day'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer ${view === v
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {v === 'month' ? 'Mois' : v === 'week' ? 'Semaine' : 'Jour'}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="px-4 py-2 bg-linear-to-r from-sky-50 to-indigo-50 border border-sky-100 rounded-xl min-w-[200px] text-center">
                  <p className="text-sm font-bold text-gray-900 capitalize">
                    {view === 'day'
                      ? selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                      : selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
                    }
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setSelectedDate(new Date())}
                  className="ml-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Aujourd'hui
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 w-48 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
          {loading ? (
            <div className="p-12 flex justify-center text-gray-400">Chargement...</div>
          ) : view === 'week' ? (
            <div className="p-6">
              <div className="grid grid-cols-7 gap-4">
                {weekDays.map((day, idx) => {
                  const dayAppointments = getFilteredAppointments(day);
                  const isToday = isSameDay(day, new Date());
                  return (
                    <div key={idx} className="flex flex-col h-full">
                      <div className="text-center mb-4 p-2 rounded-xl transition-colors hover:bg-gray-50">
                        <div className="text-xs font-bold text-gray-500 uppercase mb-1">{weekDayNames[idx]}</div>
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold text-lg ${isToday ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'text-gray-700'
                          }`}>
                          {day.getDate()}
                        </div>
                      </div>

                      {/* Week View Day Column */}
                      <div className="flex-1 bg-gray-50/50 rounded-2xl p-2 min-h-[500px] border border-gray-100/50">
                        {dayAppointments.length > 0 ? (
                          dayAppointments.map(apt => (
                            <AppointmentCard key={apt.id} appointment={apt} />
                          ))
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-300 text-sm font-medium">
                            No RDV
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : view === 'day' ? (
            <div className="p-6">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 capitalize">
                    {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    {getFilteredAppointments(selectedDate).length} rendez-vous prévus
                  </p>
                </div>

                <div className="space-y-4">
                  {getFilteredAppointments(selectedDate).length > 0 ? (
                    getFilteredAppointments(selectedDate).map(apt => (
                      <AppointmentCard key={apt.id} appointment={apt} />
                    ))
                  ) : (
                    <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
                      <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Aucun rendez-vous</h3>
                      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                        Vous n'avez aucun rendez-vous prévu pour cette journée. Profitez-en pour vous reposer !
                      </p>
                      <button
                        onClick={() => setIsNewAppointmentModalOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                        Ajouter un RDV
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Month View
            <div className="p-6">
              <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                {weekDayNames.map((day) => (
                  <div key={day} className="bg-gray-50 p-4 text-center text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                    {day}
                  </div>
                ))}

                {getMonthDays().map((item, i) => {
                  const dayAppointments = getFilteredAppointments(item.date);
                  const isToday = isSameDay(item.date, new Date());
                  const isSelected = isSameDay(item.date, selectedDate);

                  return (
                    <div
                      key={i}
                      onClick={() => { setSelectedDate(item.date); setView('day'); }}
                      className={`bg-white min-h-[120px] p-2 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col gap-1
                        ${!item.isCurrentMonth ? 'bg-gray-50/30 text-gray-400' : ''}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold
                           ${isToday ? 'bg-sky-500 text-white shadow-md' : isSelected ? 'bg-gray-900 text-white' : 'text-gray-700'}
                         `}>
                          {item.date.getDate()}
                        </span>
                        {dayAppointments.length > 0 && (
                          <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-md">
                            {dayAppointments.length}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 mt-1 space-y-1 overflow-y-auto max-h-[80px]">
                        {dayAppointments.slice(0, 3).map(apt => (
                          <div key={apt.id} className="truncate">
                            <AppointmentCard appointment={apt} compact={true} />
                          </div>
                        ))}
                        {dayAppointments.length > 3 && (
                          <div className="text-[10px] text-gray-500 font-medium pl-1">
                            + {dayAppointments.length - 3} autres
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;