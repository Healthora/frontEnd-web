import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Mail,
    Lock,
    ArrowRight,
    Calendar,
    Shield,
    AlertCircle,
    Eye,
    EyeOff,
    User,
    Phone,
    CheckCircle,
    Stethoscope,
    Building2,
    MapPin,
    Clock,
    ChevronDown
} from 'lucide-react';

const specialties = [
    "General Practice",
    "Internal Medicine",
    "Cardiology",
    "Endocrinology & Diabetes",
    "Gastroenterology",
    "Nephrology",
    "Neurology",
    "Psychiatry",
    "Pediatrics",
    "Obstetrics & Gynecology",
    "Dermatology",
    "Ophthalmology",
    "ENT",
    "Orthopedics",
    "Rheumatology",
    "Hematology",
    "Oncology",
    "Pulmonology",
    "Urology",
    "General Surgery",
    "Vascular Surgery",
    "Maxillofacial Surgery",
    "Pediatric Surgery",
    "Plastic & Reconstructive Surgery",
    "Diagnostic Radiology",
    "Nutrition & Dietetics",
    "Physiotherapy",
    "other"
];

import { doctorService } from '../services/doctorService.js';
import { login } from '../utils/auth.js';

const Signup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: '',
        specialty: '',
        cabinetName: '',
        cabinetAddress: '',
        schedule: {
            monday: { isOpen: true, start: "09:00", end: "17:00" },
            tuesday: { isOpen: true, start: "09:00", end: "17:00" },
            wednesday: { isOpen: true, start: "09:00", end: "12:00" },
            thursday: { isOpen: true, start: "09:00", end: "17:00" },
            friday: { isOpen: true, start: "09:00", end: "17:00" },
            saturday: { isOpen: false, start: "09:00", end: "12:00" },
            sunday: { isOpen: false, start: "", end: "" }
        }
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleScheduleChange = (day, field, value) => {
        setFormData(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                [day]: {
                    ...prev.schedule[day],
                    [field]: value
                }
            }
        }));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user types
    };

    const validateStep1 = () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.specialty || !formData.phone) {
            setError('Veuillez remplir tous les champs obligatoires');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Format d\'email invalide');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!formData.cabinetName || !formData.cabinetAddress) {
            setError('Veuillez renseigner le nom et l\'adresse du cabinet');
            return false;
        }
        return true;
    };

    const nextStep = () => {
        if (validateStep1()) {
            setStep(2);
            setError('');
        }
    };

    const prevStep = () => {
        setStep(1);
        setError('');
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!validateStep2()) return;

        setLoading(true);
        setError('');

        try {
            const data = await doctorService.signUp({
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                role: formData.role,
                specialty: formData.specialty,
                cabinetName: formData.cabinetName,
                cabinetAddress: formData.cabinetAddress,
                schedule: formData.schedule
            });

            login(data.data.token, data.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Erreur lors de la création du compte');
            console.error('Signup error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-indigo-50 flex items-center justify-center p-6">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`
            }}></div>

            {/* Decorative blurs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-linear-to-br from-sky-200/40 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-linear-to-tr from-indigo-200/40 to-transparent rounded-full blur-3xl"></div>

            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Column */}
                <div className="hidden lg:flex flex-col gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-sky-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-sky-200">
                            <Calendar className="text-white w-7 h-7" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-gray-900">
                            Medeli<span className="text-sky-600">RDV</span>
                        </span>
                    </Link>

                    <div className="space-y-6">
                        <h1 className="text-5xl font-black text-gray-900 leading-tight">
                            Rejoignez des milliers de
                            <span className="bg-linear-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent"> professionnels de santé</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            {step === 1 ? "Créez votre compte et commencez à gérer vos rendez-vous efficacement." : "Configurez votre cabinet professionnel pour terminer."}
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">40 jours d'essai gratuit</p>
                                <p className="text-sm text-gray-600">Sans carte bancaire requise</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-sky-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Données sécurisées</p>
                                <p className="text-sm text-gray-600">Conformité RGPD garantie</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Configuration rapide</p>
                                <p className="text-sm text-gray-600">Prêt en moins de 5 minutes</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Signup Form */}
                <div className="w-full">
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 lg:p-10">
                        {/* Mobile Logo */}
                        <Link to="/" className="lg:hidden flex items-center gap-2 group mb-8">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                                <Calendar className="text-white w-6 h-6" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900">
                                Medeli<span className="text-sky-600">RDV</span>
                            </span>
                        </Link>

                        <div className="mb-8 flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 mb-2">
                                    {step === 1 ? "Créer un compte" : "Infos Cabinet"}
                                </h2>
                                <p className="text-gray-600">
                                    {step === 1 ? "Étape 1: Profil Médecin" : "Étape 2: Lieu de pratique"}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${step === 1 ? 'bg-sky-50 text-sky-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                    {step}/2
                                </span>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                            {step === 1 ? (
                                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                    {/* Name Fields */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">Prénom *</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-sky-500 transition-all outline-none" placeholder="Jean" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">Nom *</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-sky-500 transition-all outline-none" placeholder="Dupont" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Specialty */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Spécialité *</label>
                                        <div className="relative">
                                            <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <select name="specialty" value={formData.specialty} onChange={handleChange} required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-sky-500 transition-all outline-none appearance-none cursor-pointer">
                                                <option value="" disabled>Sélectionnez votre spécialité</option>
                                                {specialties.map((spec, index) => <option key={index} value={spec}>{spec}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Email & Phone */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-sky-500 transition-all outline-none" placeholder="votre@email.com" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">Téléphone *</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-sky-500 transition-all outline-none" placeholder="06XXXXXXXX" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Passwords */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">Mot de passe *</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:border-sky-500 transition-all outline-none" placeholder="••••••••" />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">Confirmer *</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:border-sky-500 transition-all outline-none" placeholder="••••••••" />
                                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="button" onClick={nextStep} className="group relative w-full px-6 py-4 bg-linear-to-r from-sky-500 to-indigo-600 rounded-xl font-bold text-white shadow-xl shadow-sky-200 hover:shadow-sky-300 hover:scale-[1.02] transition-all duration-300">
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Suivant <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="p-6 bg-sky-50/50 rounded-2xl border border-sky-100 flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                                            <Building2 className="w-6 h-6 text-sky-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sky-900">Information du Cabinet</h3>
                                            <p className="text-sm text-sky-700/70">Ces détails aideront vos patients à vous localiser.</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Nom du Cabinet *</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input type="text" name="cabinetName" value={formData.cabinetName} onChange={handleChange} required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-sky-500 transition-all outline-none" placeholder="Ex: Cabinet Médical Al-Fajr" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Adresse du Cabinet *</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-5 w-5 h-5 text-gray-400" />
                                            <textarea name="cabinetAddress" value={formData.cabinetAddress} onChange={handleChange} required rows="2" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-sky-500 transition-all outline-none resize-none" placeholder="Ex: 12 Rue de la Liberté, Alger" />
                                        </div>
                                    </div>

                                    {/* Horaires d'ouverture */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Clock className="w-5 h-5 text-sky-600" />
                                            <h3 className="font-bold text-gray-900">Horaires d'ouverture</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                            {Object.entries(formData.schedule).map(([day, icon]) => (
                                                <div key={day} className={`p-3 rounded-xl border transition-all ${formData.schedule[day].isOpen ? 'bg-white border-sky-100' : 'bg-gray-50/50 border-gray-100 opacity-60'}`}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-bold text-gray-700 capitalize">
                                                            {day === 'monday' ? 'Lundi' :
                                                                day === 'tuesday' ? 'Mardi' :
                                                                    day === 'wednesday' ? 'Mercredi' :
                                                                        day === 'thursday' ? 'Jeudi' :
                                                                            day === 'friday' ? 'Vendredi' :
                                                                                day === 'saturday' ? 'Samedi' : 'Dimanche'}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleScheduleChange(day, 'isOpen', !formData.schedule[day].isOpen)}
                                                            className={`w-8 h-4 rounded-full relative transition-colors ${formData.schedule[day].isOpen ? 'bg-sky-500' : 'bg-gray-300'}`}
                                                        >
                                                            <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${formData.schedule[day].isOpen ? 'translate-x-4' : ''}`} />
                                                        </button>
                                                    </div>

                                                    {formData.schedule[day].isOpen ? (
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="time"
                                                                value={formData.schedule[day].start}
                                                                onChange={(e) => handleScheduleChange(day, 'start', e.target.value)}
                                                                className="flex-1 px-2 py-1 bg-gray-50 border border-gray-100 rounded text-xs focus:ring-1 focus:ring-sky-500/30 outline-none"
                                                            />
                                                            <span className="text-[10px] text-gray-400">à</span>
                                                            <input
                                                                type="time"
                                                                value={formData.schedule[day].end}
                                                                onChange={(e) => handleScheduleChange(day, 'end', e.target.value)}
                                                                className="flex-1 px-2 py-1 bg-gray-50 border border-gray-100 rounded text-xs focus:ring-1 focus:ring-sky-500/30 outline-none"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span className="text-[10px] text-gray-400 font-medium italic">Fermé</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button type="button" onClick={prevStep} className="flex-1 px-6 py-4 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all">
                                            Retour
                                        </button>
                                        <button type="button" onClick={handleSubmit} disabled={loading} className="flex-2 group relative px-6 py-4 bg-linear-to-r from-sky-500 to-indigo-600 rounded-xl font-bold text-white shadow-xl shadow-sky-200 hover:shadow-sky-300 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50">
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {loading ? 'Création...' : 'Finaliser mon profil'} <CheckCircle className="w-5 h-5" />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>

                        {/* Signin Link */}
                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-gray-600">
                                Vous avez déjà un compte ?{' '}
                                <Link to="/signin" className="font-semibold text-sky-600 hover:text-sky-700 transition-colors">
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;