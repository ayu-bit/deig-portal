
// FIX: Moved React import to the top of the file before other imports. This ensures that the base JSX namespace is established before any augmentations, resolving errors where standard HTML elements were not recognized in JSX.
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../../../../types';
import { getUsers, inviteUser, updateUser } from '../../../../services/api';
import Table from '../../ui/Table';
import Button from '../../ui/Button';
import type { User } from '../../../../types';
import { useToast } from '../../../../contexts/ToastContext';

const UserFormModal: React.FC<{
    user: Partial<User> | null;
    onClose: () => void;
    onSave: (user: Partial<User>) => void;
}> = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = React.useState(user || {});
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="bg-white rounded-lg w-full max-w-lg shadow-xl">
                <div className="p-6 border-b bg-gray-50 rounded-t-lg"><h3 className="text-xl font-bold font-montserrat text-[#1E2B2B]">{user?.id ? 'Edit' : 'Invite'} User</h3></div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input name="name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB] focus:border-[#1075BB]" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" name="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email Address" className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB] focus:border-[#1075BB]" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select name="role" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value as any})} className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB] focus:border-[#1075BB]" required>
                            <option value="">Select Role</option>
                            <option>Admin</option><option>Editor</option><option>HR Manager</option><option>Industry Manager</option><option>Viewer</option>
                        </select>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 flex justify-end gap-2 rounded-b-lg border-t border-gray-200">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="primary">Save User</Button>
                </div>
            </form>
        </div>
    );
};

const UserStatusTag: React.FC<{ status: 'Active' | 'Inactive' }> = ({ status }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'Active' ? 'bg-[#1075BB] text-white' : 'bg-gray-100 text-gray-800'
    }`}>
        {status}
    </span>
);

const UserAvatar: React.FC<{ name: string; url?: string }> = ({ name, url }) => {
    const [imgError, setImgError] = React.useState(false);
    
    // Determine initials
    const initials = React.useMemo(() => {
        return name
            ? name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
            : 'U';
    }, [name]);

    if (url && !imgError) {
        return (
            <img 
                className="h-10 w-10 rounded-full object-cover border border-gray-200 bg-white" 
                src={url} 
                alt={name} 
                onError={() => setImgError(true)} 
            />
        );
    }

    return (
        <div className="h-10 w-10 rounded-full bg-[#1075BB] flex items-center justify-center text-white font-bold text-sm border border-[#0E62A1] shadow-sm">
            {initials}
        </div>
    );
};

const UserList: React.FC = () => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState<Partial<User> | null>(null);
    const { addToast } = useToast();

    const fetchUsers = React.useCallback(async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            addToast('Failed to load users.', 'error');
        }
    }, [addToast]);

    React.useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSave = async (user: Partial<User>) => {
        try {
            if (user.id) {
                await updateUser(user.id, user);
                addToast('User updated successfully', 'success');
            } else {
                await inviteUser({ ...user, password: 'password123' }); // Default password
                addToast('User invited successfully', 'success');
            }
            fetchUsers();
            setIsModalOpen(false);
        } catch (error) {
            addToast('Failed to save user.', 'error');
        }
    };

    const handleOpenModal = (user?: User) => {
        setEditingUser(user || {});
        setIsModalOpen(true);
    };

    const handleExportCSV = () => {
        if (!users.length) {
            addToast('No users to export.', 'error');
            return;
        }

        const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Last Login'];
        const csvContent = [
            headers.join(','),
            ...users.map(u => {
                const lastLogin = u.lastLogin ? new Date(u.lastLogin).toISOString() : 'Never';
                return `${u.id},"${u.name}",${u.email},${u.role},${u.status},${lastLogin}`;
            })
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `deig_users_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        addToast('Users exported successfully.', 'success');
    };

    const tableHeaders = ['Name', 'Role', 'Status', 'Last Login', 'Actions'];

    return (
        <div>
            {isModalOpen && <UserFormModal user={editingUser} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-lg text-[#1E2B2B] font-montserrat font-bold">User Directory</h3>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="secondary" onClick={handleExportCSV} className="whitespace-nowrap flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Export CSV
                    </Button>
                    <Button variant="primary" onClick={() => handleOpenModal()} className="whitespace-nowrap flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Invite User
                    </Button>
                </div>
            </div>
            <Table headers={tableHeaders}>
                {users.length === 0 ? (
                    <tr><td colSpan={5} className="text-center p-8 text-gray-500">No users found.</td></tr>
                ) : (
                    users.map(user => (
                        <tr key={user.id} className="odd:bg-white even:bg-[#F0F7FC] hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <UserAvatar name={user.name} url={user.avatarUrl} />
                                    <div className="ml-4">
                                        <div className="font-semibold text-[#1E2B2B]">{user.name}</div>
                                        <div className="text-xs text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <UserStatusTag status={user.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm font-mono">
                                {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end space-x-2">
                                    <Button variant="icon" size="sm" title="Edit User" onClick={() => handleOpenModal(user)}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    </Button>
                                    <Button variant="icon" size="sm" title="Reset Password">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a4 4 0 11-8 0 4 4 0 018 0zM9 15h6"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v-4"></path></svg>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </Table>
        </div>
    );
};

export default UserList;
