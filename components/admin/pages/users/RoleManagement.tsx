
import * as React from 'react';
import '../../../../types';
import { getRoles, updateRole } from '../../../../services/api';
import type { UserRolePermissions, AdminPermission } from '../../../../types';
import { useToast } from '../../../../contexts/ToastContext';

const ALL_PERMISSIONS: AdminPermission[] = [
    'dashboard:view', 
    'pages:view', 'pages:create', 'pages:edit', 'pages:delete',
    'news:view', 'news:create', 'news:edit', 'news:delete',
    'industry:view', 'industry:edit',
    'vacancies:view', 'vacancies:create', 'vacancies:edit', 'vacancies:delete', 'vacancies:manage_applicants',
    'media:view', 'media:upload', 'media:delete',
    'inquiries:view', 'inquiries:reply', 'inquiries:manage',
    'users:view', 'users:invite', 'users:manage',
    'security:view', 'settings:view', 'settings:edit'
];

const PermissionMatrix: React.FC<{ roles: UserRolePermissions[], onToggle: (roleId: string, permission: AdminPermission) => void }> = ({ roles, onToggle }) => {
    // Group permissions by category for better UI
    const permissionGroups = React.useMemo(() => {
        const groups: Record<string, AdminPermission[]> = {};
        ALL_PERMISSIONS.forEach(p => {
            const category = p.split(':')[0];
            if (!groups[category]) groups[category] = [];
            groups[category].push(p);
        });
        return groups;
    }, []);

    return (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#1075BB]">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider w-1/4">Permission</th>
                        {roles.map(role => (
                            <th key={role.id} className="px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                                {role.id}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(permissionGroups).map(([category, perms]) => (
                        <React.Fragment key={category}>
                            <tr className="bg-gray-50">
                                <td colSpan={roles.length + 1} className="px-6 py-2 text-xs font-bold text-gray-500 uppercase bg-gray-100">
                                    {category.toUpperCase()} Management
                                </td>
                            </tr>
                            {(perms as AdminPermission[]).map(perm => (
                                <tr key={perm} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 text-sm font-medium text-gray-700">
                                        {perm.split(':')[1].replace('_', ' ')}
                                    </td>
                                    {roles.map(role => (
                                        <td key={`${role.id}-${perm}`} className="px-6 py-3 text-center">
                                            <input
                                                type="checkbox"
                                                checked={role.permissions.includes(perm)}
                                                onChange={() => onToggle(role.id, perm)}
                                                disabled={role.id === 'Admin'} // Prevent locking out admin
                                                className="h-4 w-4 text-[#1075BB] focus:ring-[#1075BB] border-gray-300 rounded cursor-pointer disabled:opacity-50"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const RoleManagement: React.FC = () => {
    const [roles, setRoles] = React.useState<UserRolePermissions[]>([]);
    const { addToast } = useToast();

    const fetchRoles = React.useCallback(async () => {
        try {
            const data = await getRoles();
            setRoles(data);
        } catch (error) {
            addToast('Failed to load roles.', 'error');
        }
    }, [addToast]);

    React.useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const handlePermissionToggle = async (roleId: string, permission: AdminPermission) => {
        const role = roles.find(r => r.id === roleId);
        if (!role) return;

        const newPermissions = role.permissions.includes(permission)
            ? role.permissions.filter(p => p !== permission)
            : [...role.permissions, permission];

        // Optimistic update
        setRoles(prev => prev.map(r => r.id === roleId ? { ...r, permissions: newPermissions } : r));

        try {
            await updateRole(roleId, { permissions: newPermissions });
            addToast('Permissions updated.', 'success');
        } catch (error) {
            addToast('Update failed.', 'error');
            fetchRoles(); // Revert on fail
        }
    };

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg text-[#04253D] font-montserrat font-bold">Role Matrix</h3>
                    <p className="text-sm text-gray-500">Manage access levels across the system.</p>
                </div>
            </div>
            
            <PermissionMatrix roles={roles} onToggle={handlePermissionToggle} />
        </div>
    );
};

export default RoleManagement;
