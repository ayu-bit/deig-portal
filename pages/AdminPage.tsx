
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PageContent, Vacancy, Applicant, ApplicantStatus, MediaFile, MediaType, Inquiry, InquiryStatus, User, Role, UserRole, PermissionAction, SecurityLog, ActiveSession, WhitelistedIp, SecurityAlert, NewsArticle, Industry, MediaFolder, NewsCategory, ContentStatus, Tender, Supplier, Milestone } from '../types';
import { ROLES, ROLE_PERMISSIONS, ADMIN_MODULES, ACTIVE_SESSIONS, WHITELISTED_IPS, SECURITY_ALERTS, USERS } from '../constants';
import AdminLogin from '../components/admin/AdminLogin';
import ThemeSwitcher from '../components/ThemeSwitcher';

// --- TYPE DEFINITIONS ---
type AdminSection = 
  'Dashboard' | 'Industry Management' | 'News Management' | 
  'Vacancy Management' | 'Tender Management' | 'Supplier Management' | 'Milestone Management' | 'Media Manager' | 
  'Inquiry Management' | 'User Management' | 'Security & Audit' | 'System Settings';

interface DashboardStats {
    totalVisitors: number;
    activeUsers: number;
    openVacancies: number;
    totalApplicants: number;
    unreadMessages: number;
    storageUsed: number;
    recentActivity: SecurityLog[];
    applicantsPerVacancy: { title: string; count: number }[];
}

interface SystemSetting {
    key: string;
    value: string;
    type: 'string' | 'boolean' | 'number' | 'text';
    group: string;
    description: string;
}

// --- HELPER COMPONENTS (ICONS) ---
const Icons = {
  Dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Industry: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  News: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-2 4h2m-2 4h2m-2 4h2" /></svg>,
  Vacancy: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Tender: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Media: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Inquiry: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Users: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-6v-1a4 4 0 00-4-4H9a4 4 0 00-4 4v1a6 6 0 006 6z" /></svg>,
  Security: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.602-.36-3.112-.995-4.428" /></svg>,
  Settings: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Pages: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  Logout: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
  ChevronLeft: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>,
  ChevronRight: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>,
  Bell: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  Plus: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
  TrendingUp: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  TrendingDown: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>,
};

// --- API HELPER ---
async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('deigAuthToken');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`/api/v1${url}`, { ...options, headers });
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || `API request failed: ${response.status}`);
    }
    return await response.json() as T;
}


// --- UI COMPONENTS ---
const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
    return <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>{children}</div>;
}

const Modal: React.FC<React.PropsWithChildren<{ isOpen: boolean; onClose: () => void; title: string; }>> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start p-4 animate-fadeIn" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col mt-10" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-textDark dark:text-textLight">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl">&times;</button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

