import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus,
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

  const fetchAppointments = async () => {
    if (!doctor?.doctorId) return;
    setLoading(true);
    try {
      const data = await appointmentService.getAll(doctor.doctorId);
      const formatted = data.map(app => {
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
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
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

  const getFilteredAppointments = (date) => {
    return appointments.filter(apt => {
      const matchesDate = isSameDay(apt.date, date);
      if (!searchTerm) return matchesDate;
      const searchLower = searchTerm.toLowerCase();
      return matchesDate && (
        apt.patientName.toLowerCase().includes(searchLower) ||
        (apt.phone && apt.phone.includes(searchTerm))
      );
    });
  };

  const weekStart = getStartOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekDayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const getMonthDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const days = [];
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month - 1, prevMonthLastDay - i), isCurrentMonth: false });
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    return days;
  };

  const statusColors = {
    confirme: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
    nouveau: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' },
    ne_repond_pas: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
    absent: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
    reprogramme: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
    suivi: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700' },
    termine: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' }
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment.original);
    setIsNewAppointmentModalOpen(true);
  };

  const AppointmentCard = ({ appointment, compact = false }) => {
    const colors = statusColors[appointment.status] || statusColors.nouveau;
    if (compact) {
      return (
        <div
          onClick={(e) => { e.stopPropagation(); handleEditAppointment(appointment); }}
          className={`cursor-pointer ${colors.bg} border-l-2 ${colors.border} p-1 mb-1 rounded-sm text-[9px] sm:text-[10px] truncate hover:scale-105 transition-transform`}
        >
          {appointment.patientName}
        </div>
      );
    }
    return (
      <div
        onClick={() => handleEditAppointment(appointment)}
        className={`${colors.bg} ${colors.border} border-2 rounded-xl p-3 cursor-pointer transition-all hover:shadow-md mb-2`}
      >
        <p className="font-bold text-gray-900 text-sm mb-1 truncate">{appointment.patientName}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">Calendrier Médical</h1>
            <p className="text-gray-500 font-medium text-sm sm:text-lg">Gérez vos rendez-vous</p>
          </div>
          <button
            onClick={() => setIsNewAppointmentModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-all w-full md:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Nouveau RDV</span>
          </button>
        </div>

        {/* Toolbar Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* View Switcher */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-full lg:w-auto">
              {['month', 'week', 'day'].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`flex-1 lg:flex-none px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
                    view === v ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {v === 'month' ? 'Mois' : v === 'week' ? 'Semaine' : 'Jour'}
                </button>
              ))}
            </div>

            {/* Date Navigation */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-2 sm:gap-4">
              <button onClick={handlePrev} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
              <div className="flex-1 lg:flex-none px-4 py-2 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 rounded-xl min-w-[140px] sm:min-w-[200px] text-center">
                <p className="text-xs sm:text-sm font-bold text-gray-900 capitalize">
                  {view === 'day'
                    ? selectedDate.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
                    : selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
                  }
                </p>
              </div>
              <button onClick={handleNext} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Calendar Grid Container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-20 text-center text-gray-400 animate-pulse font-bold">Chargement du planning...</div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[700px] lg:min-w-full">
                
                {/* Week View */}
                {view === 'week' && (
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-7 gap-2 sm:gap-4">
                      {weekDays.map((day, idx) => {
                        const dayAppointments = getFilteredAppointments(day);
                        const isTodayActive = isSameDay(day, new Date());
                        return (
                          <div key={idx} className="flex flex-col min-h-[400px]">
                            <div className="text-center mb-4">
                              <div className="text-[10px] font-bold text-gray-400 uppercase">{weekDayNames[idx]}</div>
                              <div className={`mt-1 inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl font-bold ${
                                isTodayActive ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'text-gray-700'
                              }`}>
                                {day.getDate()}
                              </div>
                            </div>
                            <div className="flex-1 bg-gray-50/50 rounded-2xl p-2 border border-gray-100">
                              {dayAppointments.map(apt => <AppointmentCard key={apt.id} appointment={apt} />)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Day View */}
                {view === 'day' && (
                  <div className="p-6 max-w-2xl mx-auto">
                    <div className="mb-6 border-b pb-4">
                      <h2 className="text-xl font-bold text-gray-900 capitalize">
                        {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </h2>
                    </div>
                    {getFilteredAppointments(selectedDate).length > 0 ? (
                      getFilteredAppointments(selectedDate).map(apt => <AppointmentCard key={apt.id} appointment={apt} />)
                    ) : (
                      <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                        <CalendarIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">Aucun rendez-vous pour ce jour</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Month View */}
                {view === 'month' && (
                  <div className="grid grid-cols-7 gap-px bg-gray-100">
                    {weekDayNames.map((day) => (
                      <div key={day} className="bg-gray-50 p-2 sm:p-4 text-center text-[10px] font-black text-gray-400 uppercase">{day}</div>
                    ))}
                    {getMonthDays().map((item, i) => {
                      const dayApps = getFilteredAppointments(item.date);
                      const isTodayActive = isSameDay(item.date, new Date());
                      return (
                        <div
                          key={i}
                          onClick={() => { setSelectedDate(item.date); setView('day'); }}
                          className={`bg-white min-h-[100px] sm:min-h-[140px] p-1 sm:p-2 hover:bg-gray-50 cursor-pointer ${!item.isCurrentMonth ? 'opacity-40' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className={`text-xs font-bold p-1 rounded-md ${isTodayActive ? 'bg-sky-500 text-white' : 'text-gray-700'}`}>
                              {item.date.getDate()}
                            </span>
                            {dayApps.length > 0 && <span className="text-[9px] bg-gray-100 px-1 rounded text-gray-500">{dayApps.length}</span>}
                          </div>
                          <div className="space-y-1">
                            {dayApps.slice(0, 3).map(apt => <AppointmentCard key={apt.id} appointment={apt} compact />)}
                            {dayApps.length > 3 && <p className="text-[9px] text-gray-400 pl-1">+{dayApps.length - 3} plus</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>

      <NewAppointmentModal
        isOpen={isNewAppointmentModalOpen}
        onClose={() => { setIsNewAppointmentModalOpen(false); setSelectedAppointment(null); }}
        onSuccess={(msg) => {
          fetchAppointments();
          setIsNewAppointmentModalOpen(false);
          setToast({ show: true, message: msg || 'Succès', type: 'success' });
        }}
        appointment={selectedAppointment}
      />
      
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
    </div>
  );
};

export default Calendar;