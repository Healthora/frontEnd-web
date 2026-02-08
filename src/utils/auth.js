
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
            logout();
            return false;
        }

        return true;
    } catch (error) {
        logout();
        return false;
    }
};


export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem('user');
        console.log(user)
        return user ? JSON.parse(user) : null;
    } catch (error) {
        return null;
    }
};


export const getToken = () => {
    return localStorage.getItem('token');
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};


export const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
};


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