import { useState, useCallback } from 'react';
import { doctorService } from '../services/doctorService';
import { getCurrentUser } from '../utils/auth';

export const useDoctor = (onUserUpdate) => {
    const user = getCurrentUser() || {};
    const [currentDoctor, setCurrentDoctor] = useState({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        specialty: user.specialty || ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateProfile = useCallback(async (doctorData) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const data = await doctorService.updateProfile(doctorData);

            // Update local storage and current state
            localStorage.setItem('user', JSON.stringify(data.data));
            setCurrentDoctor({
                email: data.data.email || '',
                firstName: data.data.firstName || '',
                lastName: data.data.lastName || '',
                phone: data.data.phone || '',
                specialty: data.data.specialty || ''
            });

            if (onUserUpdate) onUserUpdate();
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
            return data;
        } catch (err) {
            setError(err.message || 'La mise à jour a échoué');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [onUserUpdate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentDoctor(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError(null);
    };

    return {
        doctor: currentDoctor,
        setDoctor: setCurrentDoctor,
        isLoading,
        error,
        success,
        actions: {
            updateProfile,
            handleInputChange
        }
    };
};
