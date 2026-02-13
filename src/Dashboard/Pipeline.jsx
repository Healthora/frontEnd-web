import React, { useState, useEffect } from 'react';
import {
  Clock,
  User,
  Phone,
  MessageSquare,
  Calendar,
  MoreVertical,
  Plus,
  Search,
  Download
} from 'lucide-react';
import { useDoctor } from '../hooks/useDoctor';
import { appointmentService } from '../services/appointmentService';
import NewAppointmentModal from '../components/NewAppointmentModal';
import Toast from '../components/Toast';

const Pipeline = () => {
  const { doctor } = useDoctor();
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState({});
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [defaultStatus, setDefaultStatus] = useState('nouveau');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const columns = [
    { id: 'nouveau', title: 'Nouveau', color: 'sky', gradient: 'from-sky-500 to-sky-600' },
    { id: 'confirme', title: 'Confirmé', color: 'indigo', gradient: 'from-indigo-500 to-indigo-600' },
    { id: 'suivi', title: 'Suivi', color: 'purple', gradient: 'from-purple-500 to-purple-600' },
    { id: 'ne_repond_pas', title: 'Ne Répond Pas', color: 'orange', gradient: 'from-orange-500 to-orange-600' },
    { id: 'reprogramme', title: 'Reprogrammé', color: 'blue', gradient: 'from-blue-500 to-blue-600' },
    { id: 'termine', title: 'Terminé', color: 'emerald', gradient: 'from-emerald-500 to-emerald-600' },
    { id: 'absent', title: 'Absent', color: 'gray', gradient: 'from-gray-500 to-gray-600' },
  ];

  const fetchAppointments = async () => {
    if (!doctor?.doctorId) return;
    setLoading(true);
    try {
      const data = await appointmentService.getAll(doctor.doctorId);
      const grouped = {};
      columns.forEach(col => grouped[col.id] = []);

      data.forEach(app => {
        const status = app.status || 'nouveau';
        if (grouped[status]) {
          const dateObj = new Date(app.appointment_date);
          const formattedDate = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

          grouped[status].push({
            id: app.id,
            patientName: `${app.patient_first_name} ${app.patient_last_name}`,
            avatar: `${app.patient_first_name?.[0] || ''}${app.patient_last_name?.[0] || ''}`,
            time: app.time || '00:00',
            date: formattedDate,
            type: app.visit_type === 'follow_up' ? 'Suivi' : 'Consultation',
            phone: app.patient_phone,
            notes: app.notes ? app.notes.replace(/\[Time: .*?\]/, '').trim() : '',
            original: app
          });
        }
      });
      setAppointments(grouped);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctor?.doctorId]);

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment.original);
    setIsNewAppointmentModalOpen(true);
  };

  const handleNewAppointment = (status = 'nouveau') => {
    setSelectedAppointment(null);
    setDefaultStatus(status);
    setIsNewAppointmentModalOpen(true);
  };

  const filteredAppointments = (columnId) => {
    const list = appointments[columnId] || [];
    if (!searchTerm) return list;
    return list.filter(app =>
      app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.phone && app.phone.includes(searchTerm))
    );
  };

  const AppointmentCard = ({ appointment }) => {
    const getTypeColor = (type) => {
      const colors = {
        'Consultation': 'bg-sky-100 text-sky-700 border-sky-200',
        'Suivi': 'bg-indigo-100 text-indigo-700 border-indigo-200',
        'Check-up': 'bg-emerald-100 text-emerald-700 border-emerald-200',
        'Urgence': 'bg-red-100 text-red-700 border-red-200'
      };
      return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200';
    };

    const getAvatarGradient = (name) => {
      const gradients = [
        'from-sky-400 to-sky-600',
        'from-indigo-400 to-indigo-600',
        'from-purple-400 to-purple-600',
        'from-emerald-400 to-emerald-600',
        'from-pink-400 to-pink-600'
      ];
      const index = (name.charCodeAt(0) || 0) % gradients.length;
      return gradients[index];
    };

    return (
      <div
        onClick={() => handleEditAppointment(appointment)}
        className="group bg-white rounded-xl border-2 border-gray-100 p-4 cursor-pointer hover:border-sky-200 hover:shadow-lg transition-all duration-200 active:scale-[1.02]"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-11 h-11 rounded-full bg-linear-to-br ${getAvatarGradient(appointment.patientName)} flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0`}>
              {appointment.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-sm truncate mb-0.5">
                {appointment.patientName}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>{appointment.date}</span>
              </div>
            </div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded-lg cursor-pointer">
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border mb-3 ${getTypeColor(appointment.type)}`}>
          {appointment.type}
        </div>

        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Phone className="w-3 h-3" />
            <span>{appointment.phone}</span>
          </div>
          {appointment.notes && (
            <div className="flex items-start gap-2 text-xs text-gray-600">
              <MessageSquare className="w-3 h-3 mt-0.5 shrink-0" />
              <span className="line-clamp-2">{appointment.notes}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen px-4 md:px-0">
      <style>{`
        .horizontal-scroll::-webkit-scrollbar { height: 8px; }
        .horizontal-scroll::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 8px; }
        .horizontal-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 8px; }
        .horizontal-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        .vertical-scroll::-webkit-scrollbar { width: 4px; }
        .vertical-scroll::-webkit-scrollbar-track { background: transparent; }
        .vertical-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

        @media (max-width: 768px) {
            .column-container {
                scroll-snap-type: x mandatory;
            }
            .column-snap {
                scroll-snap-align: center;
            }
        }
      `}</style>

      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 mt-4 md:mt-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight mb-1 md:mb-2">
                Pipeline de Rendez-vous
              </h1>
              <p className="text-gray-500 font-medium text-sm md:text-lg">
                Suivi et gestion du flux patient
              </p>
            </div>
            <button
              onClick={() => handleNewAppointment('nouveau')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer w-full sm:w-auto"
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
            defaultStatus={defaultStatus}
          />

          {toast.show && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ ...toast, show: false })}
            />
          )}

          {/* Search Bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Pipeline Grid - Responsive: Full width scroll on mobile, flex on desktop */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 horizontal-scroll column-container">
          {columns.map((column) => {
            const columnAppointments = filteredAppointments(column.id);
            return (
              <div
                key={column.id}
                className="column-snap shrink-0 w-[280px] md:w-[320px] bg-gray-50/50 md:bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-4 md:p-5 flex flex-col h-[calc(100vh-280px)] md:h-[calc(100vh-240px)]"
              >
                {/* Column Header */}
                <div className="mb-4 md:mb-5 flex-none">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-black text-gray-900 text-xs md:text-sm uppercase tracking-wider">
                      {column.title}
                    </h3>
                    <button
                      onClick={() => handleNewAppointment(column.id)}
                      className="p-1.5 hover:bg-gray-200 md:hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-500 cursor-pointer" />
                    </button>
                  </div>

                  <div className={`inline-flex items-center px-3 py-1 bg-linear-to-r ${column.gradient} rounded-lg shadow-sm`}>
                    <span className="text-white text-[11px] md:text-xs font-bold uppercase">
                      {columnAppointments.length} RDV
                    </span>
                  </div>
                </div>

                {/* Appointments List */}
                <div className="space-y-3 overflow-y-auto pr-1 vertical-scroll flex-1">
                  {columnAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}

                  {columnAppointments.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 px-4 border-2 border-dashed border-gray-200 rounded-xl bg-white/50">
                      <Calendar className="w-8 h-8 text-gray-300 mb-2" />
                      <p className="text-[11px] md:text-xs text-gray-400 text-center font-medium">
                        {searchTerm ? 'Aucun résultat' : 'Aucun rendez-vous'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pipeline;