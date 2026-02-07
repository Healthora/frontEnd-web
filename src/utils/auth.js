/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
        return false;
    }

    try {
        // Decode JWT token to check expiration
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const isExpired = tokenData.exp * 1000 < Date.now();

        if (isExpired) {
            // Clear expired token
            logout();
            return false;
        }

        return true;
    } catch (error) {
        // If token is invalid
        logout();
        return false;
    }
};

/**
 * Get current user from localStorage
 * @returns {Object|null}
 */
export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        return null;
    }
};

/**
 * Get authentication token
 * @returns {string|null}
 */
export const getToken = () => {
    return localStorage.getItem('token');
};

/**
 * Logout user - clear localStorage
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

/**
 * Login user - save to localStorage
 * @param {string} token - JWT token
 * @param {Object} user - User object
 */
export const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Make authenticated API request
 * @param {string} url - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise}
 */
export const authenticatedFetch = async (url, options = {}) => {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    // If unauthorized, logout and redirect
    if (response.status === 401 || response.status === 403) {
        logout();
        window.location.href = '/signin';
    }

    return response;
};

/**
 * Get current doctor profile from backend
 */
export const getCurrentDoctor = async () => {
    try {
        const token = getToken();
        // The endpoint is /auth/me as per your backend router
        const response = await fetch('http://localhost:3000/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': token, // Backend expects token directly or Bearer? Middleware says req.headers.authorization
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching profile:', error);
        return { success: false, message: 'Erreur de connexion' };
    }
};

/**
 * Update doctor profile
 */
export const updateProfile = async (data) => {
    try {
        const token = getToken();
        const response = await fetch('http://localhost:3000/auth/profile', {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        // Update local storage if successful
        if (result.success && result.data) {
            const currentUser = getCurrentUser();
            // Merge existing user data with updated data
            const updatedUser = { ...currentUser, ...result.data };
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }

        return result;
    } catch (error) {
        console.error('Error updating profile:', error);
        return { success: false, message: 'Erreur de connexion' };
    }
};
