
// FIX: Moved React import to the top of the file before other imports. This ensures that the base JSX namespace is established before any augmentations, resolving errors where standard HTML elements were not recognized in JSX.
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../../types';
import { AdminPanelSection, User } from '../../types';
import ToggleSwitch from './ui/ToggleSwitch';
import { useAuth } from '../../hooks/useAuth';

interface AdminHeaderProps {
    section: AdminPanelSection;
    user: User | null;
    onNavigate: (section: AdminPanelSection) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ section, user, onNavigate }) => {
    const [previewMode, setPreviewMode] = React.useState(false);
    const [isProfileOpen, setProfileOpen] = React.useState(false);
    const [isQuickAddOpen, setQuickAddOpen] = React.useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = React.useState(false);
    const { logout } = useAuth();

    // Mock Notifications
    const notifications = [
        { id: 1, title: 'New User Registration', time: '5 min ago', unread: true },
        { id: 2, title: 'Server Backup Completed', time: '1 hr ago', unread: true },
        { id: 3, title: 'Vacancy "Engineer" expiring soon', time: '2 hrs ago', unread: false },
    ];

    return (
        <header className="flex-shrink-0 bg-white h-16 flex items-center justify-between px-6 border-b border-gray-200 relative z-30">
            {/* Breadcrumbs */}
            <div className="text-sm font-roboto-condensed admin-breadcrumb">
                <span className="text-gray-500">Admin Panel</span>
                <span className="font-semibold text-brand-blue-900">{section}</span>
            </div>
            
            <div className="flex items-center space-x-4">
                {/* Preview Mode Toggle */}
                <div className="hidden md:flex items-center space-x-2">
                    <span className={`text-xs font-bold transition-colors ${previewMode ? 'text-brand-blue-600' : 'text-gray-500'}`}>Preview Mode</span>
                    <ToggleSwitch enabled={previewMode} setEnabled={setPreviewMode} />
                </div>
                 <div className="w-px h-6 bg-gray-200"></div>

                {/* Quick Add Button */}
                <div className="relative">
                    <button 
                        onClick={() => { setQuickAddOpen(!isQuickAddOpen); setNotificationsOpen(false); setProfileOpen(false); }}
                        className="hidden sm:flex items-center space-x-2 bg-brand-blue-500 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-brand-blue-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        <span>Quick Add</span>
                    </button>
                    {isQuickAddOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 animate-fade-down border border-gray-100">
                            <h4 className="px-4 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">Corporate Content</h4>
                            <button onClick={() => { onNavigate('Home Management'); setQuickAddOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home Page Config</button>
                            <button onClick={() => { onNavigate('About Management'); setQuickAddOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About Us Content</button>
                            <button onClick={() => { onNavigate('Contact Management'); setQuickAddOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact Details</button>
                            
                            <h4 className="px-4 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mt-2 mb-1">Data Entry</h4>
                            <button onClick={() => { onNavigate('News Management'); setQuickAddOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">News Article</button>
                            <button onClick={() => { onNavigate('User Management'); setQuickAddOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">User / Admin</button>
                            <button onClick={() => { onNavigate('Media Manager'); setQuickAddOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Media Upload</button>
                            <button onClick={() => { onNavigate('Vacancy Management'); setQuickAddOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Job Vacancy</button>
                        </div>
                    )}
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button 
                        onClick={() => { setNotificationsOpen(!isNotificationsOpen); setQuickAddOpen(false); setProfileOpen(false); }}
                        className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-brand-blue-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                    </button>
                    {isNotificationsOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-xl py-2 z-50 animate-fade-down border border-gray-100 ring-1 ring-black ring-opacity-5">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <h3 className="text-sm font-bold text-gray-700">Notifications</h3>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {notifications.map(note => (
                                    <div key={note.id} className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer ${note.unread ? 'bg-blue-50/50' : ''}`}>
                                        <p className={`text-sm text-gray-800 ${note.unread ? 'font-semibold' : ''}`}>{note.title}</p>
                                        <p className="text-xs text-gray-500 mt-1">{note.time}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-2 border-t border-gray-100 text-center">
                                <button className="text-xs text-brand-blue-500 font-bold hover:underline">Mark all as read</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Profile */}
                <div className="relative">
                    <button onClick={() => { setProfileOpen(!isProfileOpen); setNotificationsOpen(false); setQuickAddOpen(false); }} className="flex items-center space-x-2">
                        <img className="h-8 w-8 rounded-full object-cover" src={user?.avatarUrl || 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150'} alt="User avatar" />
                        <span className="hidden md:inline text-sm font-semibold text-gray-900">{user?.name || 'Admin'}</span>
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {isProfileOpen && (
                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fade-down border border-gray-100">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
