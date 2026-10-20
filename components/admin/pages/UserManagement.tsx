
// FIX: Reordered imports to ensure global JSX namespace augmentation from `types.ts` is applied before React is imported. This resolves errors where standard HTML elements were not recognized in JSX.
import '../../../types';
import * as React from 'react';
import Card from '../ui/Card';
import UserList from './users/UserList';
import RoleManagement from './users/RoleManagement';

type ActiveTab = 'users' | 'roles';

const UserManagement: React.FC = () => {
    // FIX: `useState` must be prefixed with `React.` because React was imported as a namespace.
    const [activeTab, setActiveTab] = React.useState<ActiveTab>('users');

    return (
        <Card bodyClassName="!p-0">
            <div className="px-6">
                <div className="flex border-b border-[#B3D6F0]">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-4 py-3 text-sm font-semibold transition-colors ${
                            activeTab === 'users' ? 'text-[#1075BB] border-b-2 border-[#1075BB]' : 'text-gray-500 hover:text-[#1E2B2B]'
                        }`}
                    >
                        Users
                    </button>
                    <button
                        onClick={() => setActiveTab('roles')}
                        className={`px-4 py-3 text-sm font-semibold transition-colors ${
                            activeTab === 'roles' ? 'text-[#1075BB] border-b-2 border-[#1075BB]' : 'text-gray-500 hover:text-[#1E2B2B]'
                        }`}
                    >
                        Roles & Permissions
                    </button>
                </div>
            </div>

            <div className="p-6">
                {activeTab === 'users' ? <UserList /> : <RoleManagement />}
            </div>
        </Card>
    );
};

export default UserManagement;
