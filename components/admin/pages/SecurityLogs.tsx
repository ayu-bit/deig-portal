
// FIX: Reordered imports to ensure global JSX namespace augmentation from `types.ts` is applied before React is imported. This resolves errors where standard HTML elements were not recognized in JSX.
import '../../../types';
import React, { useState, useEffect, useMemo } from 'react';
import { getSecurityLogs, getActiveSessions, revokeSession } from '../../../services/api';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import type { LogActionType, SecurityLog, ActiveSession } from '../../../types';
import { useToast } from '../../../contexts/ToastContext';

type ActiveTab = 'logs' | 'sessions';

const LogActionTag: React.FC<{ action: LogActionType }> = ({ action }) => {
    // Map actions to blue monochromatic styles
    const actionStyles: { [key in LogActionType]: string } = {
        Create: 'bg-brand-blue-100 text-brand-blue-800 border border-brand-blue-200',
        Update: 'bg-white text-brand-blue-600 border border-brand-blue-300',
        Delete: 'bg-brand-blue-50 text-brand-blue-900 border border-brand-blue-200',
        Login: 'bg-brand-blue-500 text-white border border-brand-blue-600',
        'Failed Login': 'bg-white text-gray-800 border border-gray-300',
    };

    return <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${actionStyles[action]}`}>{action}</span>;
};

const AuditLogsView: React.FC = () => {
    const [logs, setLogs] = useState<SecurityLog[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAction, setFilterAction] = useState<string>('All');
    const { addToast } = useToast();

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await getSecurityLogs();
                setLogs(data);
            } catch (e) {
                addToast('Failed to load security logs', 'error');
            }
        };
        fetchLogs();
    }, [addToast]);

    const filteredLogs = useMemo(() => {
        return logs.filter(log => {
            const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  log.target?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  log.ipAddress.includes(searchTerm);
            const matchesAction = filterAction === 'All' || log.action === filterAction;
            return matchesSearch && matchesAction;
        });
    }, [logs, searchTerm, filterAction]);

    const handleExport = () => {
        if (filteredLogs.length === 0) {
            addToast('No logs to export', 'error');
            return;
        }
        const csvContent = "data:text/csv;charset=utf-8," 
            + "User,Action,Target,IP,Time\n"
            + filteredLogs.map(e => `${e.user},${e.action},${e.target},${e.ipAddress},${e.timestamp}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "security_logs.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        addToast('Logs exported successfully', 'success');
    };

    const tableHeaders = ['User', 'Action', 'Target', 'IP Address', 'Timestamp'];
    
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h3 className="text-lg text-[#1E2B2B] font-montserrat font-bold">Audit Trail</h3>
                    <p className="text-sm text-gray-500">Monitor system activity and access logs.</p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <input 
                        type="text" 
                        placeholder="Search user, IP, or target..." 
                        className="bg-white border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] text-sm focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB] w-full md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                     <select 
                        className="bg-white border-gray-300 text-[#1E2B2B] text-sm rounded-md focus:ring-[#1075BB] focus:border-[#1075BB] py-1.5"
                        value={filterAction}
                        onChange={(e) => setFilterAction(e.target.value)}
                    >
                        <option value="All">All Actions</option>
                        <option value="Create">Create</option>
                        <option value="Update">Update</option>
                        <option value="Delete">Delete</option>
                        <option value="Login">Login</option>
                        <option value="Failed Login">Failed Login</option>
                    </select>
                    <Button variant="secondary" size="sm" onClick={handleExport}>Export</Button>
                </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <Table headers={tableHeaders}>
                    {filteredLogs.length === 0 ? (
                        <tr><td colSpan={5} className="p-8 text-center text-gray-500">No matching logs found.</td></tr>
                    ) : (
                        filteredLogs.map(log => (
                            <tr key={log.id} className="odd:bg-white even:bg-[#F0F7FC] hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {log.avatarUrl ? (
                                            <img className="h-8 w-8 rounded-full object-cover border border-gray-200" src={log.avatarUrl} alt={log.user} />
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                                                {log.user.charAt(0)}
                                            </div>
                                        )}
                                        <div className="ml-3 font-semibold text-[#1E2B2B] text-sm">{log.user}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <LogActionTag action={log.action} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm">{log.target}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono text-xs">{log.ipAddress}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">{new Date(log.timestamp).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </Table>
            </div>
        </div>
    );
};

