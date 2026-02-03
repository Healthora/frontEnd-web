import React, { useState } from 'react';
import {
  Clock,
  User,
  Phone,
  MessageSquare,
  Calendar,
  MoreVertical,
  Plus,
  Filter,
  Search,
  Download
} from 'lucide-react';

const Pipeline = () => {
  // Pipeline columns configuration
  const columns = [
    {
      id: 'new',
      title: 'Nouvelles Demandes',
      color: 'sky',
      count: 8,
      gradient: 'from-sky-500 to-sky-600'
    },
    {
      id: 'confirmed',
      title: 'Confirmés',
      color: 'indigo',
      count: 12,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'inProgress',
      title: 'En Cours',
      color: 'purple',
      count: 5,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'completed',
      title: 'Terminés',
      color: 'emerald',
      count: 24,
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'noshow',
      title: 'Absents',
      color: 'gray',
      count: 3,
      gradient: 'from-gray-500 to-gray-600'
    },
  ];

  // Sample appointment data
  const initialAppointments = {
    new: [
      {
        id: 1,
        patientName: 'Marie Dupont',
        avatar: 'MD',
        time: '09:00',
        date: '3 Fév',
        type: 'Consultation',
        phone: '+33 6 12 34 56 78',
        notes: 'Premier rendez-vous'
      },
      {
        id: 2,
        patientName: 'Ahmed Ben Ali',
        avatar: 'AB',
        time: '10:30',
        date: '3 Fév',
        type: 'Suivi',
        phone: '+33 6 98 76 54 32',
        notes: 'Suivi post-opératoire'
      }
    ],
    confirmed: [
      {
        id: 3,
        patientName: 'Sophie Martin',
        avatar: 'SM',
        time: '14:00',
        date: '3 Fév',
        type: 'Check-up',
        phone: '+33 6 11 22 33 44',
        notes: 'Examen de routine'
      },
      {
        id: 4,
        patientName: 'Lucas Bernard',
        avatar: 'LB',
        time: '15:30',
        date: '3 Fév',
        type: 'Consultation',
        phone: '+33 6 55 66 77 88',
        notes: 'Première consultation'
      },
      {
        id: 5,
        patientName: 'Emma Dubois',
        avatar: 'ED',
        time: '16:00',
        date: '3 Fév',
        type: 'Urgence',
        phone: '+33 6 99 88 77 66',
        notes: 'Douleur aiguë'
      }
    ],
    inProgress: [
      {
        id: 6,
        patientName: 'Thomas Petit',
        avatar: 'TP',
        time: '11:00',
        date: '3 Fév',
        type: 'Suivi',
        phone: '+33 6 44 33 22 11',
        notes: 'En consultation'
      }
    ],
    completed: [
      {
        id: 7,
        patientName: 'Julie Moreau',
        avatar: 'JM',
        time: '08:30',
        date: '3 Fév',
        type: 'Consultation',
        phone: '+33 6 77 88 99 00',
        notes: 'Consultation terminée'
      },
      {
        id: 8,
        patientName: 'Pierre Leroy',
        avatar: 'PL',
        time: '09:30',
        date: '3 Fév',
        type: 'Check-up',
        phone: '+33 6 22 33 44 55',
        notes: 'Bilan complet effectué'
      }
    ],
    noshow: [
      {
        id: 9,
        patientName: 'Claire Durand',
        avatar: 'CD',
        time: '10:00',
        date: '2 Fév',
        type: 'Consultation',
        phone: '+33 6 66 77 88 99',
        notes: 'Patient non venu'
      }
    ],
    archived: []
  };

  const [appointments, setAppointments] = useState(initialAppointments);
  const [draggedCard, setDraggedCard] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  // Drag and drop handlers
  const handleDragStart = (e, appointment, sourceColumn) => {
    setDraggedCard({ appointment, sourceColumn });
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedCard(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (columnId) => {
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    
    if (!draggedCard) return;

    const { appointment, sourceColumn } = draggedCard;

    if (sourceColumn === targetColumn) {
      setDragOverColumn(null);
      return;
    }

    // Remove from source
    const newAppointments = { ...appointments };
    newAppointments[sourceColumn] = newAppointments[sourceColumn].filter(
      apt => apt.id !== appointment.id
    );

    // Add to target
    newAppointments[targetColumn] = [
      ...newAppointments[targetColumn],
      appointment
    ];

    setAppointments(newAppointments);
    setDragOverColumn(null);
  };

  // Appointment Card Component
  const AppointmentCard = ({ appointment, columnId }) => {
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
      const index = name.charCodeAt(0) % gradients.length;
      return gradients[index];
    };

    return (
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, appointment, columnId)}
        onDragEnd={handleDragEnd}
        className="group bg-white rounded-xl border-2 border-gray-100 p-4 cursor-move hover:border-sky-200 hover:shadow-lg transition-all duration-200 active:rotate-2 active:scale-105"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${getAvatarGradient(appointment.patientName)} flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0`}>
              {appointment.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-sm truncate mb-0.5">
                {appointment.patientName}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span className="font-semibold">{appointment.time}</span>
                <span>•</span>
                <span>{appointment.date}</span>
              </div>
            </div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded-lg">
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
              <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{appointment.notes}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50/30 p-8">
      {/* Custom Scrollbar Styles for the main Horizontal Scroll */}
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
                Gérez vos rendez-vous par glisser-déposer
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                Filtrer
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Exporter
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 transition-all">
                <Plus className="w-5 h-5" />
                Nouveau RDV
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un patient..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 horizontal-scroll">
          {columns.map((column) => (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDragEnter={() => handleDragEnter(column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
              // Fixed width (min-w-[350px]) ensures columns don't shrink
              className={`flex-shrink-0 min-w-[250px] bg-white rounded-2xl border-2 p-5 flex flex-col transition-all duration-200 h-fit ${
                dragOverColumn === column.id
                  ? 'border-sky-300 shadow-xl shadow-sky-200/50'
                  : 'border-gray-100 shadow-sm'
              }`}
            >
              {/* Column Header */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-gray-900 text-sm">
                    {column.title}
                  </h3>
                  <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <Plus className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                
                {/* Count Badge */}
                <div className={`inline-flex items-center px-3 py-1.5 bg-gradient-to-r ${column.gradient} rounded-lg shadow-md`}>
                  <span className="text-white text-sm font-bold">
                    {appointments[column.id]?.length || 0} RDV
                  </span>
                </div>
              </div>

              {/* Appointments List - No internal scrolling */}
              <div className="space-y-3">
                {appointments[column.id]?.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    columnId={column.id}
                  />
                ))}

                {/* Empty State */}
                {(!appointments[column.id] || appointments[column.id].length === 0) && (
                  <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl">
                    <Calendar className="w-10 h-10 text-gray-300 mb-3" />
                    <p className="text-sm text-gray-500 text-center">
                      Aucun rendez-vous
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pipeline;