const Table: React.FC<React.PropsWithChildren<{ headers: string[] }>> = ({ headers, children }) => {
    return (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-textDark dark:text-textLight">
            <thead className="text-xs text-textLight uppercase bg-primaryDark">
              <tr>
                {headers.map(h => <th key={h} scope="col" className="px-6 py-3 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {children}
            </tbody>
          </table>
        </div>
      );
}


// --- LAYOUT COMPONENTS ---
function AdminSidebar({ activeSection, setActiveSection, onLogout, isCollapsed, setCollapsed }: { activeSection: AdminSection; setActiveSection: (section: AdminSection) => void; onLogout: () => void; isCollapsed: boolean; setCollapsed: (c: boolean) => void }) {
  const navItems: { name: AdminSection, icon: React.ReactNode }[] = [
    { name: 'Dashboard', icon: Icons.Dashboard }, { name: 'Industry Management', icon: Icons.Industry },
    { name: 'News Management', icon: Icons.News }, { name: 'Vacancy Management', icon: Icons.Vacancy },
    { name: 'Tender Management', icon: Icons.Tender }, { name: 'Supplier Management', icon: Icons.Users },
    { name: 'Milestone Management', icon: Icons.Pages }, { name: 'Media Manager', icon: Icons.Media },
    { name: 'Inquiry Management', icon: Icons.Inquiry }, { name: 'User Management', icon: Icons.Users },
    { name: 'Security & Audit', icon: Icons.Security }, { name: 'System Settings', icon: Icons.Settings },
  ];

  return (
    <aside className={`bg-primaryDark text-textLight flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-20 flex items-center justify-center border-b border-textLight/20 relative">
        {!isCollapsed && <h1 className="text-xl font-bold font-montserrat text-white">DEIG ADMIN</h1>}
        {isCollapsed && <svg className="w-8 h-8 text-textLight" viewBox="0 0 100 100"><path fill="currentColor" d="M50 0 L100 25 V75 L50 100 L0 75 V25 Z"/></svg>}
        <button onClick={() => setCollapsed(!isCollapsed)} className="absolute -right-3 top-1/2 -translate-y-1/2 bg-primaryDark text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-lightBg dark:border-gray-900">
            {isCollapsed ? Icons.ChevronRight : Icons.ChevronLeft}
        </button>
      </div>
      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {navItems.map(item => {
          const isActive = activeSection === item.name;
          return (
            <button key={item.name} onClick={() => setActiveSection(item.name)} title={item.name} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-semibold text-left transition-colors duration-200 ${isCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-accentStrong text-white' : 'hover:bg-textLight/10'}`}>
              {item.icon} {!isCollapsed && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-textLight/20 space-y-2">
        <a href="/" className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-semibold text-left transition-colors duration-200 hover:bg-textLight/10 ${isCollapsed ? 'justify-center' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> 
            {!isCollapsed && <span>Back to Website</span>}
        </a>
        <button onClick={onLogout} title="Logout" className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-semibold text-left transition-colors duration-200 hover:bg-textLight/10 ${isCollapsed ? 'justify-center' : ''}`}>
          {Icons.Logout} {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

function AdminTopbar({ activeSection }: { activeSection: AdminSection }) {
    return (
        <header className="h-20 bg-white dark:bg-gray-800 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
            <div>
                <h2 className="text-lg font-semibold text-textDark dark:text-textLight">Admin Panel / <span className="text-primaryDark dark:text-accentStrong">{activeSection}</span></h2>
            </div>
            <div className="flex items-center space-x-4">
                <ThemeSwitcher />
                <button className="text-primaryDark dark:text-textLight hover:text-accentStrong relative">
                    {Icons.Bell}
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-xs rounded-full">3</span>
                </button>
                <div className="flex items-center space-x-2">
                    <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&auto=format&fit=crop" alt="Admin" className="w-10 h-10 rounded-full border-2 border-primaryDark dark:border-accentStrong"/>
                    <div>
                        <p className="text-textDark dark:text-textLight font-semibold text-sm">Gen. A. Abebe</p>
                        <p className="text-primaryDark/80 dark:text-textLight/70 text-xs">Admin</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

function KpiCard({ title, value, icon, trend, trendDirection }: { title: string; value: string; icon: React.ReactNode; trend?: string; trendDirection?: 'up' | 'down' }) {
    return (
        <Card>
            <div className="flex justify-between items-center">
                <h3 className="text-sm text-primaryDark dark:text-accentStrong uppercase font-semibold">{title}</h3>
                <div className="text-primaryDark/80 dark:text-textLight/70">{icon}</div>
            </div>
            <p className="text-3xl font-bold text-textDark dark:text-textLight mt-2">{value}</p>
            {trend && trendDirection && (
                 <div className={`flex items-center text-xs mt-1 ${trendDirection === 'up' ? 'text-primaryDark dark:text-green-400' : 'text-danger'}`}>
                    {trendDirection === 'up' ? Icons.TrendingUp : Icons.TrendingDown}
                    <span className="ml-1">{trend}</span>
                </div>
            )}
        </Card>
    );
}

// --- SECTION COMPONENTS ---

const DashboardSection: React.FC<{ authToken: string }> = ({ authToken }) => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        apiFetch<DashboardStats>('/statistics/dashboard')
            .then(setStats)
            .catch(err => setError(err.message));
    }, []);

    if (error) return <div className="p-6 text-danger">Error loading dashboard: {error}</div>;
    if (!stats) return <div className="p-6">Loading dashboard stats...</div>;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Total Visitors" value={stats.totalVisitors.toLocaleString()} icon={Icons.Users} trend="+5%" trendDirection="up" />
                <KpiCard title="Active Users" value={stats.activeUsers.toString()} icon={Icons.Users} />
                <KpiCard title="Open Vacancies" value={stats.openVacancies.toString()} icon={Icons.Vacancy} />
                <KpiCard title="Unread Inquiries" value={stats.unreadMessages.toString()} icon={Icons.Inquiry} trend={stats.unreadMessages > 0 ? "New" : ""} trendDirection={stats.unreadMessages > 0 ? "up" : "down"} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold mb-4 text-textDark dark:text-textLight">Recent Activity</h3>
                    <ul className="space-y-3">
                        {stats.recentActivity.map(log => (
                            <li key={log.id} className="text-sm border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0">
                                <span className="font-bold">{log.user}</span> {log.action} <span className="text-gray-500 text-xs">({new Date(log.timestamp).toLocaleTimeString()})</span>
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold mb-4 text-textDark dark:text-textLight">Applicants per Vacancy</h3>
                    <ul>
                        {stats.applicantsPerVacancy.map((item, idx) => (
                            <li key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                <span>{item.title}</span>
                                <span className="bg-primaryDark/10 text-primaryDark px-2 py-1 rounded text-xs font-bold">{item.count}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

const IndustryManagementSection: React.FC<{ authToken: string }> = ({ authToken }) => {
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ shortName: '', fullNameEn: '', fullNameAm: '', descriptionEn: '', descriptionAm: '', status: 'Online' });

    const fetchIndustries = useCallback(() => {
        apiFetch<Industry[]>('/industries').then(setIndustries).catch(err => setError(err.message));
    }, []);

    useEffect(() => { fetchIndustries(); }, [fetchIndustries]);

    const handleOpenEdit = (ind: Industry) => {
        setEditingId(ind.id);
        setFormData({ shortName: ind.shortName, fullNameEn: ind.fullName.en, fullNameAm: ind.fullName.am, descriptionEn: ind.description.en, descriptionAm: ind.description.am, status: ind.status });
        setIsModalOpen(true);
    };

    const handleOpenCreate = () => {
        setEditingId(null);
        setFormData({ shortName: '', fullNameEn: '', fullNameAm: '', descriptionEn: '', descriptionAm: '', status: 'Online' });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            id: editingId || formData.shortName.toLowerCase().replace(/\s+/g, ''),
            shortName: formData.shortName,
            fullName: { en: formData.fullNameEn, am: formData.fullNameAm },
            description: { en: formData.descriptionEn, am: formData.descriptionAm },
            status: formData.status
        };
        
        try {
            const url = editingId ? `/industries/${editingId}` : '/industries';
            const method = editingId ? 'PUT' : 'POST';
            await fetch(`/api/v1${url}`, {
                method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` }, body: JSON.stringify(payload)
            });
            fetchIndustries();
            setIsModalOpen(false);
        } catch(e) { alert("Operation failed"); }
    };

    const handleDelete = async (id: string) => {
        if(!confirm("Delete this industry?")) return;
        try {
            await fetch(`/api/v1/industries/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${authToken}` } });
            fetchIndustries();
        } catch(e) { alert("Delete failed"); }
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-textDark dark:text-textLight">Industries</h3>
                <button onClick={handleOpenCreate} className="bg-primaryDark text-white px-4 py-2 rounded hover:bg-accentStrong transition-colors flex items-center gap-2">{Icons.Plus} Add Industry</button>
            </div>
            {error && <div className="text-danger mb-4">{error}</div>}
            <Table headers={['Short Name', 'Full Name', 'Status', 'Actions']}>
                {industries.map(i => (
                    <tr key={i.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4">{i.shortName}</td>
                        <td className="px-6 py-4">{i.fullName.en}</td>
                        <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${i.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{i.status}</span></td>
                        <td className="px-6 py-4 flex gap-2">
                            <button onClick={() => handleOpenEdit(i)} className="text-primaryDark hover:underline font-semibold">Edit</button>
                            <button onClick={() => handleDelete(i.id)} className="text-danger hover:underline">Delete</button>
                        </td>
                    </tr>
                ))}
            </Table>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Industry" : "Add Industry"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Short Name (e.g. HEIG)" className="border p-2 rounded dark:bg-gray-700" value={formData.shortName} onChange={e => setFormData({...formData, shortName: e.target.value})} required />
                        <select className="border p-2 rounded dark:bg-gray-700" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                            <option value="Online">Online</option><option value="Maintenance">Maintenance</option>
                        </select>
                    </div>
                    <input placeholder="Full Name (English)" className="w-full border p-2 rounded dark:bg-gray-700" value={formData.fullNameEn} onChange={e => setFormData({...formData, fullNameEn: e.target.value})} required />
                    <input placeholder="Full Name (Amharic)" className="w-full border p-2 rounded dark:bg-gray-700 font-nyala" value={formData.fullNameAm} onChange={e => setFormData({...formData, fullNameAm: e.target.value})} required />
                    <textarea placeholder="Description (English)" rows={3} className="w-full border p-2 rounded dark:bg-gray-700" value={formData.descriptionEn} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} required />
                    <textarea placeholder="Description (Amharic)" rows={3} className="w-full border p-2 rounded dark:bg-gray-700 font-nyala" value={formData.descriptionAm} onChange={e => setFormData({...formData, descriptionAm: e.target.value})} required />
                    <div className="flex justify-end pt-4"><button type="submit" className="bg-primaryDark text-white px-6 py-2 rounded hover:bg-accentStrong">Save</button></div>
                </form>
            </Modal>
        </Card>
    );
};

