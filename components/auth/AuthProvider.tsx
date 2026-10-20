import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../../types';
// Fix: Use named imports for react-router-dom to resolve module export errors.
import { useNavigate } from 'react-router-dom';
import * as api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { User } from '../../types';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(localStorage.getItem('deig-admin-token'));
    const navigate = useNavigate();

    const logout = React.useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('deig-admin-token');
        localStorage.removeItem('deig-admin-user');
        navigate('/login');
    }, [navigate]);

    React.useEffect(() => {
        if (token) {
            try {
                // In a real app, you would decode the token to get user info
                // or make a 'get profile' request. For now, we'll fetch from local storage if exists.
                const storedUser = localStorage.getItem('deig-admin-user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Invalid token:', error);
                logout();
            }
        }
    }, [token, logout]);

    const login = async (email: string, password: string) => {
        const data = await api.login(email, password);
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('deig-admin-token', data.token);
        localStorage.setItem('deig-admin-user', JSON.stringify(data.user));
        navigate('/admin');
    };

    const value = {
        isAuthenticated: !!token,
        user,
        token,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
