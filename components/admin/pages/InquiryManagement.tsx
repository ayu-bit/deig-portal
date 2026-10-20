
import '../../../types';
import React, { useState, useEffect, useCallback } from 'react';
import { getInquiries, updateInquiry, deleteInquiry } from '../../../services/api';
import type { ContactInquiry, InquiryStatus } from '../../../types';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import { useToast } from '../../../contexts/ToastContext';

const InquiryStatusTag: React.FC<{ status: InquiryStatus }> = ({ status }) => {
    const statusStyles: { [key in InquiryStatus]: string } = {
        Unread: 'bg-blue-100 text-blue-800 border-blue-200',
        Read: 'bg-gray-100 text-gray-800 border-gray-200',
        Resolved: 'bg-green-100 text-green-800 border-green-200',
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
            {status}
        </span>
    );
};

const InquiryReplyPanel: React.FC<{ 
    inquiry: ContactInquiry; 
    onClose: () => void;
    onReplySent: (id: string) => void;
}> = ({ inquiry, onClose, onReplySent }) => {
    const { addToast } = useToast();
    const [replyText, setReplyText] = useState('');
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        if (!replyText.trim()) return;
        setSending(true);
        
        // Simulate API call delay
        setTimeout(async () => {
            try {
                // In a real app, this sends the email
                await updateInquiry(inquiry.id, { status: 'Resolved' });
                addToast(`Reply sent to ${inquiry.email}`, 'success');
                onReplySent(inquiry.id);
                onClose();
            } catch (error) {
                addToast('Failed to send reply', 'error');
            } finally {
                setSending(false);
            }
        }, 800);
    };

    return (
        <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col border-l border-gray-200 animate-fade-in">
            <div className="p-6 bg-[#1075BB] text-white flex justify-between items-center shadow-md">
                <div>
                    <h3 className="font-bold text-lg font-montserrat">Reply to Inquiry</h3>
                    <p className="text-xs text-white opacity-80">Ticket ID: {inquiry.id}</p>
                </div>
                <button onClick={onClose} className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto space-y-6 bg-gray-50">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-[#04253D]">{inquiry.name}</p>
                            <p className="text-xs text-gray-500">{inquiry.email}</p>
                        </div>
                        <span className="text-xs text-gray-400">{new Date(inquiry.receivedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-2 mt-2">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Subject</p>
                        <p className="text-sm font-medium text-gray-800">{inquiry.subject}</p>
                    </div>
                    <div className="border-t border-gray-100 pt-2 mt-2">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Message</p>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
                    </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <label className="flex text-sm font-bold text-gray-700 mb-2 justify-between">
                        <span>Your Reply</span>
                        <span className="text-xs text-gray-400 font-normal">Drafting...</span>
                    </label>
                    <textarea 
                        className="w-full border-gray-300 rounded-md p-3 h-48 text-sm focus:ring-[#1075BB] focus:border-[#1075BB] resize-none"
                        placeholder="Type your professional response here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        autoFocus
                    ></textarea>
                    <div className="flex justify-between items-center mt-2">
                        <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                            Attach File
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-4 border-t bg-white flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSend} disabled={!replyText || sending} className="min-w-[120px]">
                    {sending ? 'Sending...' : 'Send Reply'}
                </Button>
            </div>
        </div>
    );
};

const InquiryManagement: React.FC = () => {
    const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
    const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'All'>('All');
    const { addToast } = useToast();

    const fetchInquiries = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getInquiries();
            setInquiries(data);
        } catch(e) { 
            addToast('Error loading inquiries', 'error'); 
        } finally { 
            setLoading(false); 
        }
    }, [addToast]);

    useEffect(() => {
        fetchInquiries();
    }, [fetchInquiries]);

    const handleReplySent = (id: string) => {
        // Optimistic update
        setInquiries(prev => prev.map(inq => 
            inq.id === id ? { ...inq, status: 'Resolved' } : inq
        ));
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this inquiry permanently?')) {
            try {
                await deleteInquiry(id);
                setInquiries(prev => prev.filter(inq => inq.id !== id));
                addToast('Inquiry deleted successfully', 'success');
                if (selectedInquiry?.id === id) setSelectedInquiry(null);
            } catch (error) {
                addToast('Failed to delete inquiry', 'error');
            }
        }
    };

    const handleMarkAsRead = async (inq: ContactInquiry) => {
        if (inq.status === 'Unread') {
            try {
                await updateInquiry(inq.id, { status: 'Read' });
                setInquiries(prev => prev.map(i => i.id === inq.id ? { ...i, status: 'Read' } : i));
            } catch (e) { console.error(e); }
        }
        setSelectedInquiry(inq);
    };

    const filteredInquiries = inquiries.filter(inq => {
        const matchesSearch = inq.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             inq.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const headers = ['Sender', 'Subject', 'Status', 'Received', 'Actions'];

    return (
        <div className="relative h-full space-y-6">
            {selectedInquiry && (
                <>
                    <div className="fixed inset-0 bg-black/20 z-40 backdrop-blur-[1px]" onClick={() => setSelectedInquiry(null)}></div>
                    <InquiryReplyPanel 
                        inquiry={selectedInquiry} 
                        onClose={() => setSelectedInquiry(null)} 
                        onReplySent={handleReplySent}
                    />
                </>
            )}
            
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                <div>
                    <h2 className="text-xl text-[#04253D] font-montserrat font-bold">Inquiry Management</h2>
                    <p className="text-sm text-gray-500">Manage incoming messages from the contact forms.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
                    <div className="relative flex-1 min-w-[240px]">
                        <input 
                            type="text" 
                            placeholder="Search by name, email, or subject..." 
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
                        <option value="All">All Inquiries</option>
                        <option value="Unread">Unread</option>
                        <option value="Read">Read</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                    <Button variant="secondary" size="sm" onClick={fetchInquiries}>
                        Refresh
                    </Button>
                </div>
            </div>

            <Card>
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading inquiries...</div>
                ) : filteredInquiries.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg italic">
                        {searchTerm || statusFilter !== 'All' ? 'No inquiries match your filters.' : 'No inquiries found.'}
                    </div>
                ) : (
                    <Table headers={headers}>
                        {filteredInquiries.map(inq => (
                            <tr 
                                key={inq.id} 
                                className={`hover:bg-gray-50 border-b last:border-0 cursor-pointer transition-colors ${inq.status === 'Unread' ? 'bg-blue-50/30' : ''}`} 
                                onClick={() => handleMarkAsRead(inq)}
                            >
                                <td className="px-6 py-4">
                                    <div className={`font-bold text-[#04253D] ${inq.status === 'Unread' ? 'border-l-4 border-brand-blue-500 pl-2 -ml-2' : ''}`}>
                                        {inq.name}
                                    </div>
                                    <div className="text-xs text-gray-500">{inq.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 font-medium truncate max-w-xs">{inq.subject}</div>
                                    <div className="text-xs text-gray-500 truncate max-w-xs">{inq.message}</div>
                                </td>
                                <td className="px-6 py-4"><InquiryStatusTag status={inq.status} /></td>
                                <td className="px-6 py-4 text-xs text-gray-500 font-mono">
                                    {new Date(inq.receivedAt).toLocaleDateString()}
                                    <span className="block text-[10px] opacity-70">{new Date(inq.receivedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </td>
                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end space-x-2">
                                        <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); handleMarkAsRead(inq); }}>
                                            Reply
                                        </Button>
                                        <button 
                                            onClick={(e) => handleDelete(e, inq.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                            title="Delete Inquiry"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
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

export default InquiryManagement;