const NewsManagementSection: React.FC<{ authToken: string }> = ({ authToken }) => {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        titleEn: '',
        titleAm: '',
        contentEn: '',
        contentAm: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Industry News',
        status: 'Draft' as ContentStatus,
        imageUrl: ''
    });

    const categories: NewsCategory[] = ['Headquarters Updates', 'Industry News', 'Projects', 'Events & Exhibitions', 'Announcements', 'Innovation & Technology', 'Press Releases'];

    const fetchNewsData = useCallback(() => {
        apiFetch<NewsArticle[]>('/news').then(setNews).catch(err => setError(err.message));
    }, []);

    useEffect(() => {
        fetchNewsData();
    }, [fetchNewsData]);

    const resetForm = () => {
        setFormData({
            titleEn: '', titleAm: '', contentEn: '', contentAm: '',
            date: new Date().toISOString().split('T')[0],
            category: 'Industry News', status: 'Draft', imageUrl: ''
        });
        setImageFile(null);
        setEditingId(null);
    };

    const handleOpenCreate = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const handleOpenEdit = (article: NewsArticle) => {
        setEditingId(article.id);
        setFormData({
            titleEn: article.title.en,
            titleAm: article.title.am,
            contentEn: article.content.en,
            contentAm: article.content.am,
            date: new Date(article.date).toISOString().split('T')[0],
            category: article.category,
            status: article.status,
            imageUrl: article.image || ''
        });
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let finalImageUrl = formData.imageUrl;

            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('file', imageFile);

                const uploadResponse = await fetch('/api/v1/media/upload', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${authToken}` },
                    body: uploadData
                });

                if (!uploadResponse.ok) throw new Error('Failed to upload image');
                const mediaResult = await uploadResponse.json();
                finalImageUrl = `${mediaResult.url}`; 
            }

            const payload = {
                title: { en: formData.titleEn, am: formData.titleAm },
                content: { en: formData.contentEn, am: formData.contentAm },
                date: formData.date,
                category: formData.category,
                status: formData.status,
                image: finalImageUrl
            };

            const url = editingId ? `/api/v1/news/${editingId}` : '/api/v1/news';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to save news article');

            fetchNewsData();
            setIsModalOpen(false);
            resetForm();

        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return;
        try {
            await fetch(`/api/v1/news/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            fetchNewsData();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-textDark dark:text-textLight">News Management</h3>
                <button onClick={handleOpenCreate} className="bg-primaryDark text-white px-4 py-2 rounded hover:bg-accentStrong transition-colors flex items-center gap-2">
                    {Icons.Plus} Add News
                </button>
            </div>
            
            {error && <div className="text-danger mb-4">{error}</div>}

            <Table headers={['Image', 'Title', 'Category', 'Date', 'Status', 'Actions']}>
                {news.map(n => (
                    <tr key={n.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4">
                            {n.image && <img src={n.image} alt="News thumbnail" className="w-12 h-12 object-cover rounded" />}
                        </td>
                        <td className="px-6 py-4">{n.title.en}</td>
                        <td className="px-6 py-4">{n.category}</td>
                        <td className="px-6 py-4">{new Date(n.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${n.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{n.status}</span>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                            <button onClick={() => handleOpenEdit(n)} className="text-primaryDark hover:underline font-semibold">Edit</button>
                            <button onClick={() => handleDelete(n.id)} className="text-danger hover:underline">Delete</button>
                        </td>
                    </tr>
                ))}
            </Table>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit News Article" : "Add News Article"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Title (English)</label>
                            <input type="text" required className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600" value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Title (Amharic)</label>
                            <input type="text" required className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 font-nyala" value={formData.titleAm} onChange={e => setFormData({...formData, titleAm: e.target.value})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Category</label>
                            <select className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Status</label>
                            <select className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as ContentStatus})}>
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Publish Date</label>
                        <input type="date" required className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                    </div>

                    {/* Image Upload */}
                    <div className="border p-4 rounded border-dashed border-gray-400">
                        <label className="block text-sm font-semibold mb-2">Article Image</label>
                        <div className="flex items-center gap-4">
                            {(formData.imageUrl || imageFile) && (
                                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                                    <img 
                                        src={imageFile ? URL.createObjectURL(imageFile) : formData.imageUrl} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primaryDark/10 file:text-primaryDark hover:file:bg-primaryDark/20" />
                        </div>
                        {formData.imageUrl && !imageFile && <p className="text-xs text-gray-500 mt-1 truncate">Current: {formData.imageUrl}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Content (English)</label>
                            <textarea rows={4} required className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600" value={formData.contentEn} onChange={e => setFormData({...formData, contentEn: e.target.value})}></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Content (Amharic)</label>
                            <textarea rows={4} required className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 font-nyala" value={formData.contentAm} onChange={e => setFormData({...formData, contentAm: e.target.value})}></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="mr-3 px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                        <button type="submit" disabled={loading} className="bg-primaryDark text-white px-6 py-2 rounded hover:bg-accentStrong transition-colors disabled:opacity-50">
                            {loading ? 'Saving...' : 'Save Article'}
                        </button>
                    </div>
                </form>
            </Modal>
        </Card>
    );
};

const VacancyManagementSection: React.FC<{ authToken: string }> = ({ authToken }) => {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ titleEn: '', division: '', location: '', status: 'Open', type: 'Full-Time', closingDate: '' });

    const fetchVacanciesData = useCallback(() => { apiFetch<Vacancy[]>('/vacancies').then(setVacancies); }, []);
    useEffect(() => { fetchVacanciesData(); }, [fetchVacanciesData]);

    const handleOpenEdit = (v: Vacancy) => {
        setEditingId(v.id);
        setFormData({ titleEn: v.title.en, division: v.division, location: v.location, status: v.status, type: v.type, closingDate: v.closingDate ? new Date(v.closingDate).toISOString().split('T')[0] : '' });
        setIsModalOpen(true);
    };

    const handleOpenCreate = () => {
        setEditingId(null);
        setFormData({ titleEn: '', division: '', location: '', status: 'Open', type: 'Full-Time', closingDate: '' });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { title: { en: formData.titleEn, am: '' }, division: formData.division, location: formData.location, status: formData.status, type: formData.type, closingDate: formData.closingDate, description: { en: 'Details pending...', am: '' } };
        const url = editingId ? `/vacancies/${editingId}` : '/vacancies';
        const method = editingId ? 'PUT' : 'POST';
        await fetch(`/api/v1${url}`, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` }, body: JSON.stringify(payload) });
        fetchVacanciesData();
        setIsModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        if(!confirm("Delete this vacancy?")) return;
        await fetch(`/api/v1/vacancies/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${authToken}` } });
        fetchVacanciesData();
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-textDark dark:text-textLight">Vacancy Management</h3>
                <button onClick={handleOpenCreate} className="bg-primaryDark text-white px-4 py-2 rounded hover:bg-accentStrong transition-colors flex items-center gap-2">{Icons.Plus} Post Vacancy</button>
            </div>
            <Table headers={['Title', 'Division', 'Location', 'Status', 'Actions']}>
                {vacancies.map(v => (
                    <tr key={v.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4">{v.title.en}</td>
                        <td className="px-6 py-4">{v.division}</td>
                        <td className="px-6 py-4">{v.location}</td>
                        <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${v.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{v.status}</span></td>
                        <td className="px-6 py-4 flex gap-2">
                            <button onClick={() => handleOpenEdit(v)} className="text-primaryDark hover:underline font-semibold">Edit</button>
                            <button onClick={() => handleDelete(v.id)} className="text-danger hover:underline">Delete</button>
                        </td>
                    </tr>
                ))}
            </Table>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Vacancy" : "Post New Vacancy"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input placeholder="Job Title" className="w-full border p-2 rounded dark:bg-gray-700" value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} required />
                    <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Division" className="border p-2 rounded dark:bg-gray-700" value={formData.division} onChange={e => setFormData({...formData, division: e.target.value})} required />
                        <input placeholder="Location" className="border p-2 rounded dark:bg-gray-700" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <select className="border p-2 rounded dark:bg-gray-700" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                            <option value="Full-Time">Full-Time</option><option value="Part-Time">Part-Time</option><option value="Contract">Contract</option>
                        </select>
                        <select className="border p-2 rounded dark:bg-gray-700" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                            <option value="Open">Open</option><option value="Closed">Closed</option>
                        </select>
                        <input type="date" className="border p-2 rounded dark:bg-gray-700" value={formData.closingDate} onChange={e => setFormData({...formData, closingDate: e.target.value})} />
                    </div>
                    <div className="flex justify-end pt-4"><button type="submit" className="bg-primaryDark text-white px-6 py-2 rounded hover:bg-accentStrong">Save</button></div>
                </form>
            </Modal>
        </Card>
    );
};

const MediaManagerSection: React.FC<{ authToken: string }> = ({ authToken }) => {
    const [media, setMedia] = useState<MediaFile[]>([]);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [uploadFile, setUploadFile] = useState<File | null>(null);

    const fetchMedia = useCallback(() => { apiFetch<MediaFile[]>('/media').then(setMedia); }, []);
    useEffect(() => { fetchMedia(); }, [fetchMedia]);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!uploadFile) return;
        const data = new FormData();
        data.append('file', uploadFile);
        await fetch('/api/v1/media/upload', { method: 'POST', headers: { 'Authorization': `Bearer ${authToken}` }, body: data });
        fetchMedia();
        setIsUploadOpen(false);
        setUploadFile(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete file?")) return;
        await fetch(`/api/v1/media/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${authToken}` } });
        fetchMedia();
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-textDark dark:text-textLight">Media Manager</h3>
                <button onClick={() => setIsUploadOpen(true)} className="bg-primaryDark text-white px-4 py-2 rounded hover:bg-accentStrong flex items-center gap-2">{Icons.Plus} Upload Media</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {media.map(m => (
                    <div key={m.id} className="border rounded p-2 text-center relative group">
                        <button onClick={() => handleDelete(m.id)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs">&times;</button>
                        <div className="h-24 bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-2 overflow-hidden rounded">
                            {m.type === 'Image' ? <img src={m.url} alt={m.name} className="h-full object-cover" /> : <span className="text-4xl text-gray-400">📄</span>}
                        </div>
                        <p className="text-xs truncate" title={m.name}>{m.name}</p>
                    </div>
                ))}
            </div>
            <Modal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} title="Upload Media">
                <form onSubmit={handleUpload} className="space-y-4">
                    <input type="file" onChange={e => setUploadFile(e.target.files ? e.target.files[0] : null)} className="block w-full text-sm border p-2 rounded" required />
                    <button type="submit" className="bg-primaryDark text-white px-6 py-2 rounded w-full">Upload</button>
                </form>
            </Modal>
        </Card>
    );
};

const InquiryManagementSection: React.FC<{ authToken: string }> = ({ authToken }) => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    const fetchInquiries = useCallback(() => { apiFetch<Inquiry[]>('/contacts').then(setInquiries); }, []);
    useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

    const handleUpdateStatus = async (id: string, status: InquiryStatus) => {
        await fetch(`/api/v1/contacts/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` }, body: JSON.stringify({ status }) });
        fetchInquiries();
        if(selectedInquiry) setSelectedInquiry({...selectedInquiry, status});
    };

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4 text-textDark dark:text-textLight">Inquiries</h3>
            <Table headers={['From', 'Subject', 'Division', 'Status', 'Actions']}>
                {inquiries.map(i => (
                    <tr key={i.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4">{i.name}</td>
                        <td className="px-6 py-4 truncate max-w-xs">{i.subject}</td>
                        <td className="px-6 py-4">{i.division}</td>
                        <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${i.status === 'Unread' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{i.status}</span></td>
                        <td className="px-6 py-4"><button onClick={() => setSelectedInquiry(i)} className="text-primaryDark hover:underline">View</button></td>
                    </tr>
                ))}
            </Table>
            <Modal isOpen={!!selectedInquiry} onClose={() => setSelectedInquiry(null)} title="Inquiry Details">
                {selectedInquiry && (
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <h4 className="font-bold text-lg">{selectedInquiry.subject}</h4>
                            <span className="text-sm text-gray-500">{new Date(selectedInquiry.date).toLocaleDateString()}</span>
                        </div>
                        <p><strong>From:</strong> {selectedInquiry.name} ({selectedInquiry.email})</p>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded text-sm whitespace-pre-wrap">{selectedInquiry.message}</div>
                        <div className="flex gap-2 justify-end">
                            {selectedInquiry.status === 'Unread' && <button onClick={() => handleUpdateStatus(selectedInquiry.id, 'Read')} className="bg-blue-600 text-white px-4 py-2 rounded">Mark as Read</button>}
                            {selectedInquiry.status !== 'Resolved' && <button onClick={() => handleUpdateStatus(selectedInquiry.id, 'Resolved')} className="bg-green-600 text-white px-4 py-2 rounded">Resolve</button>}
                        </div>
                    </div>
                )}
            </Modal>
        </Card>
    );
};

const UserManagementSection: React.FC<{ authToken: string }> = ({ authToken }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', roleName: 'Viewer', password: '', status: 'Active' });

    const fetchUsers = useCallback(() => { apiFetch<User[]>('/users').then(setUsers); }, []);
    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const handleOpenCreate = () => {
        setEditingId(null);
        setFormData({ name: '', email: '', roleName: 'Viewer', password: '', status: 'Active' });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (u: User) => {
        setEditingId(u.id);
        setFormData({ name: u.name, email: u.email, roleName: u.role, password: '', status: u.status });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingId ? `/users/${editingId}` : '/users'; // Or /auth/register
        const method = editingId ? 'PUT' : 'POST';
        const body = { ...formData };
        if (!editingId && !body.password) return alert("Password required");
        if (!body.password) delete (body as any).password;

        await fetch(`/api/v1${url}`, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` }, body: JSON.stringify(body) });
        fetchUsers();
        setIsModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        if(!confirm("Delete user?")) return;
        await fetch(`/api/v1/users/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${authToken}` } });
        fetchUsers();
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-textDark dark:text-textLight">User Management</h3>
                <button onClick={handleOpenCreate} className="bg-primaryDark text-white px-4 py-2 rounded hover:bg-accentStrong flex items-center gap-2">{Icons.Plus} Add User</button>
            </div>
            <Table headers={['Name', 'Email', 'Role', 'Status', 'Actions']}>
                {users.map(u => (
                    <tr key={u.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4">{u.name}</td>
                        <td className="px-6 py-4">{u.email}</td>
                        <td className="px-6 py-4">{u.role}</td>
                        <td className="px-6 py-4">{u.status}</td>
                        <td className="px-6 py-4 flex gap-2">
                            <button onClick={() => handleOpenEdit(u)} className="text-primaryDark hover:underline">Edit</button>
                            <button onClick={() => handleDelete(u.id)} className="text-danger hover:underline">Delete</button>
                        </td>
                    </tr>
                ))}
            </Table>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit User" : "Add User"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input placeholder="Full Name" className="w-full border p-2 rounded dark:bg-gray-700" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    <input type="email" placeholder="Email" className="w-full border p-2 rounded dark:bg-gray-700" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                    <div className="grid grid-cols-2 gap-4">
                        <select className="border p-2 rounded dark:bg-gray-700" value={formData.roleName} onChange={e => setFormData({...formData, roleName: e.target.value})}>
                            {ROLES.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                        </select>
                        <select className="border p-2 rounded dark:bg-gray-700" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                            <option value="Active">Active</option><option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    {!editingId && <input type="password" placeholder="Password" className="w-full border p-2 rounded dark:bg-gray-700" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />}
                    <div className="flex justify-end pt-4"><button type="submit" className="bg-primaryDark text-white px-6 py-2 rounded">Save</button></div>
                </form>
            </Modal>
        </Card>
    );
};

