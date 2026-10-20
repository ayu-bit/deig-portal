
import '../../../types';
import React, { useState, useEffect, useCallback } from 'react';
import { getVacancies, createVacancy, updateVacancy, deleteVacancy } from '../../../services/api';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import Tag from '../ui/Tag';
import TagInput from '../ui/TagInput';
import ApplicantTracker from './ApplicantTracker';
import type { Vacancy, VacancyStatus, Division } from '../../../types';
import { useToast } from '../../../contexts/ToastContext';

const VacancyFormModal: React.FC<{
    vacancy: Partial<Vacancy> | null;
    onClose: () => void;
    onSave: (vacancy: Partial<Vacancy>) => void;
}> = ({ vacancy, onClose, onSave }) => {
    const [formData, setFormData] = useState(vacancy || { requirements: [], responsibilities: [] });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTagsChange = (key: 'requirements' | 'responsibilities', tags: string[]) => {
        setFormData({ ...formData, [key]: tags });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b bg-gray-50 rounded-t-lg">
                    <h3 className="text-xl font-bold font-montserrat text-[#1E2B2B]">{vacancy?.id ? 'Edit Vacancy' : 'Post New Vacancy'}</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                            <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB]" required placeholder="e.g. Senior Mechanical Engineer" />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department / Division</label>
                            <select name="division" value={formData.division || ''} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB]" required>
                                <option value="">Select Division</option>
                                <option value="HAEI">HAEI</option>
                                <option value="GAEI">GAEI</option>
                                <option value="BVEIG">BVEIG</option>
                                <option value="LEEIG">LEEIG</option>
                                <option value="Corporate">Corporate</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                            <select name="type" value={formData.type || ''} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB]" required>
                                <option value="">Select Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input name="location" value={formData.location || ''} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB]" required placeholder="City, Region" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Closing Date</label>
                            <input type="date" name="closingDate" value={formData.closingDate ? (typeof formData.closingDate === 'string' ? formData.closingDate.split('T')[0] : new Date(formData.closingDate).toISOString().split('T')[0]) : ''} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB]" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Overview</label>
                        <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB]" placeholder="Brief summary of the role..." required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <TagInput 
                                label="Key Responsibilities" 
                                tags={formData.responsibilities || []} 
                                onChange={(tags) => handleTagsChange('responsibilities', tags)}
                                placeholder="Add responsibility and press Enter"
                            />
                        </div>
                        <div>
                            <TagInput 
                                label="Requirements & Qualifications" 
                                tags={formData.requirements || []} 
                                onChange={(tags) => handleTagsChange('requirements', tags)}
                                placeholder="Add requirement and press Enter"
                            />
                        </div>
                    </div>
                </form>

                <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t rounded-b-lg">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="primary" onClick={handleSubmit}>Publish Vacancy</Button>
                </div>
            </div>
        </div>
    );
};

const VacancyManagement: React.FC = () => {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVacancy, setEditingVacancy] = useState<Partial<Vacancy> | null>(null);
    const { addToast } = useToast();
    const [filters, setFilters] = useState<{
        division: Division | 'All';
        status: VacancyStatus | 'All';
    }>({ division: 'All', status: 'All' });

    const fetchVacancies = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getVacancies();
            setVacancies(data);
        } catch (err) {
            addToast('Failed to load data', 'error');
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        fetchVacancies();
    }, [fetchVacancies]);

    const handleSave = async (vacancy: Partial<Vacancy>) => {
        try {
            if (vacancy.id) {
                await updateVacancy(vacancy.id, vacancy);
                addToast('Vacancy updated successfully', 'success');
            } else {
                await createVacancy(vacancy);
                addToast('Vacancy created successfully', 'success');
            }
            fetchVacancies();
            setIsModalOpen(false);
            setEditingVacancy(null);
        } catch (error) {
            addToast('Failed to save vacancy.', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Delete this vacancy?')) {
            try {
                await deleteVacancy(id);
                addToast('Vacancy deleted', 'success');
                fetchVacancies();
            } catch (error) { addToast('Error deleting', 'error'); }
        }
    };

    const handleOpenModal = (vacancy?: Vacancy) => {
        setEditingVacancy(vacancy || {});
        setIsModalOpen(true);
    };

    if (selectedVacancy) {
        return <ApplicantTracker vacancy={selectedVacancy} onBack={() => setSelectedVacancy(null)} />;
    }

    const filteredVacancies = vacancies.filter(v => 
        (filters.division === 'All' || v.division === filters.division) &&
        (filters.status === 'All' || v.status === filters.status)
    );

    const tableHeaders = ['Job Title', 'Division', 'Applicants', 'Status', 'Deadline', 'Actions'];

    return (
        <>
        {isModalOpen && <VacancyFormModal vacancy={editingVacancy} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
        <Card>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-xl text-[#1E2B2B] font-montserrat font-bold">Recruitment Portal</h2>
                <div className="flex items-center gap-2">
                    <Button variant="primary" onClick={() => handleOpenModal()}>+ Post Job</Button>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Filter Division</label>
                    <select className="w-full mt-1 border-gray-300 rounded-md text-sm" value={filters.division} onChange={e => setFilters({...filters, division: e.target.value as any})}>
                        <option value="All">All Divisions</option>
                        <option value="HAEI">HAEI</option>
                        <option value="GAEI">GAEI</option>
                        <option value="Corporate">Corporate</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Filter Status</label>
                    <select className="w-full mt-1 border-gray-300 rounded-md text-sm" value={filters.status} onChange={e => setFilters({...filters, status: e.target.value as any})}>
                        <option value="All">All Statuses</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                    </select>
                 </div>
            </div>

            <Table headers={tableHeaders}>
                {loading && <tr><td colSpan={6} className="text-center p-8 text-gray-500">Loading vacancies...</td></tr>}
                {!loading && filteredVacancies.map(vacancy => (
                    <tr key={vacancy.id} className="odd:bg-white even:bg-[#effefb] hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                            <div className="font-semibold text-[#1E2B2B]">{vacancy.title}</div>
                            <div className="text-xs text-gray-500">{vacancy.location}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{vacancy.division}</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#1075BB] rounded-full">
                                {vacancy.applicantCount}
                            </span>
                        </td>
                        <td className="px-6 py-4"><Tag status={vacancy.status as any} /></td>
                        <td className="px-6 py-4 text-sm text-gray-500 font-mono">{new Date(vacancy.closingDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                                <Button variant="secondary" size="sm" onClick={() => setSelectedVacancy(vacancy)}>Applicants</Button>
                                <Button variant="icon" size="sm" onClick={() => handleOpenModal(vacancy)}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </Button>
                                <Button variant="icon" size="sm" className="!text-red-500" onClick={() => handleDelete(vacancy.id)}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>
        </Card>
        </>
    );
};

export default VacancyManagement;
