import React, { useState, useEffect } from 'react';
import { X, UserPlus, Search, Calendar, FileText, Check, Trash2, User, Clock, Stethoscope, AlertCircle, Loader2 } from 'lucide-react';

import { usePatients } from '../hooks/usePatients';
import { useDoctor } from '../hooks/useDoctor';
import { appointmentService } from '../services/appointmentService';
import CreatePatientModal from './CreatePatientModel';
import DeleteConfirmModal from './DeleteConfirmModal';

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
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Initialize form when appointment prop changes
    useEffect(() => {
        if (appointment && isOpen) {
            const cleanDate = appointment.appointment_date ? appointment.appointment_date.split('T')[0] : '';
            setFormData({
                patientId: appointment.patient_id,
                date: cleanDate,
                type: appointment.visit_type || 'consultation',
                status: appointment.status || 'nouveau',
                notes: appointment.notes || ''
            });

            setSelectedPatient({
                id: appointment.patient_id,
                name: `${appointment.patient_first_name} ${appointment.patient_last_name}`,
                phone: appointment.patient_phone,
                email: appointment.patient_email,
                initials: `${appointment.patient_first_name?.[0] || ''}${appointment.patient_last_name?.[0] || ''}`.toUpperCase()
            });
        } else if (isOpen && !appointment) {
            setFormData({
                patientId: '',
                date: new Date().toISOString().split('T')[0],
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
                await appointmentService.update(appointment.id, {
                    appointment_date: formData.date,
                    visit_type: formData.type,
                    status: formData.status,
                    notes: formData.notes
                });
            } else {
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

            if (onSuccess) onSuccess(appointment ? 'Rendez-vous modifié avec succès' : 'Rendez-vous créé avec succès');
            onClose();
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

    const handleDeleteClick = () => {
        if (!appointment) return;
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = async () => {
        setIsLoading(true);
        try {
            await appointmentService.delete(appointment.id);
            if (onSuccess) onSuccess('Rendez-vous supprimé avec succès');
            setShowDeleteConfirm(false);
            onClose();
        } catch (err) {
            setError(err.message || "Erreur lors de la suppression");
            setShowDeleteConfirm(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-sky-50 to-indigo-50 flex-shrink-0">
                        <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white shadow-md">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-lg leading-tight">
                                    {appointment ? 'Modifier Rendez-vous' : 'Nouveau Rendez-vous'}
                                </span>
                                {selectedPatient && (
                                    <span className="text-xs font-medium text-slate-500">{selectedPatient.name}</span>
                                )}
                            </div>
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 transition-all border border-transparent hover:border-slate-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm animate-in slide-in-from-top-2">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Patient Selection */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                    Patient *
                                </label>

                                {!selectedPatient ? (
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="Rechercher un patient..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                                            />
                                        </div>

                                        {searchTerm && (
                                            <div className="max-h-48 overflow-y-auto border-2 border-slate-100 rounded-2xl bg-white shadow-sm">
                                                {filteredPatients.length > 0 ? (
                                                    filteredPatients.map(patient => (
                                                        <button
                                                            key={patient.id}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedPatient(patient);
                                                                setSearchTerm('');
                                                            }}
                                                            className="w-full text-left px-4 py-3 hover:bg-sky-50 transition-colors flex items-center justify-between group border-b border-slate-50 last:border-0"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                                                                    {patient.initials}
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-slate-900 text-sm">{patient.name}</p>
                                                                    <p className="text-xs text-slate-500">{patient.phone}</p>
                                                                </div>
                                                            </div>
                                                            <Check className="w-4 h-4 text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="p-6 text-center">
                                                        <User className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                                        <p className="text-sm text-slate-500 mb-3">Aucun patient trouvé</p>
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsClientModalOpen(true)}
                                                            className="text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-2 mx-auto"
                                                        >
                                                            <UserPlus className="w-4 h-4" />
                                                            Créer un nouveau patient
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-50 to-indigo-50 border-2 border-sky-100 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow">
                                                {selectedPatient.initials}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{selectedPatient.name}</p>
                                                <p className="text-xs text-slate-500">{selectedPatient.phone}</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedPatient(null)}
                                            className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                        >
                                            Changer
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Date */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                    Date du rendez-vous *
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Type & Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                        Type de visite
                                    </label>
                                    <div className="relative">
                                        <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="consultation">Consultation</option>
                                            <option value="follow_up">Suivi (Follow-up)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                        Statut
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none cursor-pointer"
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
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                    Notes
                                </label>
                                <div className="relative">
                                    <FileText className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                                    <textarea
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all min-h-[100px] resize-none"
                                        placeholder="Ajouter une note..."
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Footer - Fixed */}
                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex gap-3 flex-shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-5 py-3 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold text-sm hover:bg-white transition-all active:scale-95"
                            disabled={isLoading}
                        >
                            Annuler
                        </button>
                        {appointment && (
                            <button
                                type="button"
                                onClick={handleDeleteClick}
                                disabled={isLoading}
                                className="px-6 py-3 bg-red-50 text-red-600 border-2 border-red-200 font-bold rounded-2xl hover:bg-red-100 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="flex-1 px-8 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-sky-200 hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {appointment ? 'Modification...' : 'Création...'}
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4" />
                                    {appointment ? 'Modifier' : 'Créer le rendez-vous'}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Patient Creation Modal */}
            {isClientModalOpen && (
                <CreatePatientModal
                    isOpen={isClientModalOpen}
                    onClose={() => setIsClientModalOpen(false)}
                    onSuccess={() => {
                        setIsClientModalOpen(false);
                        filters.setSearchTerm('');
                    }}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <DeleteConfirmModal
                    itemName="ce rendez-vous"
                    title="Supprimer le rendez-vous ?"
                    message="Vous êtes sur le point de supprimer"
                    warning="Cette action est irréversible."
                    onClose={() => setShowDeleteConfirm(false)}
                    onConfirm={handleConfirmDelete}
                    loading={isLoading}
                />
            )}
        </>
    );
};

export default NewAppointmentModal;