const SecurityAuditSection: React.FC<{ authToken: string }> = ({ authToken }) => {
    const [tab, setTab] = useState<'logs' | 'alerts' | 'whitelist'>('logs');
    const [logs, setLogs] = useState<SecurityLog[]>([]);
    const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
    const [ips, setIps] = useState<WhitelistedIp[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newIp, setNewIp] = useState('');
    const [newIpDesc, setNewIpDesc] = useState('');

    useEffect(() => {
        if (tab === 'logs') {
            apiFetch<SecurityLog[]>('/security/logs').then(setLogs).catch(err => setError(err.message));
        } else if (tab === 'alerts') {
            apiFetch<SecurityAlert[]>('/security/alerts').then(setAlerts).catch(err => setError(err.message));
        } else if (tab === 'whitelist') {
            apiFetch<WhitelistedIp[]>('/security/whitelist').then(setIps).catch(err => setError(err.message));
        }
    }, [tab]);

    const handleAddIp = async () => {
        try {
            await fetch('/api/v1/security/whitelist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
                body: JSON.stringify({ ipAddress: newIp, description: newIpDesc })
            });
            setNewIp('');
            setNewIpDesc('');
            // Refresh list
            apiFetch<WhitelistedIp[]>('/security/whitelist').then(setIps);
        } catch (err) {
            alert("Failed to add IP");
        }
    };

    const handleRemoveIp = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`/api/v1/security/whitelist/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            setIps(prev => prev.filter(ip => ip.id !== id));
        } catch (err) {
            alert("Failed to delete IP");
        }
    }

    if (error && logs.length === 0 && alerts.length === 0 && ips.length === 0) return <div className="p-4 text-danger">Error: {error}</div>;

    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-textDark dark:text-textLight">Security Center</h3>
            </div>
            <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                <button onClick={() => setTab('logs')} className={`pb-2 px-1 ${tab === 'logs' ? 'border-b-2 border-primaryDark font-bold text-primaryDark' : 'text-gray-500'}`}>Audit Logs</button>
                <button onClick={() => setTab('alerts')} className={`pb-2 px-1 ${tab === 'alerts' ? 'border-b-2 border-primaryDark font-bold text-primaryDark' : 'text-gray-500'}`}>Security Alerts</button>
                <button onClick={() => setTab('whitelist')} className={`pb-2 px-1 ${tab === 'whitelist' ? 'border-b-2 border-primaryDark font-bold text-primaryDark' : 'text-gray-500'}`}>IP Whitelist</button>
            </div>

            {tab === 'logs' && (
                <Table headers={['Timestamp', 'User', 'Action', 'IP Address']}>
                    {logs.map(l => (
                        <tr key={l.id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="px-6 py-4 text-xs">{new Date(l.timestamp).toLocaleString()}</td>
                            <td className="px-6 py-4">{l.user}</td>
                            <td className="px-6 py-4">{l.action}</td>
                            <td className="px-6 py-4 font-mono text-xs">{l.ipAddress}</td>
                        </tr>
                    ))}
                </Table>
            )}

            {tab === 'alerts' && (
                <div className="space-y-4">
                    {alerts.map(alert => (
                        <div key={alert.id} className={`p-4 border rounded-lg flex justify-between items-center ${alert.severity === 'Critical' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
                            <div>
                                <h4 className="font-bold text-textDark">{alert.type}</h4>
                                <p className="text-sm text-gray-600">{alert.details}</p>
                                <p className="text-xs text-gray-400 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${alert.severity === 'Critical' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{alert.severity}</span>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'whitelist' && (
                <div>
                    <div className="flex gap-2 mb-4 bg-gray-50 p-4 rounded">
                        <input value={newIp} onChange={e => setNewIp(e.target.value)} placeholder="IP Address (e.g. 192.168.1.1)" className="border p-2 rounded text-sm flex-grow" />
                        <input value={newIpDesc} onChange={e => setNewIpDesc(e.target.value)} placeholder="Description" className="border p-2 rounded text-sm flex-grow" />
                        <button onClick={handleAddIp} className="bg-primaryDark text-white px-4 rounded text-sm font-bold">Add IP</button>
                    </div>
                    <Table headers={['IP Address', 'Description', 'Added By', 'Date', 'Action']}>
                        {ips.map(ip => (
                            <tr key={ip.id} className="border-b border-gray-200 dark:border-gray-700">
                                <td className="px-6 py-4 font-mono">{ip.ipAddress}</td>
                                <td className="px-6 py-4">{ip.description}</td>
                                <td className="px-6 py-4">{ip.addedBy}</td>
                                <td className="px-6 py-4 text-xs">{new Date(ip.dateAdded).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-danger cursor-pointer hover:underline" onClick={() => handleRemoveIp(ip.id)}>Remove</td>
                            </tr>
                        ))}
                    </Table>
                </div>
            )}
        </Card>
    );
};

