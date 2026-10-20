
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../../types';
import { AdminPanelSection } from '../../types';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
// FIX: Corrected import as AdminDashboard has a default export now.
import AdminDashboard from '../../components/admin/AdminDashboard';
import PageEditor from '../../components/admin/pages/PageEditor';
import NewsManagement from '../../components/admin/pages/NewsManagement';
import IndustryManagement from '../../components/admin/pages/IndustryManagement';
import VacancyManagement from '../../components/admin/pages/VacancyManagement';
import MediaManager from '../../components/admin/pages/MediaManager';
import InquiryManagement from '../../components/admin/pages/InquiryManagement';
import UserManagement from '../../components/admin/pages/UserManagement';
import SecurityLogs from '../../components/admin/pages/SecurityLogs';
import SystemSettings from '../../components/admin/pages/SystemSettings';
import TenderManagement from '../../components/admin/pages/TenderManagement';
import SupplierManagement from '../../components/admin/pages/SupplierManagement';
import HomeManagement from '../../components/admin/pages/HomeManagement';
import ContactManagement from '../../components/admin/pages/ContactManagement';
import AboutManagement from '../../components/admin/pages/AboutManagement';
import { useAuth } from '../../hooks/useAuth';

const AdminPage: React.FC = () => {
    const [activeSection, setActiveSection] = React.useState<AdminPanelSection>('Dashboard');
    const [isSidebarCollapsed, setSidebarCollapsed] = React.useState(false);
    const { user } = useAuth();

    const renderSection = () => {
        switch (activeSection) {
            case 'Dashboard':
                // Pass navigation handler to Dashboard for Quick Actions
                return <AdminDashboard onNavigate={setActiveSection} />;
            case 'Home Management':
                return <HomeManagement />;
            case 'Contact Management':
                return <ContactManagement />;
            case 'About Management':
                return <AboutManagement />;
            case 'Pages Editor':
                return <PageEditor />;
            case 'News Management':
                return <NewsManagement />;
            case 'Industry Management':
                return <IndustryManagement />;
            case 'Vacancy Management':
                return <VacancyManagement />;
            case 'Tender Management':
                return <TenderManagement />;
            case 'Supplier Management':
                return <SupplierManagement />;
            case 'Media Manager':
                return <MediaManager />;
            case 'Inquiry Management':
                return <InquiryManagement />;
            case 'User Management':
                return <UserManagement />;
            case 'Security':
                return <SecurityLogs />;
            case 'System Settings':
                return <SystemSettings />;
            default:
                return <div className="text-gray-800 p-8">Section not yet implemented.</div>;
        }
    };

    return (
        <div className="flex min-h-screen text-[#1E2B2B] font-roboto">
            <AdminSidebar 
                isCollapsed={isSidebarCollapsed} 
                setIsCollapsed={setSidebarCollapsed}
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
            />
            <div className={`relative flex-1 flex flex-col sidebar-transition ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
                <AdminHeader 
                    section={activeSection}
                    user={user}
                    onNavigate={setActiveSection}
                />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto admin-scrollbar">
                    {renderSection()}
                </main>
            </div>
        </div>
    );
};

export default AdminPage;
