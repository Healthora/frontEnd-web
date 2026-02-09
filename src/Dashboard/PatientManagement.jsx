import React, { useEffect, useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  ChevronDown,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Download,
  RefreshCw,
  Users,
  TrendingUp,
  Activity,
  X
} from 'lucide-react';
import { authenticatedFetch, getCurrentUser } from '../utils/auth.js';
import CreatePatientModal from './CreatePatientModel.jsx';

const PatientManagement = () => {
  const user = getCurrentUser() || {};
  const doctorId = user.doctorId;

  // State
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    newThisMonth: 0
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Fetch patients
  async function getAllPatient() {
    if (!doctorId) return;
    
    setLoading(true);
    try {
      const response = await authenticatedFetch(
        `http://127.0.0.1:3000/patient/${doctorId}`,
        { method: 'GET' }
      );

      const data = await response.json();

      if (data.success) {
        const mappedPatients = data.data.map(p => ({
          id: p.id,
          name: `${p.first_name || ''} ${p.last_name || ''}`.trim() || 'Inconnu',
          firstName: p.first_name,
          lastName: p.last_name,
          phone: p.phone || 'Non renseigné',
          email: p.email || 'Non renseigné',
          birthDate: p.birth_date,
          gender: p.gender,
          lastVisit: p.last_visit ? new Date(p.last_visit).toLocaleDateString('fr-FR') : 'Aucune',
          nextVisit: p.next_visit ? new Date(p.next_visit).toLocaleDateString('fr-FR') : 'None',
          status: p.status || 'active',
          createdAt: p.created_at,
          initials: (`${p.first_name || ''} ${p.last_name || ''}`)
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2) || '??'
        }));
        setPatients(mappedPatients);
        setFilteredPatients(mappedPatients);
        calculateStats(mappedPatients);
      }
    } catch (err) {
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  }

  // Calculate statistics
  const calculateStats = (patientList) => {
    const total = patientList.length;
    const active = patientList.filter(p => p.status === 'active').length;
    const inactive = patientList.filter(p => p.status === 'inactive').length;
    
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const newThisMonth = patientList.filter(p => 
      new Date(p.createdAt) > oneMonthAgo
    ).length;

    setStats({ total, active, inactive, newThisMonth });
  };

  // Search and filter
  useEffect(() => {
    let result = patients;

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.phone.toLowerCase().includes(term) ||
        p.email.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(p => p.status === statusFilter);
    }

    setFilteredPatients(result);
  }, [searchTerm, statusFilter, patients]);

  // Load patients on mount
  useEffect(() => {
    if (doctorId) {
      getAllPatient();
    }
  }, [doctorId]);

  // Delete patient
  const handleDelete = async (patientId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) return;

    try {
      const response = await authenticatedFetch(
        `http://127.0.0.1:3000/patient/${patientId}`,
        { method: 'DELETE' }
      );

      const data = await response.json();

      if (data.success) {
        getAllPatient();
        alert('Patient supprimé avec succès');
      }
    } catch (err) {
      console.error('Error deleting patient:', err);
      alert('Erreur lors de la suppression');
    }
  };

  // Status styles
  const statusStyles = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-sky-50 text-sky-700 border-sky-200',
    inactive: 'bg-slate-50 text-slate-500 border-slate-200'
  };

  // Status filter buttons
  const statusFilters = [
    { value: 'all', label: 'Tous', icon: Users },
    { value: 'active', label: 'Actifs', icon: Activity },
    { value: 'inactive', label: 'Inactifs', icon: X }
  ];

  return (
    <div className="min-h-screen font-sans text-slate-900 ">
      <div className="max-w-7xl mx-auto">

        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Patients</h1>
            <p className="text-slate-500 text-sm">
              Gérez votre base de patients et leurs rendez-vous.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={getAllPatient}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
            <button
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-xl font-semibold shadow-md shadow-sky-200 hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95"
              onClick={() => setIsModalOpen(true)}
            >
              <UserPlus className="w-4 h-4" />
              Ajouter un patient
            </button>
          </div>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-sky-100 rounded-xl">
                <Users className="w-5 h-5 text-sky-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">{stats.total}</p>
            <p className="text-sm text-slate-500 font-medium">Total Patients</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-emerald-100 rounded-xl">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">{stats.active}</p>
            <p className="text-sm text-slate-500 font-medium">Patients Actifs</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-indigo-100 rounded-xl">
                <UserPlus className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">{stats.newThisMonth}</p>
            <p className="text-sm text-slate-500 font-medium">Nouveaux ce mois</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-slate-100 rounded-xl">
                <X className="w-5 h-5 text-slate-600" />
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">{stats.inactive}</p>
            <p className="text-sm text-slate-500 font-medium">Inactifs</p>
          </div>
        </div>

        {/* --- FILTERS & SEARCH --- */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 shadow-sm">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, téléphone, email..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {statusFilters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  statusFilter === filter.value
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- PATIENT TABLE CARD --- */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="w-8 h-8 text-sky-600 animate-spin" />
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Users className="w-16 h-16 text-slate-300 mb-4" />
              <p className="text-slate-500 font-semibold">
                {searchTerm || statusFilter !== 'all'
                  ? 'Aucun patient trouvé'
                  : 'Aucun patient enregistré'}
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Commencez par ajouter votre premier patient
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Dernière Visite
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Prochain RDV
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="hover:bg-sky-50/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                            {patient.initials}
                          </div>
                          <span className="font-bold text-slate-900 text-sm">
                            {patient.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <Phone className="w-3 h-3 text-sky-500" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Mail className="w-3 h-3" />
                            {patient.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {patient.lastVisit}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-sm ${
                            patient.nextVisit === 'None'
                              ? 'text-slate-400'
                              : 'text-indigo-600 font-semibold'
                          }`}
                        >
                          {patient.nextVisit === 'None'
                            ? 'Non planifié'
                            : patient.nextVisit}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                            statusStyles[patient.status]
                          }`}
                        >
                          {patient.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() =>
                              setShowActionMenu(
                                showActionMenu === patient.id ? null : patient.id
                              )
                            }
                            className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-slate-600 transition-all shadow-none hover:shadow-sm"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {/* Action Menu */}
                          {showActionMenu === patient.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-10">
                              <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                Voir détails
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                <Edit className="w-4 h-4" />
                                Modifier
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                Nouveau RDV
                              </button>
                              <div className="border-t border-slate-100 my-1"></div>
                              <button
                                onClick={() => handleDelete(patient.id)}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Supprimer
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Results count */}
          {!loading && filteredPatients.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <p className="text-sm text-slate-600">
                Affichage de <span className="font-bold">{filteredPatients.length}</span>{' '}
                sur <span className="font-bold">{patients.length}</span> patients
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Patient Modal */}
      <CreatePatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={getAllPatient}
      />

      {/* Click outside to close action menu */}
      {showActionMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowActionMenu(null)}
        />
      )}
    </div>
  );
};

export default PatientManagement;