const TenderManagementSection: React.FC<{ authToken: string }> = ({ authToken }) => {
    const [tenders, setTenders] = useState<Tender[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ titleEn: '', reference: '', status: 'Open', closingDate: '', descriptionEn: '' });

    const fetchTenders = useCallback(() => { apiFetch<Tender[]>('/tenders').then(setTenders); }, []);
    useEffect(() => { fetchTenders(); }, [fetchTenders]);

    const handleOpenEdit = (t: Tender) => {
        setEditingId(t.id);
        setFormData({ titleEn: t.title.en, reference: t.reference, status: t.status, closingDate: new Date(t.closingDate).toISOString().split('T')[0], descriptionEn: t.description.en });
        setIsModalOpen(true);
    };

    const handleOpenCreate = () => {
        setEditingId(null);
        setFormData({ titleEn: '', reference: '', status: 'Open', closingDate: '', descriptionEn: '' });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { title: { en: formData.titleEn, am: '' }, reference: formData.reference, status: formData.status, closingDate: formData.closingDate, publishedDate: new Date(), description: { en: formData.descriptionEn, am: '' } };
        const url = editingId ? `/tenders/${editingId}` : '/tenders';
        const method = editingId ? 'PUT' : 'POST';
        await fetch(`/api/v1${url}`, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` }, body: JSON.stringify(payload) });
        fetchTenders();
        setIsModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        if(!confirm("Delete tender?")) return;
        await fetch(`/api/v1/tenders/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${authToken}` } });
        fetchTenders();
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-textDark dark:text-textLight">Tenders</h3>
                <button onClick={handleOpenCreate} className="bg-primaryDark text-white px-4 py-2 rounded hover:bg-accentStrong flex items-center gap-2">{Icons.Plus} Create Tender</button>
            </div>
            <Table headers={['Title', 'Reference', 'Status', 'Closing Date', 'Actions']}>
                {tenders.map(t => (
                    <tr key={t.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4">{t.title.en}</td>
                        <td className="px-6 py-4">{t.reference}</td>
                        <td className="px-6 py-4">{t.status}</td>
                        <td className="px-6 py-4">{new Date(t.closingDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 flex gap-2">
                            <button onClick={() => handleOpenEdit(t)} className="text-primaryDark hover:underline">Edit</button>
                            <button onClick={() => handleDelete(t.id)} className="text-danger hover:underline">Delete</button>
                        </td>
                    </tr>
                ))}
            </Table>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Tender" : "Create Tender"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input placeholder="Title" className="w-full border p-2 rounded dark:bg-gray-700" value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} required />
                    <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Reference #" className="border p-2 rounded dark:bg-gray-700" value={formData.reference} onChange={e => setFormData({...formData, reference: e.target.value})} required />
                        <select className="border p-2 rounded dark:bg-gray-700" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                            <option value="Open">Open</option><option value="Closed">Closed</option>
                        </select>
                    </div>
                    <input type="date" className="w-full border p-2 rounded dark:bg-gray-700" value={formData.closingDate} onChange={e => setFormData({...formData, closingDate: e.target.value})} required />
                    <textarea placeholder="Description" rows={4} className="w-full border p-2 rounded dark:bg-gray-700" value={formData.descriptionEn} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} required />
                    <div className="flex justify-end pt-4"><button type="submit" className="bg-primaryDark text-white px-6 py-2 rounded hover:bg-accentStrong">Save</button></div>
                </form>
            </Modal>
        </Card>
    );
};

const SupplierManagementSection: React.FC<{ authToken: string }> = ({ authToken }) => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    
    const fetchSuppliers = useCallback(() => { apiFetch<Supplier[]>('/suppliers').then(setSuppliers); }, []);
    useEffect(() => { fetchSuppliers(); }, [fetchSuppliers]);

    const handleUpdateStatus = async (id: string, status: string) => {
        await fetch(`/api/v1/suppliers/${id}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` }, body: JSON.stringify({ status }) });
        fetchSuppliers();
    };

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4 text-textDark dark:text-textLight">Supplier Management</h3>
            <Table headers={['Company', 'Contact', 'Email', 'Status', 'Actions']}>
                {suppliers.map(s => (
                    <tr key={s.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">{s.companyName}</td>
                        <td className="px-6 py-4">{s.contactPerson}</td>
                        <td className="px-6 py-4">{s.contactEmail}</td>
                        <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${s.status === 'Approved' ? 'bg-green-100 text-green-800' : s.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{s.status}</span></td>
                        <td className="px-6 py-4 flex gap-2">
                            {s.status === 'Pending' && (
                                <>
                                    <button onClick={() => handleUpdateStatus(s.id, 'Approved')} className="text-green-600 hover:underline">Approve</button>
                                    <button onClick={() => handleUpdateStatus(s.id, 'Rejected')} className="text-red-600 hover:underline">Reject</button>
                                </>
                            )}
                            {s.profileUrl && <a href={`${s.profileUrl}`} target="_blank" className="text-blue-600 hover:underline ml-2">Profile</a>}
                        </td>
                    </tr>
                ))}
            </Table>
        </Card>
    );
};

const MilestoneManagementSection: React.FC<{ authToken: string }> = ({ authToken }) => {
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ year: '', eventEn: '', eventAm: '' });

    const fetchMilestones = useCallback(() => { apiFetch<Milestone[]>('/milestones').then(setMilestones); }, []);
    useEffect(() => { fetchMilestones(); }, [fetchMilestones]);

    const handleOpenEdit = (m: Milestone) => {
        setEditingId(m.id);
        setFormData({ year: m.year, eventEn: m.event.en, eventAm: m.event.am });
        setIsModalOpen(true);
    };

    const handleOpenCreate = () => {
        setEditingId(null);
        setFormData({ year: '', eventEn: '', eventAm: '' });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { year: formData.year, event: { en: formData.eventEn, am: formData.eventAm } };
        const url = editingId ? `/milestones/${editingId}` : '/milestones';
        const method = editingId ? 'PUT' : 'POST';
        await fetch(`/api/v1${url}`, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` }, body: JSON.stringify(payload) });
        fetchMilestones();
        setIsModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        if(!confirm("Delete milestone?")) return;
        await fetch(`/api/v1/milestones/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${authToken}` } });
        fetchMilestones();
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-textDark dark:text-textLight">Milestones</h3>
                <button onClick={handleOpenCreate} className="bg-primaryDark text-white px-4 py-2 rounded hover:bg-accentStrong flex items-center gap-2">{Icons.Plus} Add Milestone</button>
            </div>
            <Table headers={['Year', 'Event', 'Actions']}>
                {milestones.map(m => (
                    <tr key={m.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-bold">{m.year}</td>
                        <td className="px-6 py-4">{m.event.en}</td>
                        <td className="px-6 py-4 flex gap-2">
                            <button onClick={() => handleOpenEdit(m)} className="text-primaryDark hover:underline">Edit</button>
                            <button onClick={() => handleDelete(m.id)} className="text-danger hover:underline">Delete</button>
                        </td>
                    </tr>
                ))}
            </Table>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Milestone" : "Add Milestone"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input placeholder="Year (e.g. 1998)" className="w-full border p-2 rounded dark:bg-gray-700" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} required />
                    <textarea placeholder="Event Description (English)" rows={3} className="w-full border p-2 rounded dark:bg-gray-700" value={formData.eventEn} onChange={e => setFormData({...formData, eventEn: e.target.value})} required />
                    <textarea placeholder="Event Description (Amharic)" rows={3} className="w-full border p-2 rounded dark:bg-gray-700 font-nyala" value={formData.eventAm} onChange={e => setFormData({...formData, eventAm: e.target.value})} required />
                    <div className="flex justify-end pt-4"><button type="submit" className="bg-primaryDark text-white px-6 py-2 rounded hover:bg-accentStrong">Save</button></div>
                </form>
            </Modal>
        </Card>
    );
};

