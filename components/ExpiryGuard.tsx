
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSettings } from '../services/api';
import { Loader2, Lock, AlertTriangle, Phone } from 'lucide-react';

interface ExpiryGuardProps {
    children: React.ReactNode;
}

const ExpiryGuard: React.FC<ExpiryGuardProps> = ({ children }) => {
    const [status, setStatus] = useState<'Loading' | 'Active' | 'Expired' | 'Suspended'>('Loading');
    const [settings, setSettings] = useState<any>(null);
    const location = useLocation();

    // Don't block admin routes so the owner can fix the subscription
    const isAdminRoute = location.pathname.startsWith('/admin');

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const data = await getSettings();
                setSettings(data);
                
                const expiryDate = new Date(data.expiryDate);
                const isExpired = expiryDate < new Date();
                
                if (data.systemStatus === 'Suspended') {
                    setStatus('Suspended');
                } else if (isExpired || data.systemStatus === 'Expired') {
                    setStatus('Expired');
                } else {
                    setStatus('Active');
                }
            } catch (error) {
                console.error("Status check failed", error);
                setStatus('Active'); // Default to active if config fails
            }
        };

        checkStatus();
    }, []);

    if (status === 'Loading') {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50 flex-col gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#1075BB]" />
                <p className="text-gray-500 font-medium">Initializing Security Protocols...</p>
            </div>
        );
    }

    if (!isAdminRoute && (status === 'Expired' || status === 'Suspended')) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white p-6">
                <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
                    <div className="relative inline-block">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto ring-8 ring-red-50">
                            <Lock className="w-12 h-12 text-red-600" />
                        </div>
                        <div className="absolute -top-1 -right-1">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center animate-bounce shadow-md">
                                <AlertTriangle className="w-5 h-5 text-amber-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <h1 className="text-3xl font-black text-[#1E2B2B] font-montserrat uppercase tracking-tight">System Notice</h1>
                        <p className="text-gray-600 font-lato leading-relaxed">
                            {status === 'Expired' 
                                ? "The project license for this instance has expired. Access to the public site is currently restricted." 
                                : "This system has been temporarily suspended by the administrator."}
                        </p>
                    </div>

                    <div className="p-6 bg-[#effefb] border border-[#1075BB]/20 rounded-xl space-y-4">
                        <h2 className="font-bold text-[#1E2B2B]">Renewal Required</h2>
                        <p className="text-sm text-gray-500">Please contact the DEIG Technology Department or the system provider to restore full access.</p>
                        
                        <div className="flex items-center justify-center gap-3 text-[#1075BB] font-bold">
                            <Phone className="w-4 h-4" />
                            <span>+251 11 200 1000</span>
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 font-mono italic">
                        Reference Hash: {settings?.siteTitle ? btoa(settings.siteTitle).substring(0, 12) : 'DEIG-SYS-ERR'}
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ExpiryGuard;
