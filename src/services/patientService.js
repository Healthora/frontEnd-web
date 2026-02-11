// services/patientService.js
import { authenticatedFetch } from '../utils/auth';

const API_URL = 'http://127.0.0.1:3000/patient';

// Helper to map backend database fields to frontend clean object
const mapPatientDTO = (p) => ({
    id: p.id,
    name: `${p.first_name || ''} ${p.last_name || ''}`.trim() || 'Inconnu',
    firstName: p.first_name || '',
    lastName: p.last_name || '',
    phone: p.phone || 'Non renseigné',
    email: p.email || 'Non renseigné',
    birthDate: p.birth_date ? (typeof p.birth_date === 'string' ? p.birth_date.split('T')[0] : new Date(p.birth_date).toISOString().split('T')[0]) : '', // Format YYYY-MM-DD
    gender: p.gender || 'M',
    lastVisit: p.last_visit ? new Date(p.last_visit).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : 'Aucune',
    nextVisit: p.next_visit ? new Date(p.next_visit).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : 'Aucun',
    status: p.status || 'active',
    nrpCount: p.nrp_count || 0,
    totalPast: p.total_past || 0,
    totalFuture: p.total_future || 0,
    createdAt: p.created_at,
    initials: `${p.first_name?.[0] || ''}${p.last_name?.[0] || ''}`.toUpperCase() || '??',
});

export const patientService = {
    // Get all patients for a doctor
    getAll: async (doctorId) => {
        try {
            const res = await authenticatedFetch(`${API_URL}/${doctorId}`, { method: 'GET' });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data.data.map(mapPatientDTO);
        } catch (error) {
            throw error;
        }
    },

    // Update a specific patient
    update: async (id, patientData) => {
        try {
            const res = await authenticatedFetch(`${API_URL}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(patientData)
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Delete a patient
    delete: async (id) => {
        try {
            const res = await authenticatedFetch(`${API_URL}/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Add a new patient
    add: async (patientData) => {
        try {
            const res = await authenticatedFetch(`${API_URL}/add`, {
                method: 'POST',
                body: JSON.stringify(patientData)
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    }
};