const SystemSettingsSection: React.FC<{ authToken: string }> = ({ authToken }) => {
    const [settings, setSettings] = useState<SystemSetting[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        apiFetch<SystemSetting[]>('/settings')
            .then(setSettings)
            .catch(err => setError(err.message));
    }, []);

    const handleChange = (key: string, value: string) => {
        setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
    };

    const handleSave = async () => {
        setSaving(true);
        setSuccessMessage(null);
        setError(null);
        try {
            await fetch('/api/v1/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(settings.map(s => ({ key: s.key, value: s.value })))
            });
            setSuccessMessage("Settings saved successfully!");
        } catch (err) {
            setError("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    if (error && settings.length === 0) return <div className="p-4 text-danger">Error: {error}</div>;

    // Group settings by their group property
    const groupedSettings = settings.reduce((acc, setting) => {
        (acc[setting.group] = acc[setting.group] || []).push(setting);
        return acc;
    }, {} as Record<string, SystemSetting[]>);

    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-textDark dark:text-textLight">System Settings</h3>
                <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="bg-primaryDark text-white px-4 py-2 rounded hover:bg-primaryDark/80 disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
            
            {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>}
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

            <div className="space-y-8">
                {Object.entries(groupedSettings).map(([group, groupSettings]) => (
                    <div key={group} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                        <h4 className="text-lg font-semibold text-primaryDark dark:text-accentStrong mb-4">{group}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(groupSettings as SystemSetting[]).map(setting => (
                                <div key={setting.key}>
                                    <label className="block text-sm font-medium text-textDark/80 dark:text-textLight/80 mb-1">
                                        {setting.key.replace(/_/g, ' ').toUpperCase()}
                                    </label>
                                    <p className="text-xs text-gray-500 mb-2">{setting.description}</p>
                                    {setting.type === 'boolean' ? (
                                        <select 
                                            value={setting.value} 
                                            onChange={(e) => handleChange(setting.key, e.target.value)}
                                            className="w-full bg-lightBg dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2"
                                        >
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    ) : (
                                        <input 
                                            type={setting.type === 'number' ? 'number' : 'text'}
                                            value={setting.value} 
                                            onChange={(e) => handleChange(setting.key, e.target.value)}
                                            className="w-full bg-lightBg dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const AdminPage: React.FC = () => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<AdminSection>('Dashboard');
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('deigAuthToken');
        if (token) {
            setAuthToken(token);
        }
    }, []);

    const handleLogin = (token: string) => {
        localStorage.setItem('deigAuthToken', token);
        setAuthToken(token);
    };

    const handleLogout = () => {
        localStorage.removeItem('deigAuthToken');
        setAuthToken(null);
    };
    
    if (!authToken) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    const renderSection = () => {
        switch (activeSection) {
            case 'Dashboard':
                return <DashboardSection authToken={authToken} />;
            case 'Industry Management':
                return <IndustryManagementSection authToken={authToken} />;
            case 'News Management':
                return <NewsManagementSection authToken={authToken} />;
            case 'Vacancy Management':
                return <VacancyManagementSection authToken={authToken} />;
            case 'Media Manager':
                return <MediaManagerSection authToken={authToken} />;
            case 'Inquiry Management':
                return <InquiryManagementSection authToken={authToken} />;
            case 'User Management':
                return <UserManagementSection authToken={authToken} />;
            case 'Security & Audit':
                return <SecurityAuditSection authToken={authToken} />;
            case 'Tender Management':
                return <TenderManagementSection authToken={authToken} />;
            case 'Supplier Management':
                return <SupplierManagementSection authToken={authToken} />;
            case 'Milestone Management':
                return <MilestoneManagementSection authToken={authToken} />;
            case 'System Settings':
                return <SystemSettingsSection authToken={authToken} />;
            default:
                return <div>Select a section</div>;
        }
    };

    return (
        <div className="flex h-screen bg-lightBg dark:bg-gray-900 font-sans">
            <AdminSidebar 
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
                onLogout={handleLogout}
                isCollapsed={isSidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminTopbar activeSection={activeSection} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    {renderSection()}
                </main>
            </div>
        </div>
    );
};

export default AdminPage;
