/* eslint-disable react-hooks/static-components */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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
  Shield
} from 'lucide-react';

const SettingsPage = () => {
  // Custom Toggle Component
  const Toggle = ({ enabled, setEnabled }) => (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`${
        enabled ? 'bg-gradient-to-r from-sky-500 to-indigo-600' : 'bg-slate-200'
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm`}
      />
    </button>
  );

  return (
    <div className="min-h-screen font-sans text-slate-900">
      {/* --- STICKY TOP BAR --- */}
      <div className="sticky top-0 z-10 backdrop-blur-md border-b border-slate-100 mb-8">
        <div className=" mx-auto flex justify-between ">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Paramètres</h1>

            <p className="text-slate-500 text-xs hidden md:block">Configuration générale du compte et du cabinet</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-sky-200 hover:scale-[1.02] transition-all active:scale-95">
            <Save className="w-4 h-4" />
            Enregistrer les modifications
          </button>
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
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nom Complet</label>
                <input type="text" defaultValue="Dr. Marie Dupont" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Spécialité</label>
                <input type="text" defaultValue="Cardiologue" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Pro</label>
                <input type="email" defaultValue="marie.dupont@clinique.fr" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Téléphone</label>
                <input type="text" defaultValue="+33 6 12 34 56 78" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none" />
              </div>
            </div>
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
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><MapPin className="w-3 h-3"/> Adresse</label>
                <input type="text" defaultValue="12 Rue de la Paix, 75002 Paris" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm outline-none" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3"/> Horaires d'ouverture</label>
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
            <Toggle enabled={true} setEnabled={() => {}} />
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
                <Toggle enabled={idx !== 1} setEnabled={() => {}} />
              </div>
            ))}
          </div>
        </section>

        {/* 5. Security Settings */}
        {/* <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="font-bold text-lg">Sécurité et Accès</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50/50 flex items-center justify-center text-emerald-600">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Double Authentification (2FA)</p>
                  <p className="text-[11px] text-slate-400">Protection renforcée par code mobile</p>
                </div>
              </div>
              <Toggle enabled={false} setEnabled={() => {}} />
            </div>
            
            <div className="pt-6 border-t border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="text-xs text-slate-500 italic">Dernière modification du mot de passe : il y a 3 mois</p>
              <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                Changer le mot de passe
              </button>
            </div>
          </div>
        </section> */}

      </div>
    </div>
  );
};

export default SettingsPage;