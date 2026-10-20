
// FIX: Reordered imports to ensure global JSX namespace augmentation from `types.ts` is applied before React is imported. This resolves errors where standard HTML elements were not recognized in JSX.
import '../../../types';
import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ToggleSwitch from '../ui/ToggleSwitch';
import { getSettings, updateSettings, uploadMedia } from '../../../services/api';
import { useToast } from '../../../contexts/ToastContext';
import Loader from '../../Loader';

type ActiveTab = 'global' | 'seo' | 'integrations' | 'storage' | 'security' | 'utilities' | 'license';

const FormField: React.FC<{ label: string; description?: string; children: React.ReactNode }> = ({ label, description, children }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start py-4">
        <div className="md:col-span-1">
            <h4 className="font-semibold text-[#1E2B2B]">{label}</h4>
            {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
        <div className="md:col-span-2">
            {children}
        </div>
    </div>
);

const SystemSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('global');
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<any>({
        siteTitle: 'DEIG - Defense Industry Engineering Group',
        contactEmail: 'contact@deig.gov.et',
        hrEmail: 'hr@deig.gov.et',
        logoUrl: '/images/deiglogo.png'
    });
    const [uploading, setUploading] = useState(false);
    const [sitemapEnabled, setSitemapEnabled] = useState(true);
    const [backupsEnabled, setBackupsEnabled] = useState(true);
    const [alertsEnabled, setAlertsEnabled] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getSettings();
                setSettings(data);
            } catch (error) {
                console.error('Failed to fetch settings', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await uploadMedia(formData);
            setSettings({ ...settings, logoUrl: response.url });
            addToast('Logo uploaded successfully', 'success');
        } catch (error) {
            addToast('Failed to upload logo', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        try {
            await updateSettings(settings);
            addToast('Settings saved successfully', 'success');
        } catch (error) {
            addToast('Failed to save settings', 'error');
        }
    };

    const TabButton: React.FC<{ tabId: ActiveTab; children: React.ReactNode }> = ({ tabId, children }) => (
         <button
            onClick={() => setActiveTab(tabId)}
            className={`px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${
                activeTab === tabId ? 'text-[#1075BB] border-b-2 border-[#1075BB]' : 'text-gray-500 hover:text-[#1E2B2B]'
            }`}
        >
            {children}
        </button>
    );

    const renderTabContent = () => {
        if (loading) return <div className="py-20 flex justify-center"><Loader /></div>;
        switch (activeTab) {
            case 'global':
                return (
                    <div className="divide-y divide-[#B3D6F0]">
                        <FormField label="Site Title" description="The main title of the website, displayed in the browser tab.">
                            <input 
                                type="text" 
                                name="siteTitle"
                                value={settings.siteTitle} 
                                onChange={handleInputChange}
                                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB]" 
                            />
                        </FormField>
                        <FormField label="Contact Emails" description="Default email addresses for various inquiries.">
                            <div className="space-y-2">
                                <input 
                                    type="email" 
                                    name="contactEmail"
                                    value={settings.contactEmail} 
                                    onChange={handleInputChange}
                                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB]" 
                                />
                                <input 
                                    type="email" 
                                    name="hrEmail"
                                    value={settings.hrEmail} 
                                    onChange={handleInputChange}
                                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB]" 
                                />
                            </div>
                        </FormField>
                         <FormField label="Site Logo" description="Upload the main logo for the header. (PNG, SVG)">
                            <div className="flex items-center gap-4">
                                <input 
                                    type="file" 
                                    onChange={handleLogoUpload}
                                    className="w-full text-sm text-gray-700 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#1075BB] file:text-white hover:file:bg-opacity-80" 
                                />
                                {settings.logoUrl && (
                                    <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center overflow-hidden">
                                        <img src={settings.logoUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                                    </div>
                                )}
                            </div>
                        </FormField>
                    </div>
                );
            case 'seo':
                 return (
                    <div className="divide-y divide-[#B3D6F0]">
                        <FormField label="Default Meta Description" description="The default description used by search engines. Keep it under 160 characters.">
                            <textarea rows={3} className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB]" defaultValue="A professional, authoritative, and modern corporate website for DEIG – Defense Industry Engineering Group..."></textarea>
                        </FormField>
                        <FormField label="Sitemap Generation" description="Automatically generate and update sitemap.xml for search engines.">
                            <ToggleSwitch enabled={sitemapEnabled} setEnabled={setSitemapEnabled} />
                        </FormField>
                    </div>
                );
            case 'integrations':
                 return (
                    <div className="divide-y divide-[#B3D6F0]">
                        <FormField label="Google Maps API Key" description="Required for displaying interactive maps.">
                            <input type="text" placeholder="Enter API Key" className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB]" />
                        </FormField>
                        <FormField label="SMTP Settings" description="Configure the outgoing email server for notifications and invites.">
                             <div className="space-y-2">
                                <input type="text" placeholder="SMTP Server" className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB]" />
                                <input type="text" placeholder="Port" className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB]" />
                                <input type="text" placeholder="Username" className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB]" />
                                <input type="password" placeholder="Password" className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB]" />
                            </div>
                        </FormField>
                    </div>
                );
            case 'storage':
                 return (
                    <div className="divide-y divide-[#B3D6F0]">
                         <FormField label="Manual Backup" description="Create an instant backup of the website database and media files.">
                            <Button variant="primary">Backup Now</Button>
                        </FormField>
                        <FormField label="Scheduled Backups" description="Enable and configure automatic daily or weekly backups.">
                            <div className="flex items-center space-x-4">
                                <ToggleSwitch enabled={backupsEnabled} setEnabled={setBackupsEnabled} />
                                <select className="bg-white border-gray-300 text-[#1E2B2B] text-sm rounded-md focus:ring-[#1075BB] focus:border-[#1075BB] py-1.5" disabled={!backupsEnabled}>
                                    <option>Daily</option>
                                    <option>Weekly</option>
                                </select>
                            </div>
                        </FormField>
                    </div>
                );
            case 'security':
                 return (
                    <div className="divide-y divide-[#B3D6F0]">
                         <FormField label="IP Whitelist" description="Restrict admin panel access to specific IP addresses. One per line.">
                            <textarea rows={4} placeholder="203.0.113.1&#10;198.51.100.0/24" className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB] font-mono"></textarea>
                        </FormField>
                        <FormField label="Suspicious Activity Alerts" description="Enable email alerts for events like failed logins from unknown IPs.">
                            <div className="space-y-4">
                                <ToggleSwitch enabled={alertsEnabled} setEnabled={setAlertsEnabled} />
                                {alertsEnabled && (
                                    <input type="email" placeholder="Alerts Email Address" defaultValue="security@deig.gov.et" className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB]" />
                                )}
                            </div>
                        </FormField>
                    </div>
                );
             case 'utilities':
                return (
                    <div className="divide-y divide-[#B3D6F0]">
                         <FormField label="Import Users" description="Upload a CSV file to bulk-import user accounts.">
                             <input type="file" accept=".csv" className="w-full text-sm text-gray-700 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#1075BB] file:text-white hover:file:bg-opacity-80" />
                        </FormField>
                        <FormField label="Import News Articles" description="Upload a CSV file to bulk-import news articles.">
                             <input type="file" accept=".csv" className="w-full text-sm text-gray-700 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#1075BB] file:text-white hover:file:bg-opacity-80" />
                        </FormField>
                    </div>
                );
            case 'license':
                return (
                    <div className="divide-y divide-[#B3D6F0]">
                        <FormField label="Expiry Date" description="The date when the public site will lock.">
                            <input 
                                type="date" 
                                name="expiryDate"
                                value={settings.expiryDate || ''} 
                                onChange={handleInputChange}
                                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB]" 
                            />
                        </FormField>
                        <FormField label="System Status" description="Manually suspend or activate the entire system.">
                            <select 
                                name="systemStatus"
                                value={settings.systemStatus || 'Active'} 
                                onChange={(e: any) => handleInputChange(e)}
                                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB]"
                            >
                                <option value="Active">Active (Normal Operation)</option>
                                <option value="Suspended">Suspended (Locked by Admin)</option>
                                <option value="Expired">Force Expired (Locked for Payment)</option>
                            </select>
                        </FormField>
                        <div className="p-4 bg-amber-50 rounded-md border border-amber-200 mt-4">
                            <h5 className="text-sm font-bold text-amber-800 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                Security Notice
                            </h5>
                            <p className="text-xs text-amber-700 mt-1">
                                When the system is Expired or Suspended, the public-facing pages will be disabled and replaced with a notice. The Admin Panel will remain accessible to authorize users to fix the status.
                            </p>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <Card bodyClassName="!p-0">
             <div className="px-6">
                <div className="flex border-b border-[#B3D6F0] overflow-x-auto admin-scrollbar">
                    <TabButton tabId="global">Global</TabButton>
                    <TabButton tabId="seo">SEO</TabButton>
                    <TabButton tabId="integrations">Integrations</TabButton>
                    <TabButton tabId="storage">Storage & Backup</TabButton>
                    <TabButton tabId="security">Security</TabButton>
                    <TabButton tabId="utilities">Utilities</TabButton>
                    <TabButton tabId="license">System License</TabButton>
                </div>
            </div>
            
            <div className="p-6">
                {renderTabContent()}
            </div>
            
             <div className="mt-6 p-6 border-t border-[#B3D6F0] text-right">
                <Button variant="primary" size="lg" onClick={handleSave} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Save Settings'}
                </Button>
            </div>
        </Card>
    );
};

export default SystemSettings;
