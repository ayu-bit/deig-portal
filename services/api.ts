
/// <reference types="vite/client" />
import type { NewsArticle, Vacancy, Tender, Industry, Page, Applicant, MediaAsset, ContactInquiry, User, UserRolePermissions, SecurityLog, ActiveSession, ApplicantStatus, InquiryStatus, Supplier, SupplierStatus } from '../types';
import { INDUSTRIES, NEWS_ARTICLES, VACANCIES, TENDERS, PAGES, MEDIA_ASSETS, CONTACT_INQUIRIES, USERS, ROLES, SECURITY_LOGS, ACTIVE_SESSIONS } from '../constants';

const getApiBaseUrl = () => {
    // Always use /api for the full-stack setup in this environment to ensure requests go to port 3000
    return '/api';
};

const API_BASE_URL = getApiBaseUrl();

// --- MOCK DATABASE STATE (PERSISTENT) ---
const loadFromStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const stored = localStorage.getItem(key);
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error(`Failed to parse local ${key}`, e);
    }
    return defaultValue;
};

// Initial Load
let LOCAL_APPLICANTS: Applicant[] = loadFromStorage('deig_applicants', []);
let LOCAL_SUPPLIERS: Supplier[] = loadFromStorage('deig_suppliers', []);
let LOCAL_INQUIRIES: ContactInquiry[] = loadFromStorage('deig_inquiries', CONTACT_INQUIRIES);
const LOCAL_INDUSTRIES: Industry[] = loadFromStorage('deig_industries', [...INDUSTRIES]);
let LOCAL_TENDERS: Tender[] = loadFromStorage('deig_tenders', [...TENDERS]);
let LOCAL_NEWS: NewsArticle[] = loadFromStorage('deig_news', [...NEWS_ARTICLES]);
let LOCAL_SETTINGS: any = loadFromStorage('deig_settings', {
    siteTitle: 'DEIG - Defense Industry Engineering Group',
    contactEmail: 'contact@deig.gov.et',
    hrEmail: 'hr@deig.gov.et',
    logoUrl: '/images/deiglogo.png',
    expiryDate: '2026-12-31', // Future date by default
    systemStatus: 'Active' as 'Active' | 'Suspended' | 'Expired',
    homeHero: {
        title: 'Engineering Excellence for National Defense',
        subtitle: "DEIG is Ethiopia's leading force in defense technology, innovation, and engineering excellence, driving national self-reliance and industrial modernization.",
        videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4',
        exploreButtonText: 'Explore Our Industries',
        aboutButtonText: 'About DEIG'
    },
    homeStats: [
        { label: 'Employees', value: 5000, suffix: '+' },
        { label: 'Production Units', value: 12, suffix: '' },
        { label: 'Years of Experience', value: 13, suffix: '' },
        { label: 'Patents', value: 25, suffix: '+' }
    ],
    contactInfo: {
        addressLabel: 'Headquarters Address',
        addressValue: 'African Avenue, Bole District, Addis Ababa, Ethiopia',
        phoneLabel: 'Emergency/Support Hotline',
        phoneValue: '+251 11 200 1000',
        emailLabel: 'General Correspondence',
        emailValue: 'info@deig.gov.et',
        hqLocationTitle: 'DEIG Headquarters & Strategic Command'
    },
    whoWeAre: {
        title: 'Who We Are',
        content: 'Defense Industry Engineering Group (DEIG) is a premier state-owned enterprise dedicated to the development, manufacturing, and maintenance of defense systems and dual-use technologies. Our mission is to ensure national security through engineering excellence and technological sovereignty.',
        imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    aboutInfo: {
        heroTitle: 'Our Strategic Legacy',
        heroSubtitle: 'Driving Ethiopia\'s Industrial Innovation since 2011',
        heroImageUrl: 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        introTitle: 'Engineering Sovereignty & National Strength',
        introP1: 'Defense Industry Engineering Group (DEIG) stands as the cornerstone of our nation\'s industrial-military complex. We are committed to developing homegrown technological solutions that ensure our strategic independence.',
        introP2: 'With over a decade of dedicated service, we have expanded our reach across multiple industrial sectors, from aerospace and naval engineering to advanced electronics and naval systems.',
        introImageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
});

const saveToStorage = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Failed to save ${key} to localStorage`, e);
    }
};

// --- API HELPER ---
const normalizeUrl = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('data:')) return url; // Base64
    
    // Get the base without trailing /api or /
    const base = API_BASE_URL.replace(/\/api\/?$/, '').replace(/\/+$/, '');
    
    // Normalize localhost/127.0.0.1 URLs
    if (url.includes('localhost:5001') || url.includes('127.0.0.1:5001')) {
        if (!window.location.hostname.includes('localhost')) {
            // Replace localhost:5001 with current base
            // Handle both /uploads and /api/uploads
            let normalized = url.replace(/http:\/\/(localhost|127\.0\.0\.1):5001(\/api)?\/uploads/g, `${base}/api/uploads`);
            normalized = normalized.replace(/http:\/\/(localhost|127\.0\.0\.1):5001/g, base);
            return normalized;
        }
        return url;
    }
    
    if (url.startsWith('http')) {
        return url;
    }
    
    // Relative URL handles
    if (url.startsWith('/api/')) {
        return `${base}${url}`;
    }
    
    if (url.startsWith('uploads/')) {
        return `${base}/api/${url}`;
    }

    if (url.startsWith('/uploads/')) {
        return `${base}/api${url}`;
    }

    // Default case for anything else relative
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${base}${path}`;
};

const apiHelper = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('deig-admin-token');
    const headers = { ...options.headers };

    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData)) {
        (headers as Record<string, string>)['Content-Type'] = 'application/json';
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); 
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (response.status === 401) {
            localStorage.removeItem('deig-admin-token');
            localStorage.removeItem('deig-admin-user');
            if (window.location.hash.includes('admin')) {
                window.location.href = '/#/login';
            }
            throw new Error('Session expired. Please login again.');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
            throw new Error(errorData.message || `API error: ${response.statusText}`);
        }

        if (response.status === 204) return null;
        return response.json();
    } catch (error: any) {
        console.warn(`API Call Failed to ${API_BASE_URL}${endpoint}.`, error);
        throw error;
    }
};

