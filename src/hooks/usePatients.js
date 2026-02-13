// hooks/usePatients.js
import { useState, useEffect, useMemo } from 'react';
import { authenticatedFetch } from '../utils/auth';

export const usePatients = (doctorId) => {
  const [allPatients, setAllPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Map backend patient to frontend format
  const mapPatient = (p) => ({
    id: p.id,
    name: `${p.first_name || ''} ${p.last_name || ''}`.trim() || 'Inconnu',
    firstName: p.first_name || '',
    lastName: p.last_name || '',
    phone: p.phone || 'Non renseigné',
    email: p.email || 'Non renseigné',
    birthDate: p.birth_date || null,
    gender: p.gender || 'M',
    lastVisit: p.last_visit 
      ? new Date(p.last_visit).toLocaleDateString('fr-FR') 
      : 'Aucune',
    nextVisit: p.next_visit 
      ? new Date(p.next_visit).toLocaleDateString('fr-FR') 
      : 'None',
    status: p.status || 'active',
    createdAt: p.created_at,
    initials: `${p.first_name?.[0] || ''}${p.last_name?.[0] || ''}`.toUpperCase() || '??',
    // For stats calculations
    totalPast: 0, // Will be populated when appointments table exists
    totalUpcoming: 0,
  });

  // Fetch all patients
  const fetchPatients = async () => {
    if (!doctorId) return;
    setLoading(true);
    try {
      const response = await authenticatedFetch(
        `http://127.0.0.1:3000/patient/${doctorId}`,
        { method: 'GET' }
      );
      const data = await response.json();
      if (data.success) {
        const mapped = data.data.map(mapPatient);
        setAllPatients(mapped);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete patient
  const deletePatient = async (patientId) => {
    const response = await authenticatedFetch(
      `http://127.0.0.1:3000/patient/${patientId}`,
      { method: 'DELETE' }
    );
    const data = await response.json();
    if (data.success) {
      await fetchPatients(); // Refresh list
    }
    return data;
  };

  // Update patient
  const updatePatient = async (patientId, updates) => {
    const response = await authenticatedFetch(
      `http://127.0.0.1:3000/patient/${patientId}`,
      {
        method: 'PUT',
        body: JSON.stringify(updates)
      }
    );
    const data = await response.json();
    if (data.success) {
      await fetchPatients(); // Refresh list
    }
    return data;
  };

  // Filter patients based on search and status
  const filteredPatients = useMemo(() => {
    let result = allPatients;

    // Apply search filter
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

    return result;
  }, [allPatients, searchTerm, statusFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const total = allPatients.length;
    const active = allPatients.filter(p => p.status === 'active').length;
    const inactive = allPatients.filter(p => p.status === 'inactive').length;
    const newThisMonth = allPatients.filter(p => 
      p.createdAt && new Date(p.createdAt) > oneMonthAgo
    ).length;

    // Calculate upcoming/past visits from patient data
    // Note: These will be 0 until appointments table is integrated
    const patientsWithUpcoming = allPatients.filter(p => 
      p.nextVisit && p.nextVisit !== 'None'
    ).length;

    const patientsWithPast = allPatients.filter(p => 
      p.lastVisit && p.lastVisit !== 'Aucune'
    ).length;

    // NRP (No-shows / Rescheduled) - will be calculated from appointments later
    const nrp = 0; // Placeholder until appointments table exists

    return {
      total,
      active,
      inactive,
      newThisMonth,
      upcoming: patientsWithUpcoming,
      past: patientsWithPast,
      nrp
    };
  }, [allPatients]);

  // Load patients on mount
  useEffect(() => {
    if (doctorId) {
      fetchPatients();
    }
  }, [doctorId]);

  return {
    patients: filteredPatients,
    allPatients,
    loading,
    stats,
    filters: {
      searchTerm,
      setSearchTerm,
      statusFilter,
      setStatusFilter
    },
    actions: {
      fetchPatients,
      deletePatient,
      updatePatient
    }
  };
};