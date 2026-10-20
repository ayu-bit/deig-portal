
import * as React from 'react';
import '../../../types';
import { getNews, createNews, updateNews, deleteNews, uploadMedia } from '../../../services/api';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import Tag from '../ui/Tag';
import RichTextEditor from '../ui/RichTextEditor';
import type { NewsArticle } from '../../../types';
import { useToast } from '../../../contexts/ToastContext';

const NewsFormModal: React.FC<{
    article: Partial<NewsArticle> | null;
    onClose: () => void;
    onSave: (article: Partial<NewsArticle>) => void;
}> = ({ article, onClose, onSave }) => {
    const [formData, setFormData] = React.useState(article || {});
    const [uploading, setUploading] = React.useState(false);
    const [langTab, setLangTab] = React.useState<'en' | 'am'>('en');
    const { addToast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContentChange = (value: string) => {
        if (langTab === 'en') {
            setFormData({ ...formData, content: value });
        } else {
            setFormData({ ...formData, contentAm: value });
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const response = await uploadMedia(uploadData);
            setFormData({ ...formData, imageUrl: response.url });
            addToast('Image uploaded successfully', 'success');
        } catch (error) {
            console.error(error);
            addToast('Image upload failed', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b bg-gray-50 rounded-t-lg">
                    <h3 className="text-xl font-bold font-montserrat text-[#1E2B2B]">{article?.id ? 'Edit Article' : 'Create News Article'}</h3>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">{langTab === 'en' ? 'Headline' : 'ርዕስ (Headline)'}</label>
                            <input 
                                name={langTab === 'en' ? 'title' : 'titleAm'} 
                                value={(langTab === 'en' ? formData.title : formData.titleAm) || ''} 
                                onChange={handleChange} 
                                placeholder={langTab === 'en' ? "Enter article title" : "የዜና ርዕስ ያስገቡ"}
                                className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB] focus:border-[#1075BB]" 
                                required={langTab === 'en'} // Only English required as base
                            />
                        </div>
                        
                        {/* Categories and Status are shared */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select name="category" value={formData.category || ''} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB]" required>
                                <option value="">Select Category</option>
                                <option value="Press Release">Press Release</option>
                                <option value="Announcement">Announcement</option>
                                <option value="Industry News">Industry News</option>
                                <option value="Projects">Projects</option>
                                <option value="Innovation & Technology">Innovation & Technology</option>
                                <option value="Headquarters Updates">Headquarters Updates</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Publication Status</label>
                            <select name="status" value={formData.status || 'Draft'} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB]">
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{langTab === 'en' ? 'Short Excerpt (Summary)' : 'አጭር መግለጫ (Summary)'}</label>
                        <textarea 
                            name={langTab === 'en' ? 'excerpt' : 'excerptAm'} 
                            value={(langTab === 'en' ? formData.excerpt : formData.excerptAm) || ''} 
                            onChange={handleChange} 
                            rows={3} 
                            className="w-full border-gray-300 rounded-md p-2.5 focus:ring-[#1075BB] focus:border-[#1075BB]" 
                            placeholder={langTab === 'en' ? "Brief summary shown on cards..." : "በካርዶች ላይ የሚታይ አጭር መግለጫ..."}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image (Shared)</label>
                        <div className="flex gap-4 items-center">
                            <div className="flex-1">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#1075BB] file:text-white hover:file:bg-[#0E62A1]"
                                    disabled={uploading}
                                />
                                {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
                            </div>
                            {formData.imageUrl && (
                                <div className="w-20 h-14 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        {formData.imageUrl && (
                            <input type="hidden" name="imageUrl" value={formData.imageUrl} />
                        )}
                    </div>

                    <div>
                        <RichTextEditor 
                            label={langTab === 'en' ? "Full Article Content" : "ሙሉ የዜና ይዘት"}
                            value={(langTab === 'en' ? formData.content : formData.contentAm) || ''} 
                            onChange={handleContentChange} 
                            placeholder={langTab === 'en' ? "Write your article content here..." : "የዜና ይዘቱን እዚህ ይጻፉ..."}
                        />
                    </div>
                </form>

                <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t rounded-b-lg">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="primary" onClick={handleSubmit} disabled={uploading}>
                        {uploading ? 'Uploading Image...' : 'Save Article'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const NewsManagement: React.FC = () => {
    const [articles, setArticles] = React.useState<NewsArticle[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingArticle, setEditingArticle] = React.useState<Partial<NewsArticle> | null>(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filterCategory, setFilterCategory] = React.useState('All');
    const [filterStatus, setFilterStatus] = React.useState('All');
    const { addToast } = useToast();

    const fetchArticles = React.useCallback(async () => {
        try {
            setLoading(true);
            const data = await getNews();
            setArticles(data);
        } catch (err) {
            addToast('Failed to load news articles.', 'error');
        } finally {
            setLoading(false);
        }
    }, [addToast]);
    
    React.useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    const handleSave = async (article: Partial<NewsArticle>) => {
        try {
            if (article.id) {
                await updateNews(article.id.toString(), article);
                addToast('Article updated successfully', 'success');
            } else {
                await createNews(article);
                addToast('Article created successfully', 'success');
            }
            fetchArticles();
            setIsModalOpen(false);
            setEditingArticle(null);
        } catch (error) {
            addToast('Failed to save article.', 'error');
        }
    };
    
    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                await deleteNews(id);
                addToast('Article deleted successfully', 'success');
                fetchArticles();
            } catch (error) {
                addToast('Failed to delete article.', 'error');
            }
        }
    };

    const handleOpenModal = (article?: NewsArticle) => {
        setEditingArticle(article || {});
        setIsModalOpen(true);
    };

    const tableHeaders = ['Article', 'Category', 'Status', 'Date', 'Actions'];

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             (article.titleAm && article.titleAm.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = filterCategory === 'All' || article.category === filterCategory;
        const matchesStatus = filterStatus === 'All' || article.status === filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const categories = Array.from(new Set(articles.map(a => a.category)));

    return (
        <>
        {isModalOpen && <NewsFormModal article={editingArticle} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
        <Card>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl text-[#1E2B2B] font-montserrat font-bold">Newsroom</h2>
                    <p className="text-sm text-gray-500">Manage press releases and public announcements.</p>
                </div>
                <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                    <div className="relative flex-1 lg:min-w-[200px]">
                        <input 
                            type="text" 
                            placeholder="Search articles..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border-gray-300 rounded-md p-2 pl-8 text-sm focus:ring-[#1075BB]"
                        />
                        <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <select 
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="border-gray-300 rounded-md p-2 text-sm focus:ring-[#1075BB]"
                    >
                        <option value="All">All Categories</option>
                        {categories.filter(Boolean).map(cat => (
                            <option key={`cat-filter-${cat}`} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border-gray-300 rounded-md p-2 text-sm focus:ring-[#1075BB]"
                    >
                        <option value="All">All Status</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Archived">Archived</option>
                    </select>
                    <Button variant="primary" onClick={() => handleOpenModal()}>
                        <span className="mr-2">+</span> New Article
                    </Button>
                </div>
            </div>
             <Table headers={tableHeaders}>
                {loading && <tr><td colSpan={5} className="text-center p-8 text-gray-500">Loading articles...</td></tr>}
                {!loading && filteredArticles.length === 0 && (
                    <tr><td colSpan={5} className="text-center p-8 text-gray-500 italic">No articles match your filters.</td></tr>
                )}
                {!loading && filteredArticles.map(article => (
                    <tr key={article.id} className="odd:bg-white even:bg-[#F0F7FC] hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden mr-3">
                                    <img src={article.imageUrl} alt="" className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <span className="font-semibold text-[#1E2B2B] line-clamp-1">{article.title}</span>
                                    {article.titleAm && <span className="text-xs text-gray-500 block">{article.titleAm}</span>}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{article.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <Tag status={article.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{new Date(article.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                                <Button variant="icon" size="sm" title="Edit" onClick={() => handleOpenModal(article)}>
                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                </Button>
                                <Button variant="icon" size="sm" title="Delete" className="!text-red-500 hover:bg-red-50" onClick={() => handleDelete(article.id.toString())}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
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

export default NewsManagement;
