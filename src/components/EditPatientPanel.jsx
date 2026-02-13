import React, { useState } from 'react';
import { X, User, Mail, Phone, Calendar as CalendarIcon, Users, AlertCircle, Loader2, Save, Activity } from 'lucide-react';

const EditPatientPanel = ({ patient, onClose, onSave }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        firstName: patient.firstName || '',
        lastName: patient.lastName || '',
        email: patient.email === 'Non renseigné' ? '' : patient.email,
        phone: patient.phone === 'Non renseigné' ? '' : patient.phone,
        birthday: patient.birthDate ? patient.birthDate.split('T')[0] : '',
        gender: patient.gender || 'M',
        status: patient.status || 'active',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const phoneRegex = /^0[567]\d{8}$/;
        if (!phoneRegex.test(form.phone)) {
            setError('Le numéro de téléphone doit contenir 10 chiffres et commencer par 05, 06 ou 07');
            setLoading(false);
            return;
        }

        try {
            await onSave(patient.id, form);
            onClose();
        } catch (err) {
            setError(err.message || 'Erreur lors de la modification');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Container: Added flex-col and max-h to handle scrolling */}
            <div className="bg-white w-full max-w-lg rounded-[28px] sm:rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[95vh] overflow-hidden animate-in zoom-in-95 duration-200">
                
                {/* Header: Fixed at top */}
                <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-linear-to-r from-sky-50 to-indigo-50 shrink-0">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0">
                            {patient.initials}
                        </div>
                        <div className="min-w-0">
                            <span className="block text-base sm:text-lg leading-tight truncate">Modifier Patient</span>
                            <span className="text-xs font-medium text-slate-500 truncate block">{patient.name}</span>
                        </div>
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 transition-all border border-transparent hover:border-slate-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body: Scrollable area for small screens */}
                <div className="overflow-y-auto p-6 custom-scrollbar">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm animate-in slide-in-from-top-2">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Responsive Grid: Stacks on mobile */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                    Prénom *
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    value={form.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                    Nom *
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    value={form.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                Téléphone *
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                    Date de naissance
                                </label>
                                <div className="relative">
                                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="date"
                                        name="birthday"
                                        value={form.birthday}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                    Genre
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    <select
                                        name="gender"
                                        value={form.gender}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="M">Homme</option>
                                        <option value="F">Femme</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions: Vertical stack on mobile for easier tapping */}
                        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 pb-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full sm:flex-1 px-5 py-3 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all active:scale-95"
                                disabled={loading}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:flex-1 px-8 py-3 bg-linear-to-r from-sky-600 to-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-sky-200 hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Modification...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        <span>Enregistrer</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPatientPanel;