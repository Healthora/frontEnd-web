
import { authenticatedFetch } from '../utils/auth';

const API_URL = 'http://127.0.0.1:3000';

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
    }
};