// --- AUTH ---
export const login = async (email: string, password: string): Promise<any> => {
    try {
        return await apiHelper('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    } catch (error) {
        console.warn('Backend login failed, using mock fallback for defaults', error);
        // Fallback for demo/preview if backend is unavailable or database connection failed
        if (email === 'admin@deig.gov.et' && password === 'password123') {
            return {
                token: 'mock-token-' + Date.now(),
                user: {
                    id: '1',
                    name: 'Admin User',
                    email: 'admin@deig.gov.et',
                    role: 'Admin',
                    avatarUrl: 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg'
                }
            };
        }
        throw error;
    }
};

// --- DASHBOARD ---
export const getDashboardStats = async (): Promise<any> => {
    try { return await apiHelper('/dashboard/stats'); } 
    catch (e) {
        return {
            activeUsers: USERS.length,
            openVacancies: VACANCIES.length,
            pendingApplications: LOCAL_APPLICANTS.length,
            visitors: 12500,
            unreadMessages: LOCAL_INQUIRIES.filter(i => i.status === 'Unread').length,
            recentActivity: []
        };
    }
};

// --- PAGES ---
export const getPages = async (): Promise<Page[]> => {
    try { return await apiHelper('/pages'); } catch (e) { 
        return loadFromStorage('deig_pages', PAGES); 
    }
};
export const createPage = async (pageData: Partial<Page>): Promise<Page> => {
    try {
        return await apiHelper('/pages', { method: 'POST', body: JSON.stringify(pageData) });
    } catch (e) {
        const pages = loadFromStorage('deig_pages', PAGES);
        const newPage = { ...pageData, id: `PAGE-LOCAL-${Date.now()}`, lastEdited: new Date().toISOString() } as Page;
        saveToStorage('deig_pages', [newPage, ...pages]);
        return newPage;
    }
};
export const updatePage = async (id: string, pageData: Partial<Page>): Promise<Page> => {
    try {
        return await apiHelper(`/pages/${id}`, { method: 'PUT', body: JSON.stringify(pageData) });
    } catch (e) {
        const pages = loadFromStorage('deig_pages', PAGES);
        const updated = pages.map(p => p.id === id ? { ...p, ...pageData, lastEdited: new Date().toISOString() } : p);
        saveToStorage('deig_pages', updated);
        return updated.find(p => p.id === id)!;
    }
};
export const deletePage = (id: string): Promise<null> => apiHelper(`/pages/${id}`, { method: 'DELETE' });

// --- SUPPLIERS ---
export const getSuppliers = async (): Promise<Supplier[]> => {
    try { return await apiHelper('/suppliers'); } catch (e) { return LOCAL_SUPPLIERS; }
};
export const createSupplier = async (formData: FormData): Promise<Supplier> => {
    try {
        return await apiHelper('/suppliers', { method: 'POST', body: formData });
    } catch (e) {
        const newSupplier: Supplier = {
            id: `SUP-LOCAL-${Date.now()}`,
            companyName: formData.get('companyName') as string || 'Unknown Entity',
            regNumber: formData.get('regNumber') as string || '',
            address: formData.get('address') as string || '',
            country: formData.get('country') as string || '',
            website: formData.get('website') as string || '',
            contactName: formData.get('contactName') as string || '',
            contactTitle: formData.get('contactTitle') as string || '',
            contactEmail: formData.get('contactEmail') as string || '',
            contactPhone: formData.get('contactPhone') as string || '',
            services: formData.get('services') as string || '',
            status: 'Pending',
            registeredAt: new Date().toISOString()
        };
        LOCAL_SUPPLIERS = [newSupplier, ...LOCAL_SUPPLIERS];
        saveToStorage('deig_suppliers', LOCAL_SUPPLIERS);
        return newSupplier;
    }
};
export const updateSupplierStatus = async (id: string, status: SupplierStatus): Promise<Supplier> => {
    try {
        return await apiHelper(`/suppliers/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
    } catch (e) {
        LOCAL_SUPPLIERS = LOCAL_SUPPLIERS.map(s => s.id === id ? { ...s, status } : s);
        saveToStorage('deig_suppliers', LOCAL_SUPPLIERS);
        return LOCAL_SUPPLIERS.find(s => s.id === id)!;
    }
};

// --- NEWS ---
export const getNews = async (): Promise<NewsArticle[]> => {
    try { 
        const data = await apiHelper('/news'); 
        return data.map((a: any) => ({ ...a, imageUrl: normalizeUrl(a.imageUrl) }));
    } catch (e) { return LOCAL_NEWS; }
};
export const getNewsById = async (id: string): Promise<NewsArticle> => {
    try { 
        const data = await apiHelper(`/news/${id}`); 
        return { ...data, imageUrl: normalizeUrl(data.imageUrl) };
    } catch (e) {
        const article = LOCAL_NEWS.find(a => a.id.toString() === id);
        if (!article) throw new Error('Article not found');
        return article;
    }
};
export const createNews = async (newsData: Partial<NewsArticle>): Promise<NewsArticle> => {
    try {
        const data = await apiHelper('/news', { method: 'POST', body: JSON.stringify(newsData) });
        return { ...data, imageUrl: normalizeUrl(data.imageUrl) };
    } catch (e) {
        const newArticle = { 
            ...newsData, 
            id: Date.now(), 
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            status: newsData.status || 'Published'
        } as NewsArticle;
        LOCAL_NEWS = [newArticle, ...LOCAL_NEWS];
        saveToStorage('deig_news', LOCAL_NEWS);
        return newArticle;
    }
};
export const updateNews = async (id: string, newsData: Partial<NewsArticle>): Promise<NewsArticle> => {
    try {
        const data = await apiHelper(`/news/${id}`, { method: 'PUT', body: JSON.stringify(newsData) });
        return { ...data, imageUrl: normalizeUrl(data.imageUrl) };
    } catch (e) {
        LOCAL_NEWS = LOCAL_NEWS.map(a => a.id.toString() === id ? { ...a, ...newsData } : a);
        saveToStorage('deig_news', LOCAL_NEWS);
        return LOCAL_NEWS.find(a => a.id.toString() === id)!;
    }
};
export const deleteNews = async (id: string): Promise<null> => {
    try {
        return await apiHelper(`/news/${id}`, { method: 'DELETE' });
    } catch (e) {
        LOCAL_NEWS = LOCAL_NEWS.filter(a => a.id.toString() !== id);
        saveToStorage('deig_news', LOCAL_NEWS);
        return null;
    }
};

// --- INDUSTRIES ---
export const getIndustries = async (): Promise<Industry[]> => {
    try { 
        const data = await apiHelper('/industries'); 
        return data.map((ind: any) => ({
            ...ind,
            gallery: (ind.gallery || []).map((img: string) => normalizeUrl(img)),
            products: (ind.products || []).map((p: any) => ({ ...p, imageUrl: normalizeUrl(p.imageUrl) }))
        }));
    } catch (e) { return LOCAL_INDUSTRIES; }
};
export const getIndustryById = async (id: string): Promise<Industry> => {
    try { 
        const data = await apiHelper(`/industries/${id}`); 
        return {
            ...data,
            gallery: (data.gallery || []).map((img: string) => normalizeUrl(img)),
            products: (data.products || []).map((p: any) => ({ ...p, imageUrl: normalizeUrl(p.imageUrl) }))
        };
    } catch (e) {
        const ind = LOCAL_INDUSTRIES.find(i => i.id === id);
        if (!ind) throw new Error('Industry not found');
        return ind;
    }
};
export const createIndustry = (industryData: Partial<Industry>): Promise<Industry> => apiHelper('/industries', { method: 'POST', body: JSON.stringify(industryData) });
export const updateIndustry = (id: string, industryData: Partial<Industry>): Promise<Industry> => apiHelper(`/industries/${id}`, { method: 'PUT', body: JSON.stringify(industryData) });
export const deleteIndustry = async (id: string): Promise<null> => {
    try {
        return await apiHelper(`/industries/${id}`, { method: 'DELETE' });
    } catch (e) {
        // Mock delete
        const industries = loadFromStorage('deig_industries', [...INDUSTRIES]);
        const filtered = industries.filter(i => i.id !== id);
        saveToStorage('deig_industries', filtered);
        return null;
    }
};

// --- VACANCIES ---
export const getVacancies = async (): Promise<Vacancy[]> => {
    try { return await apiHelper('/vacancies'); } catch (e) { return VACANCIES; }
};
export const createVacancy = (vacancyData: Partial<Vacancy>): Promise<Vacancy> => apiHelper('/vacancies', { method: 'POST', body: JSON.stringify(vacancyData) });
export const updateVacancy = (id: string, vacancyData: Partial<Vacancy>): Promise<Vacancy> => apiHelper(`/vacancies/${id}`, { method: 'PUT', body: JSON.stringify(vacancyData) });
export const deleteVacancy = (id: string): Promise<null> => apiHelper(`/vacancies/${id}`, { method: 'DELETE' });

// --- APPLICANTS ---
export const getApplicantsByVacancy = async (vacancyId: string): Promise<Applicant[]> => {
    try { return await apiHelper(`/applicants/vacancy/${vacancyId}`); } 
    catch (e) { return LOCAL_APPLICANTS.filter(app => app.vacancyId === vacancyId); }
};
export const createApplicant = async (formData: FormData): Promise<Applicant> => {
    try {
        return await apiHelper('/applicants', { method: 'POST', body: formData });
    } catch (e) {
        const newApp: Applicant = {
            id: `APP-LOCAL-${Date.now()}`,
            name: formData.get('name') as string || 'Anonymous',
            email: formData.get('email') as string || '',
            appliedDate: new Date().toISOString(),
            vacancyId: formData.get('vacancyId') as string || 'unknown',
            status: 'New',
            cvUrl: '#',
            rating: 0
        };
        LOCAL_APPLICANTS = [newApp, ...LOCAL_APPLICANTS];
        saveToStorage('deig_applicants', LOCAL_APPLICANTS);
        return newApp;
    }
};
export const updateApplicantStatus = async (id: string, status: ApplicantStatus): Promise<Applicant> => {
    try {
        return await apiHelper(`/applicants/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
    } catch (e) {
        LOCAL_APPLICANTS = LOCAL_APPLICANTS.map(app => app.id === id ? { ...app, status } : app);
        saveToStorage('deig_applicants', LOCAL_APPLICANTS);
        return LOCAL_APPLICANTS.find(app => app.id === id)!;
    }
};

// --- MEDIA ---
export const getMedia = async (): Promise<MediaAsset[]> => {
    try { 
        const data = await apiHelper('/media'); 
        return data.map((m: any) => ({ ...m, url: normalizeUrl(m.url), thumbnailUrl: normalizeUrl(m.thumbnailUrl || m.url) }));
    } catch (e) { return MEDIA_ASSETS; }
};
export const uploadMedia = async (formData: FormData): Promise<MediaAsset> => {
    try {
        const data = await apiHelper('/media', { method: 'POST', body: formData });
        return { ...data, url: normalizeUrl(data.url), thumbnailUrl: normalizeUrl(data.thumbnailUrl || data.url) };
    } catch (e) {
        // Mock upload for demo/offline mode
        const file = formData.get('file') as File;
        
        if (file) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    resolve({
                        id: `MED-LOCAL-${Date.now()}`,
                        name: file.name || 'uploaded-image.jpg',
                        type: 'Image',
                        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                        url: base64String,
                        thumbnailUrl: base64String,
                        uploadedBy: 'Admin',
                        uploadedAt: new Date().toISOString().split('T')[0],
                        usage: []
                    });
                };
                reader.readAsDataURL(file);
            });
        }

        const defaultUrl = 'https://images.pexels.com/photos/1637436/pexels-photo-1637436.jpeg';
        return {
            id: `MED-LOCAL-${Date.now()}`,
            name: 'uploaded-image.jpg',
            type: 'Image',
            size: '0 MB',
            url: defaultUrl,
            thumbnailUrl: defaultUrl,
            uploadedBy: 'Admin',
            uploadedAt: new Date().toISOString().split('T')[0],
            usage: []
        };
    }
};
export const deleteMedia = (ids: string[]): Promise<null> => apiHelper('/media', { method: 'DELETE', body: JSON.stringify({ ids }) });

