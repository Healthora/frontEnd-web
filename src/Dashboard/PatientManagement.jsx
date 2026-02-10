// pages/PatientManagement.jsx
import { useState } from 'react';
import {
  Search, UserPlus, RefreshCw, Users, Activity, X, Trash2, Edit, Phone, Mail, TrendingUp
} from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import { usePatients } from '../hooks/usePatients';
import CreatePatientModal from '../components/CreatePatientModel.jsx';
import EditPatientPanel from '../components/EditPatientPanel'; 
import DeleteConfirmModal from '../components/DeleteConfirmModal'; 
import Toast from '../components/Toast'; 

const PatientManagement = () => {
  const user = getCurrentUser() || {};
  const {
    patients, loading, stats, filters, actions
  } = usePatients(user.doctorId);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [deletingPatient, setDeletingPatient] = useState(null);
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
    await actions.updatePatient(id, data);
    showToast('Patient modifié');
  };

  const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-2 bg-${color}-100 rounded-xl`}><Icon className={`w-5 h-5 text-${color}-600`} /></div>
    </div>
    <p className="text-3xl font-black text-gray-900 mb-1">{value}</p>
    <p className="text-sm text-slate-500 font-medium">{label}</p>
  </div>
  );

  return (
    <div className="min-h-screen font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Patients</h1>
            <p className="text-slate-500 text-sm">Gérez votre base de patients.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={actions.fetchPatients} disabled={loading} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Actualiser
            </button>
            <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-xl font-semibold shadow-md shadow-sky-200 hover:scale-[1.02] transition-all">
              <UserPlus className="w-4 h-4" /> Ajouter un patient
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total" value={stats.total} icon={Users} color="sky" />
          <StatCard label="Actifs" value={stats.active} icon={Activity} color="emerald" />
          <StatCard label="Nouveaux" value={stats.newThisMonth} icon={UserPlus} color="indigo" />
          <StatCard label="Inactifs" value={stats.inactive} icon={X} color="slate" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 shadow-sm flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={filters.searchTerm}
              onChange={(e) => filters.setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'Tous', icon: Users },
              { value: 'active', label: 'Actifs', icon: Activity },
              { value: 'inactive', label: 'Inactifs', icon: X },
            ].map(f => (
              <button
                key={f.value}
                onClick={() => filters.setStatusFilter(f.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filters.statusFilter === f.value
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
              >
                <f.icon className="w-4 h-4" /> {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 flex justify-center"><RefreshCw className="animate-spin text-sky-600" /></div>
          ) : patients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-4xl flex items-center justify-center mb-6">
                <Users className="w-12 h-12 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-3">Aucun patient trouvé</h3>
              <p className="text-slate-500 max-w-sm mb-10 leading-relaxed text-lg">
                {filters.searchTerm || filters.statusFilter !== 'all'
                  ? "Aucun patient ne correspond à vos filtres actuels. Essayez de modifier votre recherche."
                  : "Votre base de données est vide. Ajoutez votre premier patient pour commencer à gérer vos rendez-vous."}
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-3 px-8 py-4 bg-linear-to-r from-sky-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-sky-100 hover:shadow-2xl hover:scale-[1.03] transition-all active:scale-95"
              >
                <UserPlus className="w-6 h-6" /> Ajouter un patient
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    {['Patient', 'Contact', 'Dernière Visite', 'Prochain RDV', 'Actions'].map(h =>
                      <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{h}</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {patients.map(patient => (
                    <tr key={patient.id} className="hover:bg-sky-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-xs">{patient.initials}</div>
                          <span className="font-bold text-slate-900 text-sm">{patient.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-xs text-slate-500">
                          <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> {patient.phone}</span>
                          <span className="flex items-center gap-2"><Mail className="w-3 h-3" /> {patient.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{patient.lastVisit}</td>
                      <td className="px-6 py-4 text-sm text-indigo-600 font-semibold">{patient.nextVisit}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => setEditingPatient(patient)} className="p-1.5 text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-lg"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => setDeletingPatient(patient)} className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modals */}
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
            patient={deletingPatient}
            onClose={() => setDeletingPatient(null)}
            onConfirm={handleDelete}
          />
        )}

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
};

export default PatientManagement;