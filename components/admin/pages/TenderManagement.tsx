
import * as React from 'react';
import '../../../types';
import { getTenders, createTender, updateTender, deleteTender } from '../../../services/api';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import type { Tender } from '../../../types';
import { useToast } from '../../../contexts/ToastContext';

const TenderFormModal: React.FC<{
    tender: Partial<Tender> | null;
    onClose: () => void;
    onSave: (tender: Partial<Tender>) => void;
}> = ({ tender, onClose, onSave }) => {
    const [formData, setFormData] = React.useState<Partial<Tender>>(tender || {
        category: 'Equipment Supply',
        status: 'Open'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl flex flex-col">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold text-[#1075BB] font-montserrat">
                        {tender?.id ? 'Edit Tender Notice' : 'Post New Tender'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tender Title</label>
                        <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2 focus:ring-[#1075BB] focus:border-[#1075BB]" required />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2 bg-white">
                                <option>Equipment Supply</option>
                                <option>Consultancy</option>
                                <option>Construction</option>
                                <option>Logistics</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2 bg-white">
                                <option>Open</option>
                                <option>Closed</option>
                                <option>Awarded</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
                            <input type="date" name="publishedDate" value={formData.publishedDate ? formData.publishedDate.split('T')[0] : ''} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Closing Date</label>
                            <input type="date" name="closingDate" value={formData.closingDate ? formData.closingDate.split('T')[0] : ''} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Summary / Instructions</label>
                        <textarea name="summary" value={formData.summary || ''} onChange={handleChange} rows={4} className="w-full border-gray-300 rounded-md p-2 resize-none" placeholder="Provide a brief summary and instructions for the tender..." required />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="primary">Save Tender</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const TenderManagement: React.FC = () => {
    const [tenders, setTenders] = React.useState<Tender[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingTender, setEditingTender] = React.useState<Partial<Tender> | null>(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filterCategory, setFilterCategory] = React.useState('All');
    const [filterStatus, setFilterStatus] = React.useState('All');
    const { addToast } = useToast();

    const fetchTenders = React.useCallback(async () => {
        try {
            setLoading(true);
            const data = await getTenders();
            setTenders(data);
        } catch (e) {
            addToast('Error loading tenders', 'error');
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    React.useEffect(() => {
        fetchTenders();
    }, [fetchTenders]);

    const handleSave = async (data: Partial<Tender>) => {
        try {
            if (data.id) {
                await updateTender(data.id, data);
                addToast('Tender updated successfully', 'success');
            } else {
                await createTender(data);
                addToast('New tender published', 'success');
            }
            setIsModalOpen(false);
            fetchTenders();
        } catch (e) {
            addToast('Failed to save tender', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to remove this tender notice?')) {
            try {
                await deleteTender(id);
                addToast('Tender deleted', 'success');
                fetchTenders();
            } catch (e) {
                addToast('Delete failed', 'error');
            }
        }
    };

    const headers = ['Tender ID', 'Title', 'Category', 'Deadline', 'Status', 'Actions'];

    const filteredTenders = tenders.filter(tender => {
        const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             tender.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'All' || tender.category === filterCategory;
        const matchesStatus = filterStatus === 'All' || tender.status === filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const categories = Array.from(new Set(tenders.map(t => t.category)));

    return (
        <div className="space-y-6">
            {isModalOpen && <TenderFormModal tender={editingTender} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
            <Card title="Procurement & Tender Management">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 border-b pb-4">
                    <p className="text-sm text-gray-500 max-w-lg">
                        Manage official procurement notices and calls for bids. Tenders published here will be visible on the public procurement portal.
                    </p>
                    <Button variant="primary" onClick={() => { setEditingTender(null); setIsModalOpen(true); }}>
                        + Post New Tender
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    <div className="relative flex-1 min-w-[200px]">
                        <input 
                            type="text" 
                            placeholder="Search by ID or Title..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border-gray-300 rounded-md p-2 pl-8 text-sm"
                        />
                        <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <select 
                        className="border-gray-300 rounded-md p-2 text-sm"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select 
                        className="border-gray-300 rounded-md p-2 text-sm"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                        <option value="Awarded">Awarded</option>
                    </select>
                </div>

                <Table headers={headers}>
                    {loading ? (
                        <tr><td colSpan={6} className="text-center p-8 text-gray-500">Loading Tenders...</td></tr>
                    ) : filteredTenders.length === 0 ? (
                        <tr><td colSpan={6} className="text-center p-8 text-gray-500 italic">No tenders match your search criteria.</td></tr>
                    ) : (
                        filteredTenders.map(tender => (
                            <tr key={tender.id} className="odd:bg-white even:bg-[#F0F7FC] hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs font-bold text-gray-600">{tender.id}</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-[#1E2B2B]">{tender.title}</div>
                                    <div className="text-xs text-gray-400">Pub: {new Date(tender.publishedDate).toLocaleDateString()}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">{tender.category}</td>
                                <td className="px-6 py-4 text-sm text-red-600 font-bold">{new Date(tender.closingDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                     <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                                         tender.status === 'Open' ? 'bg-green-100 text-green-800' : 
                                         tender.status === 'Closed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                     }`}>
                                         {tender.status}
                                     </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="icon" size="sm" onClick={() => { setEditingTender(tender); setIsModalOpen(true); }}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                        </Button>
                                        <Button variant="icon" size="sm" className="!text-red-500 hover:!bg-red-50" onClick={() => handleDelete(tender.id)}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
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

export default TenderManagement;