// --- INQUIRIES ---
export const getInquiries = async (): Promise<ContactInquiry[]> => {
    try { return await apiHelper('/inquiries'); } catch (e) { return LOCAL_INQUIRIES; }
};
export const createInquiry = async (inquiryData: Partial<ContactInquiry>): Promise<ContactInquiry> => {
    try {
        return await apiHelper('/inquiries', { method: 'POST', body: JSON.stringify(inquiryData) });
    } catch (e) {
        const newInq: ContactInquiry = {
            id: `INQ-LOCAL-${Date.now()}`,
            name: inquiryData.name || 'Anonymous',
            email: inquiryData.email || '',
            subject: inquiryData.subject || 'General Inquiry',
            message: inquiryData.message || '',
            status: 'Unread',
            receivedAt: new Date().toISOString()
        };
        LOCAL_INQUIRIES = [newInq, ...LOCAL_INQUIRIES];
        saveToStorage('deig_inquiries', LOCAL_INQUIRIES);
        return newInq;
    }
};
export const updateInquiry = async (id: string, inquiryData: { status: InquiryStatus }): Promise<ContactInquiry> => {
    try {
        return await apiHelper(`/inquiries/${id}`, { method: 'PUT', body: JSON.stringify(inquiryData) });
    } catch (e) {
        LOCAL_INQUIRIES = LOCAL_INQUIRIES.map(i => i.id === id ? { ...i, ...inquiryData } : i);
        saveToStorage('deig_inquiries', LOCAL_INQUIRIES);
        return LOCAL_INQUIRIES.find(i => i.id === id)!;
    }
};
export const deleteInquiry = async (id: string): Promise<null> => {
    try {
        return await apiHelper(`/inquiries/${id}`, { method: 'DELETE' });
    } catch (e) {
        LOCAL_INQUIRIES = LOCAL_INQUIRIES.filter(i => i.id !== id);
        saveToStorage('deig_inquiries', LOCAL_INQUIRIES);
        return null;
    }
};