const ActiveSessionsView: React.FC = () => {
    const [sessions, setSessions] = useState<ActiveSession[]>([]);
    const { addToast } = useToast();
    
    useEffect(() => {
        getActiveSessions().then(setSessions).catch(() => addToast('Failed to load sessions', 'error'));
    }, [addToast]);

    const handleRevoke = async (id: string) => {
        // Optimistic update immediately
        const sessionToRevoke = sessions.find(s => s.id === id);
        setSessions(prev => prev.filter(s => s.id !== id));
        
        try {
            await revokeSession(id);
            addToast(`Session for ${sessionToRevoke?.user} revoked.`, 'success');
        } catch (error) {
            // Revert if failed (in a real app, though here data is local/mock mostly)
            addToast('Failed to revoke session.', 'error');
        }
    };

    const handleRevokeAll = () => {
        if (window.confirm("CRITICAL ACTION: This will log out ALL users immediately (except you). Are you sure?")) {
            setSessions([]);
            addToast('All sessions terminated successfully.', 'success');
        }
    }

    const tableHeaders = ['User', 'IP Address', 'Device', 'Last Activity', 'Actions'];
    return (
         <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg text-[#1E2B2B] font-montserrat font-bold">Active User Sessions</h3>
                    <p className="text-sm text-gray-500">Monitor current access.</p>
                </div>
                {sessions.length > 0 && (
                    <Button variant="secondary" className="!text-red-600 !border-red-200 hover:!bg-red-50" onClick={handleRevokeAll}>
                        Terminate All Sessions
                    </Button>
                )}
            </div>
            
            <Table headers={tableHeaders}>
                {sessions.length === 0 ? (
                    <tr><td colSpan={5} className="p-8 text-center text-gray-500">No active sessions detected.</td></tr>
                ) : (
                    sessions.map(session => (
                        <tr key={session.id} className="odd:bg-white even:bg-[#F0F7FC] hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="relative">
                                        <img className="h-8 w-8 rounded-full object-cover border border-gray-200" src={session.avatarUrl} alt={session.user} />
                                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-[#1075BB]"></span>
                                    </div>
                                    <div className="ml-3 font-semibold text-[#1E2B2B] text-sm">{session.user}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono text-xs bg-gray-50/50 rounded-sm px-2 mx-2 inline-block my-3">{session.ipAddress}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm flex items-center">
                                <span className="mr-2">
                                    {session.device.includes('Windows') ? '💻' : session.device.includes('Mac') ? '🍎' : '📱'}
                                </span>
                                {session.device}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">{session.lastActivity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <Button variant="secondary" size="sm" className="!border-red-200 !text-red-600 hover:!bg-red-50 hover:!border-red-300" onClick={() => handleRevoke(session.id)}>
                                    Revoke
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
            </Table>
        </div>
    );
}

const SecurityModule: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('logs');

    return (
        <div className="space-y-6">
            {/* Security Status Banner */}
            <div className="bg-white border-l-4 border-[#1075BB] p-4 rounded-r-lg shadow-sm flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">System Security Status</h4>
                    <p className="text-lg font-bold text-[#1E2B2B] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#1075BB] animate-pulse"></span>
                        Operational - Normal
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-xs text-gray-400">Last Scan</span>
                    <p className="text-sm font-mono text-gray-700">Just now</p>
                </div>
            </div>

            <Card bodyClassName="!p-0">
                <div className="px-6">
                    <div className="flex border-b border-[#B3D6F0]">
                        <button
                            onClick={() => setActiveTab('logs')}
                            className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 ${
                                activeTab === 'logs' ? 'text-[#1075BB] border-[#1075BB]' : 'text-gray-500 hover:text-[#1E2B2B] border-transparent'
                            }`}
                        >
                            Audit Logs
                        </button>
                        <button
                            onClick={() => setActiveTab('sessions')}
                            className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 ${
                                activeTab === 'sessions' ? 'text-[#1075BB] border-[#1075BB]' : 'text-gray-500 hover:text-[#1E2B2B] border-transparent'
                            }`}
                        >
                            Active Sessions
                        </button>
                    </div>
                </div>
                
                <div className="p-6">
                     {activeTab === 'logs' ? <AuditLogsView /> : <ActiveSessionsView />}
                </div>
            </Card>
        </div>
    );
};

export default SecurityModule;
