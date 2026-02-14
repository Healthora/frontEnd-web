import { authenticatedFetch } from '../utils/auth';

const API_URL = 'http://backend-production-a5ce3.up.railway.app';

export const doctorService = {

    updateProfile: async (doctorData) => {
        try {
            const res = await authenticatedFetch(`${API_URL}/setting/handleSendProfilSetting`, {
                method: 'PUT',
                body: JSON.stringify(doctorData)
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    },

    updateCabinet: async (cabinetData) => {
        try {
            const res = await authenticatedFetch(`${API_URL}/setting/handleCabinetSetting`, {
                method: 'PUT',
                body: JSON.stringify(cabinetData)
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    },

    getProfile: async () => {
        try {
            const res = await authenticatedFetch(`${API_URL}/auth/me`, { method: 'GET' });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data.data;
        } catch (error) {
            throw error;
        }
    },

    signIn: async (credentials) => {
        try {
            const res = await fetch(`${API_URL}/auth/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    },

    signUp: async (doctorData) => {
        try {
            const res = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doctorData)
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            return data;
        } catch (error) {
            throw error;
        }
    }
};
