
import * as React from 'react';
import '../../../types';
import { getPages, createPage, updatePage, deletePage } from '../../../services/api';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import Tag from '../ui/Tag';
import RichTextEditor from '../ui/RichTextEditor';
import type { Page } from '../../../types';
import { useToast } from '../../../contexts/ToastContext';

const PageFormModal: React.FC<{
    page: Partial<Page> | null;
    onClose: () => void;
    onSave: (page: Partial<Page>) => void;
}> = ({ page, onClose, onSave }) => {
    const [formData, setFormData] = React.useState<Partial<Page>>(page || { status: 'Draft', content: '', contentAm: '', title: '', titleAm: '', slug: '' });
    const [langTab, setLangTab] = React.useState<'en' | 'am'>('en');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContentChange = (value: string) => {
        if (langTab === 'en') {
            setFormData({ ...formData, content: value });
        } else {
            setFormData({ ...formData, contentAm: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b bg-gray-50 rounded-t-lg flex justify-between items-center">
                    <h3 className="text-xl font-bold font-montserrat text-[#1E2B2B]">
                        {page?.id ? 'Edit Page' : 'Create New Page'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Language Tabs */}
                <div className="flex border-b border-gray-200">
                    <button 
                        type="button"
                        onClick={() => setLangTab('en')}
                        className={`flex-1 py-3 text-sm font-bold text-center transition-colors ${langTab === 'en' ? 'bg-white text-[#1075BB] border-b-2 border-[#1075BB]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                    >
                        English (Default)
                    </button>
                    <button 
                        type="button"
                        onClick={() => setLangTab('am')}
                        className={`flex-1 py-3 text-sm font-bold text-center transition-colors ${langTab === 'am' ? 'bg-white text-[#1075BB] border-b-2 border-[#1075BB]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                    >
                        Amharic (አማርኛ)
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">{langTab === 'en' ? 'Page Title' : 'የገጽ ርዕስ'}</label>
                            <input 
                                name={langTab === 'en' ? 'title' : 'titleAm'} 
                                value={(langTab === 'en' ? formData.title : formData.titleAm) || ''} 
                                onChange={handleChange} 
                                placeholder={langTab === 'en' ? "e.g., About Us" : "ለምሳሌ: ስለ እኛ"} 
                                className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB] focus:border-[#1075BB]" 
                                required={langTab === 'en'} 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL Path - Shared)</label>
                            <input 
                                name="slug" 
                                value={formData.slug || ''} 
                                onChange={handleChange} 
                                placeholder="e.g., /about-us" 
                                className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB] focus:border-[#1075BB]" 
                                required 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status (Shared)</label>
                            <select 
                                name="status" 
                                value={formData.status || 'Draft'} 
                                onChange={handleChange} 
                                className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB] focus:border-[#1075BB]"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <RichTextEditor 
                            label={langTab === 'en' ? "Page Content" : "የገጽ ይዘት"}
                            value={(langTab === 'en' ? formData.content : formData.contentAm) || ''} 
                            onChange={handleContentChange} 
                            placeholder={langTab === 'en' ? "Start typing your page content here..." : "የገጽ ይዘቱን እዚህ ይጻፉ..."} 
                            rows={12}
                        />
                    </div>
                </form>

                <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t rounded-b-lg">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="primary" onClick={handleSubmit}>Save Page</Button>
                </div>
            </div>
        </div>
    );
};

const PageEditor: React.FC = () => {
    const [pages, setPages] = React.useState<Page[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingPage, setEditingPage] = React.useState<Partial<Page> | null>(null);
    const { addToast } = useToast();

    const fetchPages = React.useCallback(async () => {
        try {
            setLoading(true);
            const data = await getPages();
            setPages(data);
        } catch (error) {
            console.error(error);
            addToast('Failed to load pages', 'error');
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    React.useEffect(() => {
        fetchPages();
    }, [fetchPages]);

    const handleSave = async (pageData: Partial<Page>) => {
        try {
            if (pageData.id) {
                await updatePage(pageData.id, pageData);
                addToast('Page updated successfully', 'success');
            } else {
                await createPage(pageData);
                addToast('Page created successfully', 'success');
            }
            fetchPages();
            setIsModalOpen(false);
            setEditingPage(null);
        } catch (error) {
            addToast('Failed to save page', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this page?')) {
            try {
                await deletePage(id);
                addToast('Page deleted successfully', 'success');
                fetchPages();
            } catch (error) {
                addToast('Failed to delete page', 'error');
            }
        }
    };

    const handleCreate = () => {
        setEditingPage({});
        setIsModalOpen(true);
    };

    const handleEdit = (page: Page) => {
        setEditingPage(page);
        setIsModalOpen(true);
    };

    const tableHeaders = ['Page Title', 'Status', 'Last Edited', 'Edited By', 'Actions'];

    return (
        <>
            {isModalOpen && <PageFormModal page={editingPage} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
            <Card title="Pages Editor">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-[#1E2B2B] font-montserrat">Manage Site Pages</h2>
                    <Button variant="primary" onClick={handleCreate}>New Page</Button>
                </div>
                <Table headers={tableHeaders}>
                    {loading ? (
                        <tr><td colSpan={5} className="p-4 text-center">Loading pages...</td></tr>
                    ) : pages.length === 0 ? (
                        <tr><td colSpan={5} className="p-4 text-center">No pages found.</td></tr>
                    ) : (
                        pages.map(page => (
                            <tr key={page.id} className="odd:bg-white even:bg-[#F0F7FC] hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-semibold text-[#1E2B2B]">{page.title}</div>
                                    <div className="text-xs text-gray-500">{page.slug}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Tag status={page.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                    {new Date(page.lastEdited).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                    {/* Safely handle string OR object for editedBy */}
                                    {typeof page.editedBy === 'string' ? page.editedBy : 
                                     (page.editedBy && typeof page.editedBy === 'object') ? (page.editedBy as any).name : 
                                     'System'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                        <Button variant="icon" size="sm" title="Edit" onClick={() => handleEdit(page)}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                        </Button>
                                        <Button variant="icon" size="sm" title="View">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                        </Button>
                                        <Button variant="icon" size="sm" title="Delete" className="text-red-500 hover:bg-red-100" onClick={() => handleDelete(page.id)}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </Table>
            </Card>
        </>
    );
};

export default PageEditor;
