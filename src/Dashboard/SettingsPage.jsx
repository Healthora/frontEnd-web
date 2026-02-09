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
  ChevronDown
} from 'lucide-react';
import { getCurrentUser, authenticatedFetch, login } from '../utils/auth.js'

const SettingsPage = ({ onUserUpdate }) => {
  const [succesUpdate, setcuccesupdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState('');

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

  const { email, firstName, lastName, phone, specialty } = getCurrentUser() || {};
  const [currentDoctor, setCurrentDoctor] = useState({
    email: email || '',
    firstName: firstName || '',
    lastName: lastName || '',
    phone: phone || '',
    specialty: specialty || ''
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleSendProfilSetting() {
    try {
      setIsLoading(true);
      setErrorUpdate('');
      const response = await authenticatedFetch('http://127.0.0.1:3000/setting/handleSendProfilSetting', {
        method: 'PUT',
        body: JSON.stringify(currentDoctor)
      });

      const data = await response.json();

      if (data.success) {
        setcuccesupdate(true);

        localStorage.setItem('user', JSON.stringify(data.data));
        if (onUserUpdate) onUserUpdate();

        setTimeout(() => setcuccesupdate(false), 10000);
      } else {
        setErrorUpdate(data.message || 'La mise à jour a échoué');
      }
    } catch (error) {
      setErrorUpdate('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="min-h-screen font-sans text-slate-900">
      {/* --- STICKY TOP BAR --- */}
      <div className="sticky top-0 z-10 backdrop-blur-md border-b border-slate-100 mb-8">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Paramètres</h1>
            <p className="text-gray-500">Configuration générale du compte et du cabinet</p>
          </div>
        </div>

      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-6">

        {/* 1. Profile Settings */}
        <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-sky-50 rounded-lg">
              <User className="w-5 h-5 text-sky-600" />
            </div>
            <h2 className="font-bold text-lg">Profil de l'utilisateur</h2>
          </div>

          {succesUpdate && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-bold text-emerald-700">Profil mis à jour avec succès !</p>
            </div>
          )}

          {errorUpdate && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-bold text-red-700">{errorUpdate}</p>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-sky-50 to-slate-100 border-2 border-white shadow-inner flex items-center justify-center overflow-hidden">
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
                <input type="text" value={currentDoctor.firstName} onChange={(e) => setCurrentDoctor({ ...currentDoctor, firstName: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nom</label>
                <input type="text" value={currentDoctor.lastName} onChange={(e) => setCurrentDoctor({ ...currentDoctor, lastName: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Spécialité <span className="text-sky-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="specialty"
                    value={currentDoctor.specialty}
                    onChange={(e) => setCurrentDoctor({ ...currentDoctor, specialty: e.target.value })}
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
                <input type="email" value={currentDoctor.email} onChange={(e) => setCurrentDoctor({ ...currentDoctor, email: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Téléphone</label>
                <input type="text" value={currentDoctor.phone} onChange={(e) => setCurrentDoctor({ ...currentDoctor, phone: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none" />
              </div>
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold shadow-lg transition-all active:scale-95 ${isLoading
                ? 'bg-slate-400 cursor-not-allowed opacity-70'
                : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-sky-200 hover:scale-[1.02] cursor-pointer'
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
                <input type="text" defaultValue="Centre Médical Étoile" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><MapPin className="w-3 h-3" /> Adresse</label>
                <input type="text" defaultValue="12 Rue de la Paix, 75002 Paris" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3" /> Horaires d'ouverture</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'].map(day => (
                  <div key={day} className="p-3 border border-slate-100 bg-slate-50/30 rounded-xl text-center hover:border-sky-200 transition-colors">
                    <span className="text-xs font-bold text-slate-700">{day}</span>
                    <p className="text-[10px] text-sky-600 font-medium mt-1">09:00 - 18:00</p>
                  </div>
                ))}
              </div>
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
              <label className="text-[11px] font-bold text-slate-400 uppercase">Durée de consultation</label>
              <select className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none cursor-pointer">
                <option selected>30 minutes</option>
                <option>45 minutes</option>
                <option>1 heure</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Temps de battement</label>
              <select className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none cursor-pointer">
                <option selected>5 minutes</option>
                <option>10 minutes</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Capacité max/jour</label>
              <input type="number" defaultValue="24" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none" />
            </div>
          </div>

          <div className="flex items-center justify-between p-5 bg-gradient-to-r from-sky-50/50 to-indigo-50/30 rounded-2xl border border-sky-100/50">
            <div>
              <p className="text-sm font-bold text-slate-800">Réservation en ligne</p>
              <p className="text-xs text-slate-500">Permettre aux patients de réserver via votre lien public.</p>
            </div>
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
    </div>
  );
};

export default SettingsPage;