// --- USERS ---
export const getUsers = async (): Promise<User[]> => {
    try { return await apiHelper('/users'); } catch (e) { return USERS; }
};
export const inviteUser = (userData: Partial<User>): Promise<User> => apiHelper('/users', { method: 'POST', body: JSON.stringify(userData) });
export const updateUser = (id: string, userData: Partial<User>): Promise<User> => apiHelper(`/users/${id}`, { method: 'PUT', body: JSON.stringify(userData) });
export const deleteUser = (id: string): Promise<null> => apiHelper(`/users/${id}`, { method: 'DELETE' });

// --- ROLES ---
export const getRoles = async (): Promise<UserRolePermissions[]> => {
    try { return await apiHelper('/roles'); } catch (e) { return ROLES; }
};
export const updateRole = (id: string, roleData: Partial<UserRolePermissions>): Promise<UserRolePermissions> => apiHelper(`/roles/${id}`, { method: 'PUT', body: JSON.stringify(roleData) });

// --- SECURITY ---
export const getSecurityLogs = async (): Promise<SecurityLog[]> => {
    try { return await apiHelper('/security/logs'); } catch (e) { return SECURITY_LOGS; }
};
export const getActiveSessions = async (): Promise<ActiveSession[]> => {
    try { return await apiHelper('/security/sessions'); } catch (e) { return ACTIVE_SESSIONS; }
};
export const revokeSession = (id: string): Promise<null> => apiHelper(`/security/sessions/${id}`, { method: 'DELETE' });

