/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Stethoscope,
  FileText,
  CheckCircle,
  AlertCircle,
  Search,
  ChevronDown
} from 'lucide-react';

const AppointmentModal = ({ isOpen, onClose, appointment = null, onSave }) => {
  const isEditMode = !!appointment;
  
  const [formData, setFormData] = useState({
    patient: appointment?.patient || '',
    date: appointment?.date || '',
    time: appointment?.time || '',
    doctor: appointment?.doctor || '',
    status: appointment?.status || 'pending',
    notes: appointment?.notes || ''
  });

  const [errors, setErrors] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  // Sample data
  const patients = [
    { id: 1, name: 'Marie Dupont', phone: '+33 6 12 34 56 78' },
    { id: 2, name: 'Ahmed Ben Ali', phone: '+33 6 98 76 54 32' },
    { id: 3, name: 'Sophie Martin', phone: '+33 6 11 22 33 44' },
    { id: 4, name: 'Lucas Bernard', phone: '+33 6 55 66 77 88' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Jean Martin', speciality: 'Médecin Généraliste' },
    { id: 2, name: 'Dr. Sarah Cohen', speciality: 'Cardiologue' },
    { id: 3, name: 'Dr. Thomas Dubois', speciality: 'Pédiatre' }
  ];

  const statuses = [
    { value: 'pending', label: 'En Attente', color: 'sky' },
    { value: 'confirmed', label: 'Confirmé', color: 'emerald' },
    { value: 'completed', label: 'Terminé', color: 'indigo' },
    { value: 'cancelled', label: 'Annulé', color: 'gray' }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.patient) newErrors.patient = 'Patient requis';
    if (!formData.date) newErrors.date = 'Date requise';
    if (!formData.time) newErrors.time = 'Heure requise';
    if (!formData.doctor) newErrors.doctor = 'Médecin requis';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave?.(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-sky-500 to-indigo-500 px-8 py-6 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">
                    {isEditMode ? 'Modifier le Rendez-vous' : 'Nouveau Rendez-vous'}
                  </h2>
                  <p className="text-sky-100 text-sm">
                    {isEditMode ? 'Mettez à jour les informations' : 'Créez un nouveau rendez-vous'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">

            {/* Patient Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <User className="w-4 h-4 text-sky-500" />
                Patient *
              </label>
              <div className="relative">
                <select
                  value={formData.patient}
                  onChange={(e) => handleChange('patient', e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all appearance-none cursor-pointer ${
                    errors.patient ? 'border-red-300' : 'border-gray-200'
                  }`}
                >
                  <option value="">Sélectionnez un patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.name}>
                      {patient.name} - {patient.phone}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.patient && (
                <div className="flex items-center gap-1 mt-2 text-red-600">
                  <AlertCircle className="w-3 h-3" />
                  <p className="text-xs font-semibold">{errors.patient}</p>
                </div>
              )}
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Date */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all ${
                    errors.date ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {errors.date && (
                  <div className="flex items-center gap-1 mt-2 text-red-600">
                    <AlertCircle className="w-3 h-3" />
                    <p className="text-xs font-semibold">{errors.date}</p>
                  </div>
                )}
              </div>

              {/* Time */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  Heure *
                </label>
                <div className="relative">
                  <select
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 focus:outline-none focus:border-purple-500 focus:bg-white transition-all appearance-none cursor-pointer ${
                      errors.time ? 'border-red-300' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Sélectionnez l'heure</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.time && (
                  <div className="flex items-center gap-1 mt-2 text-red-600">
                    <AlertCircle className="w-3 h-3" />
                    <p className="text-xs font-semibold">{errors.time}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <Stethoscope className="w-4 h-4 text-emerald-500" />
                Médecin *
              </label>
              <div className="relative">
                <select
                  value={formData.doctor}
                  onChange={(e) => handleChange('doctor', e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all appearance-none cursor-pointer ${
                    errors.doctor ? 'border-red-300' : 'border-gray-200'
                  }`}
                >
                  <option value="">Sélectionnez un médecin</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name} - {doctor.speciality}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.doctor && (
                <div className="flex items-center gap-1 mt-2 text-red-600">
                  <AlertCircle className="w-3 h-3" />
                  <p className="text-xs font-semibold">{errors.doctor}</p>
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <CheckCircle className="w-4 h-4 text-sky-500" />
                Statut
              </label>
              <div className="grid grid-cols-2 gap-3">
                {statuses.map(status => {
                  const isSelected = formData.status === status.value;
                  const colorClasses = {
                    sky: 'border-sky-500 bg-sky-50 text-sky-700',
                    emerald: 'border-emerald-500 bg-emerald-50 text-emerald-700',
                    indigo: 'border-indigo-500 bg-indigo-50 text-indigo-700',
                    gray: 'border-gray-400 bg-gray-50 text-gray-700'
                  };

                  return (
                    <button
                      key={status.value}
                      type="button"
                      onClick={() => handleChange('status', status.value)}
                      className={`px-4 py-3 border-2 rounded-xl font-semibold text-sm transition-all ${
                        isSelected
                          ? colorClasses[status.color] + ' shadow-md'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {status.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                Notes (optionnel)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Ajoutez des notes sur ce rendez-vous..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {formData.notes.length}/500 caractères
              </p>
            </div>

            {/* Info Box */}
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 rounded-xl">
              <AlertCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-sky-900 mb-1">
                  Rappel automatique
                </p>
                <p className="text-xs text-sky-700">
                  Un SMS de rappel sera automatiquement envoyé au patient 24h avant le rendez-vous.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            * Champs obligatoires
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="group relative px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl font-bold text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isEditMode ? 'Mettre à Jour' : 'Créer le Rendez-vous'}
                <CheckCircle className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-400 blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default AppointmentModal;