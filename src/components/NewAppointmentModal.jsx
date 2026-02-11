
import React, { useState, useEffect } from 'react';
import { X, UserPlus, Search, Calendar, FileText, Check, Trash2 } from 'lucide-react';

import { usePatients } from '../hooks/usePatients';
import { useDoctor } from '../hooks/useDoctor';
import { appointmentService } from '../services/appointmentService';
import CreatePatientModal from './CreatePatientModel';

const NewAppointmentModal = ({ isOpen, onClose, onSuccess, appointment, defaultStatus }) => {
    const { doctor } = useDoctor();
    const { patients, filters } = usePatients(doctor?.doctorId);
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        patientId: '',
        date: '',
        type: 'consultation',
        status: 'nouveau',
        notes: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initialize form when appointment prop changes
    useEffect(() => {
        if (appointment && isOpen) {
            setFormData({
                patientId: appointment.patient_id,
                date: appointment.appointment_date ? new Date(appointment.appointment_date).toISOString().split('T')[0] : '',
                type: appointment.visit_type || 'consultation',
                status: appointment.status || 'nouveau',
                notes: appointment.notes || ''
            });

            // Construct patient object from appointment details
            setSelectedPatient({
                id: appointment.patient_id,
                name: `${appointment.patient_first_name} ${appointment.patient_last_name}`,
                phone: appointment.patient_phone,
                email: appointment.patient_email,
                initials: `${appointment.patient_first_name?.[0] || ''}${appointment.patient_last_name?.[0] || ''}`.toUpperCase()
            });
        } else if (isOpen && !appointment) {
            // Reset if opening in "new" mode
            setFormData({
                patientId: '',
                date: '',
                type: 'consultation',
                status: defaultStatus || 'nouveau',
                notes: ''
            });
            setSelectedPatient(null);
            setSearchTerm('');
        }
    }, [appointment, isOpen, defaultStatus]);

    // Filter patients for search
    const filteredPatients = patients.filter(p =>
        (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.phone && p.phone.includes(searchTerm))
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!selectedPatient) {
            setError('Veuillez sélectionner un patient');
            return;
        }

        if (!doctor.cabinetId) {
            setError('Aucun cabinet associé trouvé. Veuillez configurer votre cabinet dans les paramètres.');
            return;
        }

        setIsLoading(true);

        try {
            if (appointment) {
                // Update existing appointment
                await appointmentService.update(appointment.id, {
                    appointment_date: formData.date,
                    visit_type: formData.type,
                    status: formData.status,
                    notes: formData.notes
                });
            } else {
                // Create new appointment
                await appointmentService.create({
                    patient_id: selectedPatient.id,
                    doctor_id: doctor.doctorId,
                    cabinet_id: doctor.cabinetId,
                    appointment_date: formData.date,
                    visit_type: formData.type,
                    status: formData.status,
                    notes: formData.notes
                });
            }

            if (onSuccess) onSuccess();
            onClose();
            // Reset form
            setFormData({
                patientId: '',
                date: '',
                type: 'consultation',
                status: 'nouveau',
                notes: ''
            });
            setSelectedPatient(null);
            setSearchTerm('');
        } catch (err) {
            setError(err.message || `Erreur lors de la ${appointment ? 'modification' : 'création'} du rendez-vous`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!appointment) return;
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) return;

        setIsLoading(true);
        try {
            await appointmentService.delete(appointment.id);
            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            setError(err.message || "Erreur lors de la suppression");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">{appointment ? 'Modifier Rendez-vous' : 'Nouveau Rendez-vous'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Patient Selection */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Patient</label>

                            {!selectedPatient ? (
                                <div className="space-y-3">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Rechercher un patient (nom, téléphone)..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                                        />
                                    </div>

                                    {searchTerm && (
                                        <div className="max-h-48 overflow-y-auto border border-gray-100 rounded-xl bg-white shadow-sm">
                                            {filteredPatients.length > 0 ? (
                                                filteredPatients.map(patient => (
                                                    <button
                                                        key={patient.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedPatient(patient);
                                                            setSearchTerm('');
                                                        }}
                                                        className="w-full text-left px-4 py-3 hover:bg-sky-50 transition-colors flex items-center justify-between group"
                                                    >
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{patient.name}</p>
                                                            <p className="text-xs text-gray-500">{patient.phone} • {patient.email}</p>
                                                        </div>
                                                        <Check className="w-4 h-4 text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="p-4 text-center">
                                                    <p className="text-sm text-gray-500 mb-2">Aucun patient trouvé</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsClientModalOpen(true)}
                                                        className="text-sm font-semibold text-sky-600 hover:underline"
                                                    >
                                                        Créer un nouveau patient
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-4 bg-sky-50 border border-sky-100 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold">
                                            {selectedPatient.initials}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{selectedPatient.name}</p>
                                            <p className="text-xs text-gray-500">{selectedPatient.phone}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedPatient(null)}
                                        className="text-xs font-semibold text-red-500 hover:underline"
                                    >
                                        Changer
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Type & Status */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Type de visite</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all appearance-none"
                                >
                                    <option value="consultation">Consultation</option>
                                    <option value="follow_up">Suivi (Follow-up)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Statut</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all appearance-none"
                                >
                                    <option value="nouveau">Nouveau</option>
                                    <option value="confirme">Confirmé</option>
                                    <option value="ne_repond_pas">Ne répond pas</option>
                                    <option value="reprogramme">Reprogrammé</option>
                                    <option value="absent">Absent</option>
                                    <option value="suivi">Suivi</option>
                                    <option value="termine">Terminé</option>
                                </select>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Notes</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                <textarea
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all min-h-[100px]"
                                    placeholder="Ajouter une note..."
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Annuler
                            </button>
                            {appointment && (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={isLoading}
                                    className="px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    Supprimer
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-sky-500/30 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (appointment ? 'Modification...' : 'Création...') : (appointment ? 'Modifier' : 'Créer le rendez-vous')}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Patient Creation Modal */}
                {isClientModalOpen && (
                    <CreatePatientModal
                        isOpen={isClientModalOpen}
                        onClose={() => setIsClientModalOpen(false)}
                        onSuccess={() => {
                            setIsClientModalOpen(false);
                            // Refresh patients list
                            filters.setSearchTerm(''); // Trigger refresh effectively
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default NewAppointmentModal;