// --- SETTINGS ---
export const getSettings = async (): Promise<any> => {
    try { 
        const data = await apiHelper('/settings'); 
        return { ...data, logoUrl: normalizeUrl(data.logoUrl) };
    } catch (e) { 
        // Merge defaults to ensure new sections exist even if storage is old
        const settings = { ...LOCAL_SETTINGS };
        if (!settings.aboutInfo) {
            settings.aboutInfo = {
                heroTitle: 'Our Strategic Legacy',
                heroSubtitle: 'Driving Ethiopia\'s Industrial Innovation since 2011',
                heroImageUrl: 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                introTitle: 'Engineering Sovereignty & National Strength',
                introP1: 'Defense Industry Engineering Group (DEIG) stands as the cornerstone of our nation\'s industrial-military complex. We are committed to developing homegrown technological solutions that ensure our strategic independence.',
                introP2: 'With over a decade of dedicated service, we have expanded our reach across multiple industrial sectors, from aerospace and naval engineering to advanced electronics and naval systems.',
                introImageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            };
        }
        return settings; 
    }
};
export const updateSettings = async (settingsData: any): Promise<any> => {
    try {
        const data = await apiHelper('/settings', { method: 'PUT', body: JSON.stringify(settingsData) });
        return { ...data, logoUrl: normalizeUrl(data.logoUrl) };
    } catch (e) {
        LOCAL_SETTINGS = { ...LOCAL_SETTINGS, ...settingsData };
        saveToStorage('deig_settings', LOCAL_SETTINGS);
        return LOCAL_SETTINGS;
    }
};
export const getTenders = async (): Promise<Tender[]> => {
    try { return await apiHelper('/tenders'); } catch (e) { return LOCAL_TENDERS; }
};
export const createTender = async (data: Partial<Tender>): Promise<Tender> => {
    try {
        return await apiHelper('/tenders', { method: 'POST', body: JSON.stringify(data) });
    } catch (e) {
        const newTender = { ...data, id: `TEN-LOCAL-${Date.now()}` } as Tender;
        LOCAL_TENDERS = [newTender, ...LOCAL_TENDERS];
        saveToStorage('deig_tenders', LOCAL_TENDERS);
        return newTender;
    }
};
export const updateTender = async (id: string, data: Partial<Tender>): Promise<Tender> => {
    try {
        return await apiHelper(`/tenders/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    } catch (e) {
        LOCAL_TENDERS = LOCAL_TENDERS.map(t => t.id === id ? { ...t, ...data } : t);
        saveToStorage('deig_tenders', LOCAL_TENDERS);
        return LOCAL_TENDERS.find(t => t.id === id)!;
    }
};
export const deleteTender = async (id: string): Promise<null> => {
    try {
        return await apiHelper(`/tenders/${id}`, { method: 'DELETE' });
    } catch (e) {
        LOCAL_TENDERS = LOCAL_TENDERS.filter(t => t.id !== id);
        saveToStorage('deig_tenders', LOCAL_TENDERS);
        return null;
    }
};
