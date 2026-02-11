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

  // Pipeline columns configuration based on User Statuses
  const columns = [
    {
      id: 'nouveau',
      title: 'Nouveau',
      color: 'sky',
      gradient: 'from-sky-500 to-sky-600'
    },
    {
      id: 'confirme',
      title: 'Confirmé',
      color: 'indigo',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'suivi',
      title: 'Suivi',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'ne_repond_pas',
      title: 'Ne Répond Pas',
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'reprogramme',
      title: 'Reprogrammé',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'termine',
      title: 'Terminé',
      color: 'emerald',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'absent',
      title: 'Absent',
      color: 'gray',
      gradient: 'from-gray-500 to-gray-600'
    },
  ];

  const fetchAppointments = async () => {
    if (!doctor?.doctorId) return;
    setLoading(true);
    try {
      const data = await appointmentService.getAll(doctor.doctorId);

      // Group by status
      const grouped = {};
      columns.forEach(col => grouped[col.id] = []);

      data.forEach(app => {
        const status = app.status || 'nouveau';
        if (grouped[status]) {
          const dateObj = new Date(app.appointment_date);
          // Format date for display (e.g., "3 Fév")
          const formattedDate = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

          grouped[status].push({
            id: app.id,
            patientName: `${app.patient_first_name} ${app.patient_last_name}`,
            avatar: `${app.patient_first_name?.[0] || ''}${app.patient_last_name?.[0] || ''}`,
            time: app.time || '00:00',
            date: formattedDate,
            type: app.visit_type === 'follow_up' ? 'Suivi' : 'Consultation',
            phone: app.patient_phone,
            notes: app.notes ? app.notes.replace(/\[Time: .*?\]/, '').trim() : '', // Clean notes
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

  // Filter appointments based on search term
  const filteredAppointments = (columnId) => {
    const list = appointments[columnId] || [];
    if (!searchTerm) return list;
    return list.filter(app =>
      app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.phone && app.phone.includes(searchTerm))
    );
  };

  // Appointment Card Component
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
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
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

        {/* Type Badge */}
        <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border mb-3 ${getTypeColor(appointment.type)}`}>
          {appointment.type}
        </div>

        {/* Contact Info */}
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
    <div className="min-h-screen ">
      {/* Custom Scrollbar Styles for the main Horizontal Scroll and Vertical Lists */}
      <style>{`
        .horizontal-scroll::-webkit-scrollbar {
          height: 10px;
        }
        .horizontal-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
        }
        .horizontal-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 8px;
        }
        .horizontal-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        .vertical-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .vertical-scroll::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 4px;
        }
        .vertical-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .vertical-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">
                Pipeline de Rendez-vous
              </h1>
              <p className="text-gray-500">
                Gérez vos rendez-vous
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNewAppointment('nouveau')}
                className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 transition-all cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                Nouveau RDV
              </button>
            </div>
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
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un patient (nom, téléphone)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 horizontal-scroll">
          {columns.map((column) => {
            const columnAppointments = filteredAppointments(column.id);
            return (
              <div
                key={column.id}
                className="shrink-0 min-w-[280px] w-[320px] bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-5 flex flex-col max-h-[calc(100vh-240px)]"
              >
                {/* Column Header */}
                <div className="mb-5 flex-none">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-black text-gray-900 text-sm">
                      {column.title}
                    </h3>
                    <button
                      onClick={() => handleNewAppointment(column.id)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-500 cursor-pointer" />
                    </button>
                  </div>

                  {/* Count Badge */}
                  <div className={`inline-flex items-center px-3 py-1.5 bg-linear-to-r ${column.gradient} rounded-lg shadow-md`}>
                    <span className="text-white text-sm font-bold">
                      {columnAppointments.length} RDV
                    </span>
                  </div>
                </div>

                {/* Appointments List */}
                <div className="space-y-3 overflow-y-auto pr-1 vertical-scroll">
                  {columnAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}

                  {/* Empty State */}
                  {columnAppointments.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl">
                      <Calendar className="w-10 h-10 text-gray-300 mb-3" />
                      <p className="text-sm text-gray-500 text-center">
                        {searchTerm ? 'Aucun résultat' : 'Aucun rendez-vous'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div >
    </div >
  );
};

export default Pipeline;
