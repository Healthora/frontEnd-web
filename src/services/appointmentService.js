/* eslint-disable no-useless-catch */

import { authenticatedFetch } from '../utils/auth';

const API_URL = 'https://backend-production-a5ce3.up.railway.app';

export const appointmentService = {
    
    create: async (appointmentData) => {
        try {
            const res = await authenticatedFetch(`${API_URL}/appointments`, {
                method: 'POST',
                body: JSON.stringify(appointmentData)
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data.data;
        } catch (error) {
            throw error;
        }
    },

    getAll: async (doctorId) => {
        try {
            const res = await authenticatedFetch(`${API_URL}/appointments/doctor/${doctorId}`, {
                method: 'GET'
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data.data;
        } catch (error) {
            throw error;
        }
    },

    getByPatientId: async (patientId) => {
        try {
            const res = await authenticatedFetch(`${API_URL}/appointments/patient/${patientId}`, {
                method: 'GET'
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, appointmentData) => {
        try {
            const res = await authenticatedFetch(`${API_URL}/appointments/${id}`, {
                method: 'PUT',
                body: JSON.stringify(appointmentData)
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    },

    updateStatus: async (id, status) => {
        try {
            const res = await authenticatedFetch(`${API_URL}/appointments/${id}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status })
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const res = await authenticatedFetch(`${API_URL}/appointments/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    }
};