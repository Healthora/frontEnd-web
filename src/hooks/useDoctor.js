import { useState, useCallback, useEffect } from 'react';
import { doctorService } from '../services/doctorService';
import { getCurrentUser } from '../utils/auth';

export const useDoctor = (onUserUpdate) => {
    const user = getCurrentUser() || {};
    const [currentDoctor, setCurrentDoctor] = useState({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        specialty: user.specialty || '',
        cabinetName: user.cabinetName || '',
        cabinetAddress: user.cabinetAddress || '',
        cabinetId: user.cabinetId || null,
        schedule: user.schedule || {
            monday: { isOpen: true, start: "09:00", end: "17:00" },
            tuesday: { isOpen: true, start: "09:00", end: "17:00" },
            wednesday: { isOpen: true, start: "09:00", end: "12:00" },
            thursday: { isOpen: true, start: "09:00", end: "17:00" },
            friday: { isOpen: true, start: "09:00", end: "17:00" },
            saturday: { isOpen: false, start: "09:00", end: "12:00" },
            sunday: { isOpen: false, start: "", end: "" }
        },
        doctorId: user.doctorId
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Initial fetch to get complete data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await doctorService.getProfile();
                if (data) {
                    const updatedUser = { ...user, ...data };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setCurrentDoctor({
                        email: data.email || '',
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        phone: data.phone || '',
                        specialty: data.specialty || '',
                        cabinetName: data.cabinetName || '',
                        cabinetAddress: data.cabinetAddress || '',
                        cabinetId: data.cabinetId || null,
                        schedule: data.schedule || {
                            monday: { isOpen: true, start: "09:00", end: "17:00" },
                            tuesday: { isOpen: true, start: "09:00", end: "17:00" },
                            wednesday: { isOpen: true, start: "09:00", end: "12:00" },
                            thursday: { isOpen: true, start: "09:00", end: "17:00" },
                            friday: { isOpen: true, start: "09:00", end: "17:00" },
                            saturday: { isOpen: false, start: "09:00", end: "12:00" },
                            sunday: { isOpen: false, start: "", end: "" }
                        },
                        doctorId: data.doctorId || user.doctorId
                    });
                }
            } catch (err) {
                console.error("Error fetching doctor profile:", err);
            }
        };
        fetchProfile();
    }, []); 

    const updateProfile = useCallback(async (doctorData) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const data = await doctorService.updateProfile(doctorData);

            // Update local storage and current state
            const updatedUser = { ...user, ...data.data };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            setCurrentDoctor(prev => ({
                ...prev,
                email: data.data.email || prev.email,
                firstName: data.data.firstName || prev.firstName,
                lastName: data.data.lastName || prev.lastName,
                phone: data.data.phone || prev.phone,
                specialty: data.data.specialty || prev.specialty
            }));

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
    }, [onUserUpdate, user]);

    const updateCabinet = useCallback(async (cabinetData) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const data = await doctorService.updateCabinet(cabinetData);

            // Update local storage and current state
            const updatedUser = { ...user, ...data.data };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            setCurrentDoctor(prev => ({
                ...prev,
                cabinetName: data.data.cabinetName || prev.cabinetName,
                cabinetAddress: data.data.cabinetAddress || prev.cabinetAddress,
                schedule: data.data.schedule || prev.schedule
            }));

            if (onUserUpdate) onUserUpdate();
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
            return data;
        } catch (err) {
            setError(err.message || 'La mise à jour du cabinet a échoué');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [onUserUpdate, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentDoctor(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError(null);
    };

    const handleScheduleChange = (day, field, value) => {
        setCurrentDoctor(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                [day]: {
                    ...prev.schedule[day],
                    [field]: value
                }
            }
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
            updateCabinet,
            handleInputChange,
            handleScheduleChange
        }
    };
};
