// pages/PatientManagement.jsx
import { useState } from 'react';
import {
  Search, UserPlus, RefreshCw, Users, Activity, X, Trash2, Edit, Phone, Mail, Calendar, ChevronRight
} from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import { usePatients } from '../hooks/usePatients';
import CreatePatientModal from '../components/CreatePatientModel.jsx';
import EditPatientPanel from '../components/EditPatientPanel';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import PatientHistoryModal from '../components/PatientHistoryModal';
import Toast from '../components/Toast';

const PatientManagement = () => {
  const user = getCurrentUser() || {};
  const {
    patients, loading, stats, filters, actions
  } = usePatients(user.doctorId);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [deletingPatient, setDeletingPatient] = useState(null);
  const [historyPatient, setHistoryPatient] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleDelete = async () => {
    if (!deletingPatient) return;
    try {
      await actions.deletePatient(deletingPatient.id);
      showToast('Patient supprimé');
      setDeletingPatient(null);
    } catch (e) {
      showToast('Erreur suppression', 'error');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await actions.updatePatient(id, data);
      showToast('Patient modifié');
      setEditingPatient(null);
    } catch (e) {
      showToast('Erreur lors de la modification', 'error');
    }
  };

  const StatCard = ({ label, value, icon: Icon, color }) => {
    const colorMap = {
      sky: 'bg-sky-50 text-sky-600',
      indigo: 'bg-indigo-50 text-indigo-600',
      emerald: 'bg-emerald-50 text-emerald-600',
      orange: 'bg-orange-50 text-orange-600',
    };

    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-8 shadow-sm hover:shadow-md transition-all group overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[color]} group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        </div>
        <p className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tighter mb-1">{value}</p>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen  ">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2">Patients</h1>
            <p className="text-gray-500 font-medium text-lg">Gérez votre base de patients.</p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)} 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-sky-100 hover:scale-[1.02] transition-all active:scale-95"
          >
            <UserPlus className="w-5 h-5" /> Ajouter un patient
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Patients" value={stats.total} icon={Users} color="sky" />
          <StatCard label="À venir" value={stats.upcoming} icon={Calendar} color="indigo" />
          <StatCard label="Visites Passées" value={stats.past} icon={Activity} color="emerald" />
          <StatCard label="NRP / Reportés" value={stats.nrp} icon={RefreshCw} color="orange" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-8 shadow-sm flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, téléphone..."
              value={filters.searchTerm}
              onChange={(e) => filters.setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500/50 outline-none transition-all"
            />
          </div>
          <div className="flex overflow-x-auto gap-2 no-scrollbar">
            {[
              { value: 'all', label: 'Tous', icon: Users },
              { value: 'active', label: 'Actifs', icon: Activity },
              { value: 'inactive', label: 'Inactifs', icon: X },
            ].map(f => (
              <button
                key={f.value}
                onClick={() => filters.setStatusFilter(f.value)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  filters.statusFilter === f.value
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <f.icon className="w-4 h-4" /> {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="bg-white rounded-3xl border border-gray-100 py-24 flex flex-col items-center justify-center">
             <RefreshCw className="animate-spin text-sky-600 w-10 h-10 mb-4" />
             <p className="text-gray-400 font-bold animate-pulse">Chargement des données...</p>
          </div>
        ) : patients.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center py-24 text-center px-6">
            <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-6">
              <Users className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3">Aucun patient trouvé</h3>
            <p className="text-slate-500 max-w-sm mb-10 leading-relaxed">
              {filters.searchTerm || filters.statusFilter !== 'all'
                ? "Aucun résultat pour ces filtres."
                : "Commencez par ajouter votre premier patient."}
            </p>
            {(filters.searchTerm || filters.statusFilter !== 'all') && (
               <button onClick={() => { filters.setSearchTerm(''); filters.setStatusFilter('all'); }} className="text-sky-600 font-bold hover:underline">Réinitialiser les filtres</button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    {['Patient', 'Contact', 'Dernière Visite', 'Prochain RDV', 'Actions'].map(h =>
                      <th key={h} className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {patients.map(patient => (
                    <tr key={patient.id} className="hover:bg-sky-50/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setHistoryPatient(patient)}>
                          <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
                            {patient.initials}
                          </div>
                          <span className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{patient.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-500">
                        <div className="space-y-1">
                          <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-sky-500" /> {patient.phone}</p>
                          <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-indigo-400" /> {patient.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-600">{patient.lastVisit || '—'}</td>
                      <td className="px-6 py-5 text-sm text-indigo-600 font-black">{patient.nextVisit || 'Non planifié'}</td>
                      <td className="px-6 py-5">
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditingPatient(patient)} className="p-2 text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => setDeletingPatient(patient)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {patients.map(patient => (
                <div key={patient.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm active:scale-95 transition-transform" onClick={() => setHistoryPatient(patient)}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">{patient.initials}</div>
                       <h4 className="font-bold text-slate-900">{patient.name}</h4>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                    <div>
                      <p className="text-slate-400 uppercase font-black text-[9px] mb-1">Dernière</p>
                      <p className="font-bold text-slate-700">{patient.lastVisit || '—'}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 uppercase font-black text-[9px] mb-1">Prochain</p>
                      <p className="font-bold text-indigo-600">{patient.nextVisit || '—'}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4 border-t border-slate-50">
                     <button onClick={(e) => { e.stopPropagation(); setEditingPatient(patient); }} className="p-2 text-sky-600 bg-sky-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                     <button onClick={(e) => { e.stopPropagation(); setDeletingPatient(patient); }} className="p-2 text-red-600 bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modals & Overlays */}
        <CreatePatientModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => { actions.fetchPatients(); showToast('Patient ajouté'); }}
        />

        {editingPatient && (
          <EditPatientPanel
            patient={editingPatient}
            onClose={() => setEditingPatient(null)}
            onSave={handleUpdate}
          />
        )}

        {deletingPatient && (
          <DeleteConfirmModal
            itemName={deletingPatient.name}
            title="Supprimer le patient ?"
            message="Attention : Cette action est irréversible."
            onClose={() => setDeletingPatient(null)}
            onConfirm={handleDelete}
          />
        )}

        <PatientHistoryModal
          isOpen={!!historyPatient}
          patient={historyPatient}
          onClose={() => setHistoryPatient(null)}
        />

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
};

export default PatientManagement;