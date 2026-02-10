// hooks/usePatients.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import { patientService } from '../services/patientService';

export const usePatients = (doctorId) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchPatients = useCallback(async () => {
    if (!doctorId) return;
    setLoading(true);
    try {
      const data = await patientService.getAll(doctorId);
      setPatients(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les patients");
    } finally {
      setLoading(false);
    }
  }, [doctorId]);

  
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const deletePatient = async (id) => {
    await patientService.delete(id);
    setPatients(prev => prev.filter(p => p.id !== id)); 
  };

  const updatePatient = async (id, data) => {
    await patientService.update(id, data);
    fetchPatients(); // Refresh to get exact server state
  };

  const filteredPatients = useMemo(() => {
    let result = patients;
    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(t) || 
        p.phone.toLowerCase().includes(t) || 
        p.email.toLowerCase().includes(t)
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter(p => p.status === statusFilter);
    }
    return result;
  }, [patients, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return {
      total: patients.length,
      active: patients.filter(p => p.status === 'active').length,
      inactive: patients.filter(p => p.status === 'inactive').length,
      newThisMonth: patients.filter(p => new Date(p.createdAt) > oneMonthAgo).length,
    };
  }, [patients]);

  return {
    patients: filteredPatients,
    rawPatients: patients, 
    loading,
    error,
    stats,
    filters: { searchTerm, setSearchTerm, statusFilter, setStatusFilter },
    actions: { fetchPatients, deletePatient, updatePatient }
  };
};