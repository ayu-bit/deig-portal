
// FIX: Reordered imports to ensure global JSX namespace augmentation from `types.ts` is applied before React is imported. This resolves errors where standard HTML elements were not recognized in JSX.
import '../../../types';
import React, { useState, useEffect } from 'react';
import { getApplicantsByVacancy, updateApplicantStatus } from '../../../services/api';
import type { Vacancy, Applicant, ApplicantStatus } from '../../../types';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import StarRating from '../ui/StarRating';
import { useToast } from '../../../contexts/ToastContext';

interface ApplicantTrackerProps {
    vacancy: Vacancy;
    onBack: () => void;
}

const DocumentPreviewModal: React.FC<{ url: string; title: string; onClose: () => void }> = ({ url, title, onClose }) => {
    // Check if it's an image
    const isImage = url.match(/\.(jpeg|jpg|gif|png)$/i) || url.startsWith('data:image');
    
    return (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-5xl h-[90vh] rounded-lg flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <div>
                        <h3 className="text-lg font-bold text-[#1E2B2B]">{title}</h3>
                        <p className="text-xs text-gray-500">Document Preview</p>
                    </div>
                    <div className="flex gap-2">
                        {url && url !== '#' && (
                            <a 
                                href={url} 
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-[#1075BB] text-white text-sm font-semibold rounded hover:bg-[#0D629E] transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                Open in New Tab
                            </a>
                        )}
                        <button onClick={onClose} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </div>
                <div className="flex-1 bg-gray-100 p-4 overflow-hidden relative flex justify-center items-center">
                    {url === '#' || !url ? (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                            <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            <p>No document attached.</p>
                        </div>
                    ) : isImage ? (
                        <img src={url} alt="CV Preview" className="max-w-full max-h-full object-contain shadow-lg" />
                    ) : (
                        // Use object tag for PDF which is more robust than iframe for base64 data
                        <object data={url} type="application/pdf" className="w-full h-full rounded-md bg-white shadow-lg border border-gray-200">
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <p className="mb-2">Unable to display PDF directly.</p>
                                <a href={url} download className="text-[#1075BB] underline font-bold">Download File</a>
                            </div>
                        </object>
                    )}
                </div>
            </div>
        </div>
    );
};

const ApplicantTracker: React.FC<ApplicantTrackerProps> = ({ vacancy, onBack }) => {
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [loading, setLoading] = useState(true);
    const [previewDoc, setPreviewDoc] = useState<{ url: string, name: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<ApplicantStatus | 'All'>('All');
    const { addToast } = useToast();

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                setLoading(true);
                const data = await getApplicantsByVacancy(vacancy.id);
                setApplicants(data);
            } catch (error) {
                addToast('Failed to fetch applicants.', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchApplicants();
    }, [vacancy.id, addToast]);

    const handleStatusChange = async (applicantId: string, newStatus: ApplicantStatus) => {
        try {
            const updatedApplicant = await updateApplicantStatus(applicantId, newStatus);
            setApplicants(prev => prev.map(app => app.id === applicantId ? updatedApplicant : app));
            addToast(`Status for ${updatedApplicant.name} updated.`, 'success');
        } catch (error) {
            addToast('Failed to update status.', 'error');
        }
    };

    const filteredApplicants = applicants.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             app.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const tableHeaders = ['Applicant', 'Applied Date', 'Status', 'Rating', 'CV / Resume', 'Actions'];

    return (
        <div className="space-y-6">
            {previewDoc && (
                <DocumentPreviewModal 
                    url={previewDoc.url} 
                    title={`${previewDoc.name}'s Resume`} 
                    onClose={() => setPreviewDoc(null)} 
                />
            )}
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex items-center">
                    <Button variant="icon" onClick={onBack} className="mr-4 hover:bg-gray-100 rounded-full p-2">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </Button>
                    <div>
                        <h2 className="text-xl font-bold text-[#1E2B2B] font-montserrat">Applicant Tracker</h2>
                        <p className="text-sm text-gray-500 font-roboto-condensed">Position: <span className="font-semibold text-[#1075BB]">{vacancy.title}</span></p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                    <div className="relative flex-1 min-w-[200px]">
                        <input 
                            type="text" 
                            placeholder="Search applicants..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border-gray-300 rounded-md p-2 pl-8 text-sm focus:ring-[#1075BB]" 
                        />
                        <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="border-gray-300 rounded-md p-2 text-sm focus:ring-[#1075BB] bg-white"
                    >
                        <option value="All">All Status</option>
                        <option value="New">New</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Interview">Interview</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <Button variant="secondary" size="sm" onClick={() => { setLoading(true); getApplicantsByVacancy(vacancy.id).then(setApplicants).finally(() => setLoading(false)); }}>
                        Refresh
                    </Button>
                </div>
            </div>

            <Card>
                {loading ? (
                    <div className="text-center p-8 text-gray-500">Loading applicants data...</div>
                ) : filteredApplicants.length === 0 ? (
                    <div className="text-center p-12 bg-gray-50 rounded-lg border border-gray-100 italic">
                        {searchTerm || statusFilter !== 'All' ? 'No applicants match your filters.' : 'No applicants found for this vacancy.'}
                    </div>
                ) : (
                <Table headers={tableHeaders}>
                    {filteredApplicants.map(applicant => (
                        <tr key={applicant.id} className="odd:bg-white even:bg-[#effefb] hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-bold text-[#1E2B2B]">{applicant.name}</div>
                                <div className="text-xs text-gray-500">{applicant.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">
                                {new Date(applicant.appliedDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                               <select 
                                    value={applicant.status}
                                    onChange={(e) => handleStatusChange(applicant.id, e.target.value as ApplicantStatus)}
                                    className={`text-xs font-bold uppercase py-1 px-2 rounded-md border-0 focus:ring-2 focus:ring-[#1075BB] cursor-pointer ${
                                        applicant.status === 'New' ? 'bg-brand-blue-100 text-brand-blue-800' :
                                        applicant.status === 'Hired' ? 'bg-brand-blue-500 text-white' :
                                        applicant.status === 'Rejected' ? 'bg-gray-200 text-gray-600' :
                                        'bg-white border border-gray-300 text-gray-800'
                                    }`}
                               >
                                   <option value="New">New</option>
                                   <option value="Reviewed">Reviewed</option>
                                   <option value="Interview">Interview</option>
                                   <option value="Hired">Hired</option>
                                   <option value="Rejected">Rejected</option>
                               </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StarRating rating={applicant.rating} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => setPreviewDoc({ url: applicant.cvUrl, name: applicant.name })}
                                        className="flex items-center gap-1 text-[#1075BB] hover:text-[#0D629E] font-semibold text-sm group px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                                        title="Preview Document"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                        <span className="underline decoration-transparent group-hover:decoration-current transition-all">View</span>
                                    </button>
                                    
                                    {applicant.cvUrl && applicant.cvUrl !== '#' && (
                                        <a href={applicant.cvUrl} download={`CV-${applicant.name.replace(/\s+/g, '-')}.pdf`} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded" title="Download">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0L8 8m4-4v12"></path></svg>
                                        </a>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end space-x-2">
                                    <Button variant="secondary" size="sm">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        Email
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </Table>
                )}
            </Card>
        </div>
    );
};

export default ApplicantTracker;
