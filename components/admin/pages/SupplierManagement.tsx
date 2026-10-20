
import * as React from 'react';
import '../../../types';
import { getSuppliers, updateSupplierStatus } from '../../../services/api';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import type { Supplier, SupplierStatus } from '../../../types';
import { useToast } from '../../../contexts/ToastContext';

const SupplierManagement: React.FC = () => {
    const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState<SupplierStatus | 'All'>('All');
    const { addToast } = useToast();

    const fetchSuppliers = React.useCallback(async () => {
        try {
            setLoading(true);
            const data = await getSuppliers();
            setSuppliers(data);
        } catch (e) {
            addToast('Error loading suppliers', 'error');
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    React.useEffect(() => {
        fetchSuppliers();
    }, [fetchSuppliers]);

    const handleStatusChange = async (id: string, status: SupplierStatus) => {
        try {
            await updateSupplierStatus(id, status);
            addToast(`Supplier marked as ${status}`, 'success');
            fetchSuppliers();
        } catch (e) {
            addToast('Status update failed', 'error');
        }
    };

    const filtered = suppliers.filter(s => {
        const matchesSearch = s.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             s.services.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             s.contactName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const headers = ['Company', 'Contact', 'Services/Expertise', 'Status', 'Date Registered', 'Actions'];

    return (
        <div className="space-y-6">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-[#1075BB] font-montserrat uppercase">Supplier Management</h2>
                    <p className="text-sm text-gray-500">Review and verify companies registered in the DEIG procurement system.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
                    <div className="relative flex-1 min-w-[240px]">
                        <input 
                            type="text" 
                            placeholder="Search companies, contacts, or expertise..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border-gray-300 rounded-md p-2 pl-8 text-sm focus:ring-[#1075BB]" 
                        />
                        <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="border-gray-300 rounded-md p-2 text-sm focus:ring-[#1075BB] bg-white min-w-[140px]"
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Blacklisted">Blacklisted</option>
                    </select>
                    <Button variant="secondary" onClick={fetchSuppliers}>Refresh</Button>
                </div>
            </div>

            <Card title={`Registered Suppliers (${filtered.length})`}>
                <Table headers={headers}>
                    {loading ? (
                        <tr><td colSpan={6} className="text-center p-8 text-gray-500">Loading registrants...</td></tr>
                    ) : filtered.length === 0 ? (
                        <tr><td colSpan={6} className="text-center p-8 text-gray-500">No suppliers found.</td></tr>
                    ) : (
                        filtered.map(supplier => (
                            <tr key={supplier.id} className="odd:bg-white even:bg-[#F0F7FC] hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-[#1E2B2B]">{supplier.companyName}</div>
                                    <div className="text-xs text-gray-400">TIN: {supplier.regNumber}</div>
                                    {supplier.website && <a href={supplier.website} target="_blank" className="text-[10px] text-[#1075BB] hover:underline">{supplier.website}</a>}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-700">{supplier.contactName}</div>
                                    <div className="text-xs text-gray-500">{supplier.contactTitle}</div>
                                    <div className="text-xs text-[#1075BB] font-bold">{supplier.contactEmail}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs text-gray-600 line-clamp-2 max-w-xs">{supplier.services}</p>
                                </td>
                                <td className="px-6 py-4">
                                     <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${
                                         supplier.status === 'Verified' ? 'bg-green-100 text-green-800 border-green-200' : 
                                         supplier.status === 'Blacklisted' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-gray-100 text-gray-800 border-gray-200'
                                     }`}>
                                         {supplier.status}
                                     </span>
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-500 font-mono">
                                    {new Date(supplier.registeredAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <select 
                                            className="text-xs border-gray-300 rounded p-1 bg-white"
                                            value={supplier.status}
                                            onChange={(e) => handleStatusChange(supplier.id, e.target.value as SupplierStatus)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Verified">Verify</option>
                                            <option value="Blacklisted">Blacklist</option>
                                            <option value="Archived">Archive</option>
                                        </select>
                                        <Button variant="icon" size="sm" title="View Profile">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </Table>
            </Card>
        </div>
    );
};

export default SupplierManagement;
