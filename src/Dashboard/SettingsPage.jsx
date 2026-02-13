/* eslint-disable react-hooks/static-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  User,
  Building2,
  CalendarClock,
  Bell,
  ShieldCheck,
  Camera,
  Save,
  Globe,
  Smartphone,
  MapPin,
  Clock,
  Shield,
  ChevronDown,
  CheckCircle
} from 'lucide-react';
import { useDoctor } from '../hooks/useDoctor.js';
import Toast from '../components/Toast';

const SettingsPage = ({ onUserUpdate }) => {
  const {
    doctor: currentDoctor,
    isLoading,
    error: errorUpdate,
    success: succesUpdate,
    actions
  } = useDoctor(onUserUpdate);

  const specialties = [
    "General Practice", "Internal Medicine", "Cardiology", "Endocrinology & Diabetes",
    "Gastroenterology", "Nephrology", "Neurology", "Psychiatry", "Pediatrics",
    "Obstetrics & Gynecology", "Dermatology", "Ophthalmology", "ENT", "Orthopedics",
    "Rheumatology", "Hematology", "Oncology", "Pulmonology", "Urology",
    "General Surgery", "Vascular Surgery", "Maxillofacial Surgery", "Pediatric Surgery",
    "Plastic & Reconstructive Surgery", "Diagnostic Radiology", "Nutrition & Dietetics",
    "Physiotherapy", "other"
  ];

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSendProfilSetting = async () => {
    try {
      await actions.updateProfile(currentDoctor);
      showToast('Profil mis à jour avec succès');
    } catch (error) {
      showToast(error.message || 'La mise à jour a échoué', 'error');
    }
  };

  const handleSendCabinetSetting = async () => {
    try {
      await actions.updateCabinet({
        cabinetName: currentDoctor.cabinetName,
        cabinetAddress: currentDoctor.cabinetAddress,
        schedule: currentDoctor.schedule
      });
      showToast('Informations du cabinet enregistrées');
    } catch (error) {
      showToast(error.message || 'Erreur lors de la sauvegarde du cabinet', 'error');
    }
  };


  return (
    <div className="min-h-screen font-sans text-slate-900">
      {/* --- STICKY TOP BAR --- */}
      <div className="sticky top-0 z-10 backdrop-blur-md border-b border-slate-100 mb-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Paramètres du Compte</h1>
            <p className="text-gray-500 font-medium text-lg">Configuration générale du compte et du cabinet</p>
          </div>
        </div>

      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-6 pb-20">

        {/* 1. Profile Settings */}
        <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-sky-50 rounded-lg">
              <User className="w-5 h-5 text-sky-600" />
            </div>
            <h2 className="font-bold text-lg">Profil de l'utilisateur</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-28 h-28 rounded-3xl bg-linear-to-br from-sky-50 to-slate-100 border-2 border-white shadow-inner flex items-center justify-center overflow-hidden">
                  <span className="text-sky-600 font-black text-2xl">DR</span>
                </div>
                <button className="absolute -bottom-2 -right-2 p-2.5 bg-white rounded-xl shadow-lg border border-slate-100 text-sky-600 hover:bg-sky-50 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 flex-1">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Prenom</label>
                <input type="text" name="firstName" value={currentDoctor.firstName} onChange={actions.handleInputChange} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nom</label>
                <input type="text" name="lastName" value={currentDoctor.lastName} onChange={actions.handleInputChange} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Spécialité <span className="text-sky-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="specialty"
                    value={currentDoctor.specialty}
                    onChange={actions.handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Sélectionner...</option>
                    {specialties.map((spec, index) => (
                      <option key={index} value={spec}>{spec}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Pro</label>
                <input type="email" name="email" value={currentDoctor.email} onChange={actions.handleInputChange} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Téléphone</label>
                <input type="text" name="phone" value={currentDoctor.phone} onChange={actions.handleInputChange} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none" />
              </div>
            </div>
          </div>
          <div className='flex justify-end mt-6'>
            <button
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold shadow-lg transition-all active:scale-95 ${isLoading
                ? 'bg-slate-400 cursor-not-allowed opacity-70'
                : 'bg-linear-to-r from-sky-600 to-indigo-600 text-white shadow-sky-200 hover:scale-[1.02] cursor-pointer'
                }`}
              onClick={handleSendProfilSetting}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Mise à jour...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Enregistrer les modifications
                </>
              )}
            </button>
          </div>

        </section>

        {/* 2. Clinic Settings */}
        <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Building2 className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="font-bold text-lg">Informations du Cabinet</h2>
          </div>

          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nom du Cabinet</label>
                <input
                  type="text"
                  name="cabinetName"
                  value={currentDoctor.cabinetName}
                  onChange={actions.handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><MapPin className="w-3 h-3" /> Adresse</label>
                <input
                  type="text"
                  name="cabinetAddress"
                  value={currentDoctor.cabinetAddress}
                  onChange={actions.handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-sky-500" />
                  Horaires d'ouverture par jour
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] text-slate-500 font-medium">Ouvert</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {[
                  { key: 'monday', label: 'Lundi' },
                  { key: 'tuesday', label: 'Mardi' },
                  { key: 'wednesday', label: 'Mercredi' },
                  { key: 'thursday', label: 'Jeudi' },
                  { key: 'friday', label: 'Vendredi' },
                  { key: 'saturday', label: 'Samedi' },
                  { key: 'sunday', label: 'Dimanche' }
                ].map(day => (
                  <div
                    key={day.key}
                    className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${currentDoctor.schedule?.[day.key]?.isOpen
                      ? 'bg-white border-slate-100 shadow-xs hover:shadow-md hover:border-sky-100'
                      : 'bg-slate-50/50 border-transparent opacity-60'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Day Label & Status */}
                      <div className="w-24">
                        <p className={`font-bold text-sm ${currentDoctor.schedule?.[day.key]?.isOpen ? 'text-slate-800' : 'text-slate-400'}`}>
                          {day.label}
                        </p>
                        <p className={`text-[10px] font-medium ${currentDoctor.schedule?.[day.key]?.isOpen ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {currentDoctor.schedule?.[day.key]?.isOpen ? 'Jour de travail' : 'Repos'}
                        </p>
                      </div>

                      {/* Status Toggle Button */}
                      <button
                        type="button"
                        onClick={() => actions.handleScheduleChange(day.key, 'isOpen', !currentDoctor.schedule?.[day.key]?.isOpen)}
                        className={`w-11 h-6 rounded-full relative transition-all duration-300 flex items-center px-1 ${currentDoctor.schedule?.[day.key]?.isOpen ? 'bg-sky-500' : 'bg-slate-200'
                          }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm ${currentDoctor.schedule?.[day.key]?.isOpen ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                      </button>
                    </div>

                    {/* Time Inputs */}
                    {currentDoctor.schedule?.[day.key]?.isOpen ? (
                      <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <input
                            type="time"
                            value={currentDoctor.schedule[day.key].start}
                            onChange={(e) => actions.handleScheduleChange(day.key, 'start', e.target.value)}
                            className="bg-transparent text-xs font-bold text-slate-700 outline-none w-14"
                          />
                        </div>
                        <div className="w-4 h-px bg-slate-200"></div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl">
                          <input
                            type="time"
                            value={currentDoctor.schedule[day.key].end}
                            onChange={(e) => actions.handleScheduleChange(day.key, 'end', e.target.value)}
                            className="bg-transparent text-xs font-bold text-slate-700 outline-none w-14"
                          />
                          <Clock className="w-3 h-3 text-slate-400" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400 italic text-xs px-4 py-2 bg-slate-100/50 rounded-xl">
                        Cabinet fermé
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className='flex justify-end mt-4'>
              <button
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold shadow-lg transition-all active:scale-95 ${isLoading
                  ? 'bg-slate-400 cursor-not-allowed opacity-70'
                  : 'bg-linear-to-r from-indigo-600 to-sky-600 text-white shadow-indigo-200 hover:scale-[1.02] cursor-pointer'
                  }`}
                onClick={handleSendCabinetSetting}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Enregistrer le cabinet
              </button>
            </div>
          </div>
        </section>

        {/* 3. Appointment Settings */}
        <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-sky-50 rounded-lg">
              <CalendarClock className="w-5 h-5 text-sky-600" />
            </div>
            <h2 className="font-bold text-lg">Configuration des RDV</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Durée de consultation</label>
              <div className="relative">
                <select
                  name="consultationDuration"
                  value={currentDoctor.consultationDuration || "30"}
                  onChange={actions.handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none appearance-none cursor-pointer"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 heure</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* ... other fields similarly bound to currentDoctor ... */}
          </div>

          <div className="flex items-center justify-between p-5 bg-linear-to-r from-sky-50/50 to-indigo-50/30 rounded-2xl border border-sky-100/50 group hover:border-sky-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${currentDoctor.onlineBooking ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Réservation en ligne</p>
                <p className="text-xs text-slate-500">Permettre aux patients de réserver via votre lien public.</p>
              </div>
            </div>
            {/* Use the same toggle style as the schedule for consistency */}
            <button
              type="button"
              onClick={() => actions.updateProfile({ ...currentDoctor, onlineBooking: !currentDoctor.onlineBooking })}
              className={`w-11 h-6 rounded-full relative transition-all duration-300 flex items-center px-1 ${currentDoctor.onlineBooking ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${currentDoctor.onlineBooking ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </section>

        {/* 4. Notification Settings */}
        <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Bell className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="font-bold text-lg">Préférences de Notification</h2>
          </div>

          <div className="divide-y divide-slate-50">
            {[
              { label: 'Rappels par Email', desc: 'Confirmations et rappels automatiques', icon: Globe },
              { label: 'Rappels par SMS', desc: 'Alertes de dernière minute aux patients', icon: Smartphone },
              { label: 'Notifications Push', desc: 'Alertes navigateur pour les nouveaux RDV', icon: Bell },
            ].map((notif, idx) => (
              <div key={idx} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <notif.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{notif.label}</p>
                    <p className="text-[11px] text-slate-400">{notif.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default SettingsPage;