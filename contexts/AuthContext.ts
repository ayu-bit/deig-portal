
import * as React from 'react';
import { User } from '../types';

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);
