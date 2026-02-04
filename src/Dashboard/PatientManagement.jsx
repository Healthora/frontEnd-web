import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Calendar as CalendarIcon,
  ChevronDown,
  UserPlus
} from 'lucide-react';

const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    {
      id: 1,
      name: 'Marie Dupont',
      phone: '+33 6 12 34 56 78',
      email: 'm.dupont@email.com',
      lastVisit: '12 Jan 2026',
      nextVisit: '05 Mar 2026',
      status: 'active',
      initials: 'MD'
    },
    {
      id: 2,
      name: 'Ahmed Ben Ali',
      phone: '+33 7 88 99 00 11',
      email: 'ahmed.ba@web.fr',
      lastVisit: '28 Jan 2026',
      nextVisit: '15 Feb 2026',
      status: 'pending',
      initials: 'AB'
    },
    {
      id: 3,
      name: 'Sophie Martin',
      phone: '+33 6 55 44 33 22',
      email: 's.martin@service.com',
      lastVisit: '05 Dec 2025',
      nextVisit: 'None',
      status: 'inactive',
      initials: 'SM'
    },
    {
      id: 4,
      name: 'Lucas Bernard',
      phone: '+33 6 00 11 22 33',
      email: 'l.bernard@gmail.com',
      lastVisit: '15 Jan 2026',
      nextVisit: '22 Feb 2026',
      status: 'active',
      initials: 'LB'
    }
  ];

  const statusStyles = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    pending: 'bg-sky-50 text-sky-700 border-sky-100',
    inactive: 'bg-slate-50 text-slate-500 border-slate-100'
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Patients</h1>
            <p className="text-slate-500 text-sm mt-1">Gérez votre base de patients et leurs rendez-vous.</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-xl font-semibold shadow-md shadow-sky-200 hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95">
            <UserPlus className="w-4 h-4" />
            Ajouter un patient
          </button>
        </div>

        {/* --- FILTERS & SEARCH --- */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 shadow-sm flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Rechercher par nom, téléphone, email..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-100 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" /> Statut <ChevronDown className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-100 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <CalendarIcon className="w-4 h-4" /> Prochain RDV <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* --- PATIENT TABLE CARD --- */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Dernière Visite</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Prochain RDV</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-sky-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          {patient.initials}
                        </div>
                        <span className="font-bold text-slate-900 text-sm">{patient.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Phone className="w-3 h-3 text-sky-500" /> {patient.phone}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Mail className="w-3 h-3" /> {patient.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{patient.lastVisit}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm ${patient.nextVisit === 'None' ? 'text-slate-300' : 'text-indigo-600 font-semibold'}`}>
                        {patient.nextVisit === 'None' ? 'Non planifié' : patient.nextVisit}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${statusStyles[patient.status]}`}>
                        {patient.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-slate-600 transition-all shadow-none hover:shadow-sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* --- FOOTER / PAGINATION --- */}
          <div className="p-4 border-t border-slate-50 flex items-center justify-between">
            <p className="text-xs text-slate-500">Affichage de 4 patients sur 48</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 disabled:opacity-50">Précédent</button>
              <button className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50">Suivant</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;