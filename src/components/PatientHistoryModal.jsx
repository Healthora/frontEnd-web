import React, { useState, useEffect, useCallback } from 'react';
import { X, Calendar, User, Phone, Mail, FileText, Activity } from 'lucide-react';
import { appointmentService } from '../services/appointmentService';

// Moved outside to prevent re-creation on every render
const getStatusColor = (status) => {
    const colors = {
        confirme: 'bg-emerald-100 text-emerald-700',
        nouveau: 'bg-indigo-100 text-indigo-700',
        ne_repond_pas: 'bg-orange-100 text-orange-700',
        reprogramme: 'bg-blue-100 text-blue-700',
        termine: 'bg-emerald-100 text-emerald-700',
        absent: 'bg-red-100 text-red-700',
        annule: 'bg-gray-100 text-gray-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
};

const PatientHistoryModal = ({ isOpen, onClose, patient }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const fetchHistory = useCallback(async () => {
        if (!patient?.id) return;
        setLoading(true);
        setError(null);
        try {
            const data = await appointmentService.getByPatientId(patient.id);
            // Sorting by date descending (newest first)
            const sortedData = (data || []).sort((a, b) => 
                new Date(b.appointment_date) - new Date(a.appointment_date)
            );
            setAppointments(sortedData);
        } catch (err) {
            console.error("Error fetching patient history:", err);
            setError("Impossible de charger l'historique.");
        } finally {
            setLoading(false);
        }
    }, [patient?.id]);

    useEffect(() => {
        if (isOpen) {
            fetchHistory();
        } else {
            setAppointments([]);
        }
    }, [isOpen, fetchHistory]);

    if (!isOpen || !patient) return null;

    const fullName = patient.name || `${patient.firstName || ''} ${patient.lastName || ''}`.trim() || 'Patient Anonyme';

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose} // Close on backdrop click
        >
            <div 
                className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-black text-slate-900">Dossier Patient</h2>
                        <p className="text-slate-500 text-sm">Historique complet et informations</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                        aria-label="Fermer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 space-y-8">
                    {/* Patient Info Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-sky-50 rounded-2xl p-6 border border-indigo-100/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
                            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-600 font-bold text-xl border-4 border-white/50 shrink-0">
                                {patient.initials || (patient.firstName?.[0] || '') + (patient.lastName?.[0] || '') || <User className="w-8 h-8" />}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-black text-slate-900 mb-1">{fullName}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 mt-4">
                                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-600 text-sm">
                                        <Phone className="w-4 h-4 text-indigo-400" />
                                        <span>{patient.phone || 'Non renseigné'}</span>
                                    </div>
                                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-600 text-sm">
                                        <Mail className="w-4 h-4 text-indigo-400" />
                                        <span className="truncate">{patient.email || 'Non renseigné'}</span>
                                    </div>
                                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-600 text-sm">
                                        <Calendar className="w-4 h-4 text-indigo-400" />
                                        <span>Né(e) le {patient.birthDate ? new Date(patient.birthDate).toLocaleDateString('fr-FR') : 'Non renseigné'}</span>
                                    </div>
                                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-600 text-sm">
                                        <User className="w-4 h-4 text-indigo-400" />
                                        <span>{patient.gender === 'M' ? 'Homme' : 'Femme'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Appointments Timeline */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-indigo-600" />
                            Historique des Rendez-vous
                        </h4>

                        {loading ? (
                            <div className="py-12 text-center text-slate-400 flex flex-col items-center">
                                <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-3"></div>
                                Chargement de l'historique...
                            </div>
                        ) : error ? (
                            <div className="py-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-100">
                                {error}
                            </div>
                        ) : appointments.length === 0 ? (
                            <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-500">Aucun rendez-vous enregistré.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[19px] before:w-0.5 before:bg-slate-200">
                                {appointments.map((apt) => (
                                    <div key={apt.id} className="relative pl-10">
                                        <div className={`absolute left-0 top-1.5 w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 ${apt.status === 'termine' ? 'bg-emerald-500' : 'bg-indigo-500'}`}>
                                            <Calendar className="w-4 h-4 text-white" />
                                        </div>

                                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                <div className="font-bold text-slate-900">
                                                    {new Date(apt.appointment_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    {apt.appointment_time && <span className="ml-2 font-medium text-indigo-600">{apt.appointment_time}</span>}
                                                </div>
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold w-fit ${getStatusColor(apt.status)}`}>
                                                    {apt.status.replace(/_/g, ' ')}
                                                </span>
                                            </div>
                                            <div className="text-sm text-slate-600 font-semibold">{apt.visit_type}</div>
                                            {apt.notes && (
                                                <div className="mt-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg flex gap-2">
                                                    <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                                    <p className="italic">"{apt.notes}"</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientHistoryModal;