
import * as React from 'react';
import '../../../types';
import { getIndustries, updateIndustry, createIndustry, deleteIndustry, uploadMedia } from '../../../services/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Tag from '../ui/Tag';
import RichTextEditor from '../ui/RichTextEditor';
import type { Industry } from '../../../types';
import { useToast } from '../../../contexts/ToastContext';

// Simple Image Upload Component
const ImageUploadField: React.FC<{
    label: string;
    value: string;
    onChange: (url: string) => void;
    placeholder?: string;
}> = ({ label, value, onChange, placeholder }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = React.useState(false);
    const { addToast } = useToast();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await uploadMedia(formData);
            onChange(response.url);
            addToast('Image uploaded successfully', 'success');
        } catch (error) {
            addToast('Failed to upload image.', 'error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={value} 
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder || "Image URL"}
                    className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                />
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
                <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                >
                    {uploading ? '...' : 'Upload'}
                </Button>
            </div>
            {value && (
                <div className="mt-2 relative group w-24 h-24">
                    <img src={value} alt="Preview" className="w-24 h-24 object-cover rounded-md border" />
                    <button 
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            )}
        </div>
    );
};

// Generic Item List Editor (for Products/Capabilities)
const ItemListEditor: React.FC<{
    title: string;
    items: any[];
    onChange: (items: any[]) => void;
    renderItemForm: (item: any, updateItem: (updated: any) => void) => React.ReactNode;
    newItemTemplate: any;
}> = ({ title, items, onChange, renderItemForm, newItemTemplate }) => {
    const addItem = () => {
        onChange([...items, { ...newItemTemplate, _tempId: Date.now() }]);
    };

    const removeItem = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, updated: any) => {
        const newItems = [...items];
        newItems[index] = updated;
        onChange(newItems);
    };

    return (
        <div className="space-y-4 border rounded-md p-4 bg-gray-50/50">
            <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-[#1075BB] uppercase tracking-wider">{title}</h4>
                <Button type="button" variant="secondary" size="sm" onClick={addItem}>+ Add Item</Button>
            </div>
            {items.length === 0 ? (
                <p className="text-sm text-gray-500 italic text-center py-4">No items added yet.</p>
            ) : (
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div key={item._tempId || index} className="bg-white p-4 rounded-md border shadow-sm relative group">
                            <button 
                                type="button"
                                onClick={() => removeItem(index)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                            {renderItemForm(item, (updated) => updateItem(index, updated))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Tab Component
const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            active ? 'border-[#1075BB] text-[#1075BB]' : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
    >
        {children}
    </button>
);

const IndustryFormModal: React.FC<{
    industry: Partial<Industry> | null;
    onClose: () => void;
    onSave: (industry: Partial<Industry>) => void;
}> = ({ industry, onClose, onSave }) => {
    const [formData, setFormData] = React.useState<Partial<Industry>>(industry || {
        capabilities: [],
        products: [],
        gallery: [],
        technicalHighlights: [],
        status: 'Draft'
    });
    const [activeTab, setActiveTab] = React.useState<'general' | 'content' | 'media' | 'contact'>('general');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleComplexChange = (key: string, value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
                    <h3 className="text-xl font-bold font-montserrat text-[#1E2B2B]">
                        {industry?.id ? `Edit Division: ${industry.acronym}` : 'New Division'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                {/* Tabs */}
                <div className="flex border-b border-gray-200 px-6">
                    <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')}>General Info</TabButton>
                    <TabButton active={activeTab === 'content'} onClick={() => setActiveTab('content')}>Content & details</TabButton>
                    <TabButton active={activeTab === 'media'} onClick={() => setActiveTab('media')}>Media Assets</TabButton>
                    <TabButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')}>Contact & Location</TabButton>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* General Tab */}
                    {activeTab === 'general' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input name="name" value={formData.name || ''} onChange={handleChange} className="input-field w-full border border-gray-300 rounded-md p-2 focus:ring-[#1075BB]" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Acronym</label>
                                    <input name="acronym" value={formData.acronym || ''} onChange={handleChange} className="input-field w-full border border-gray-300 rounded-md p-2 focus:ring-[#1075BB]" required />
                                </div>
                            </div>
                            {!industry?.id && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ID (Unique Key)</label>
                                    <input name="id" value={formData.id || ''} onChange={handleChange} className="input-field w-full border border-gray-300 rounded-md p-2 focus:ring-[#1075BB]" placeholder="e.g. gaei" required />
                                    <p className="text-xs text-gray-500 mt-1">Lower case, no spaces. Cannot be changed later.</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                                <RichTextEditor 
                                    value={formData.description || ''} 
                                    onChange={(value) => handleComplexChange('description', value)}
                                    rows={4}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Focus</label>
                                    <input name="focus" value={formData.focus || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select name="status" value={formData.status || 'Draft'} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 bg-white">
                                        <option value="Published">Published</option>
                                        <option value="Draft">Draft</option>
                                        <option value="Archived">Archived</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content Tab */}
                    {activeTab === 'content' && (
                        <div className="space-y-6">
                            <ItemListEditor 
                                title="Products & Services" 
                                items={formData.products || []}
                                onChange={(items) => handleComplexChange('products', items)}
                                newItemTemplate={{ name: '', description: '', imageUrl: '' }}
                                renderItemForm={(item, updateItem) => (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Product Name</label>
                                                <input 
                                                    value={item.name} 
                                                    onChange={(e) => updateItem({ ...item, name: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                                    placeholder="Product Name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                                                <textarea 
                                                    value={item.description} 
                                                    onChange={(e) => updateItem({ ...item, description: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                                    rows={3}
                                                    placeholder="Short description..."
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <ImageUploadField 
                                                label="Product Image"
                                                value={item.imageUrl || ''}
                                                onChange={(url) => updateItem({ ...item, imageUrl: url })}
                                            />
                                        </div>
                                    </div>
                                )}
                            />

                            <ItemListEditor 
                                title="Capabilities" 
                                items={formData.capabilities || []}
                                onChange={(items) => handleComplexChange('capabilities', items)}
                                newItemTemplate={{ name: '', description: '' }}
                                renderItemForm={(item, updateItem) => (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Capability Name</label>
                                            <input 
                                                value={item.name} 
                                                onChange={(e) => updateItem({ ...item, name: e.target.value })}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                                placeholder="e.g. Advanced Machining"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Detailed Description</label>
                                            <textarea 
                                                value={item.description} 
                                                onChange={(e) => updateItem({ ...item, description: e.target.value })}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                                rows={3}
                                                placeholder="Details about this capability..."
                                            />
                                        </div>
                                    </div>
                                )}
                            />

                            <ItemListEditor 
                                title="Technical Highlights" 
                                items={formData.technicalHighlights || []}
                                onChange={(items) => handleComplexChange('technicalHighlights', items)}
                                newItemTemplate={{ title: '', description: '' }}
                                renderItemForm={(item, updateItem) => (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Highlight Title</label>
                                            <input 
                                                value={item.title} 
                                                onChange={(e) => updateItem({ ...item, title: e.target.value })}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                                placeholder="e.g. ISO 9001 Certified"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                                            <input 
                                                value={item.description} 
                                                onChange={(e) => updateItem({ ...item, description: e.target.value })}
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                                placeholder="Brief detail..."
                                            />
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    )}

                    {/* Media Tab */}
                    {activeTab === 'media' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md border">
                                    <div className="space-y-4">
                                        <p className="text-xs text-gray-500">Add multiple images to the division gallery. Supports direct upload or external URLs.</p>
                                        <ImageUploadField 
                                            label="Quick Add Image"
                                            value=""
                                            onChange={(url) => {
                                                if (url) handleComplexChange('gallery', [...(formData.gallery || []), url]);
                                            }}
                                            placeholder="Upload or paste URL to add to gallery"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-medium text-gray-500">Current Gallery ({formData.gallery?.length || 0})</label>
                                        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded bg-white">
                                            {formData.gallery?.map((url, idx) => (
                                                <div key={idx} className="relative group">
                                                    <img src={url} alt="" className="w-12 h-12 object-cover rounded border" />
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleComplexChange('gallery', formData.gallery?.filter((_, i) => i !== idx))}
                                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                    </button>
                                                </div>
                                            ))}
                                            {(!formData.gallery || formData.gallery.length === 0) && (
                                                <p className="text-xs text-gray-400 italic">No images in gallery</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">3D Model URL (.glb)</label>
                                    <input name="model3d" value={formData.model3d || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 text-sm" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (mp4)</label>
                                    <input name="video" value={formData.video || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 text-sm" placeholder="https://..." />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Contact Tab */}
                    {activeTab === 'contact' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                                    <input name="contactPerson" value={formData.contactPerson || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input name="contactEmail" value={formData.contact?.email || ''} onChange={(e) => handleComplexChange('contact', { ...formData.contact, email: e.target.value })} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input name="contactPhone" value={formData.contact?.phone || ''} onChange={(e) => handleComplexChange('contact', { ...formData.contact, phone: e.target.value })} className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Facility Location</label>
                                    <input name="locationStr" value={formData.facilityInfo?.location || ''} onChange={(e) => handleComplexChange('facilityInfo', { ...formData.facilityInfo, location: e.target.value })} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Area Size</label>
                                    <input name="areaStr" value={formData.facilityInfo?.area || ''} onChange={(e) => handleComplexChange('facilityInfo', { ...formData.facilityInfo, area: e.target.value })} className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                            </div>
                        </div>
                    )}
                </form>

                <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t rounded-b-lg">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="primary" onClick={handleSubmit}>Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

const IndustryManagement: React.FC = () => {
    const [industries, setIndustries] = React.useState<Industry[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingIndustry, setEditingIndustry] = React.useState<Partial<Industry> | null>(null);
    const { addToast } = useToast();

    const fetchIndustries = React.useCallback(async () => {
        try {
            setLoading(true);
            const data = await getIndustries();
            setIndustries(data);
        } catch (error) {
            addToast('Failed to load industries.', 'error');
        } finally {
            setLoading(false);
        }
    }, [addToast]);
    
    React.useEffect(() => {
        fetchIndustries();
    }, [fetchIndustries]);

    const handleSave = async (industry: Partial<Industry>) => {
        try {
            // Check if we are updating (editingIndustry was set and has ID) OR create (if user provided an ID)
            const isUpdate = industries.some(ind => ind.id === industry.id);
            
            if (isUpdate && industry.id) {
                await updateIndustry(industry.id, industry);
                addToast('Industry updated successfully', 'success');
            } else {
                await createIndustry(industry);
                addToast('Industry created successfully', 'success');
            }
            fetchIndustries();
            setIsModalOpen(false);
            setEditingIndustry(null);
        } catch (error) {
            addToast('Failed to save industry.', 'error');
        }
    };
    
    const handleDelete = async (id: string, name: string) => {
        if (!window.confirm(`Are you sure you want to delete the division "${name}"? This action cannot be undone.`)) return;

        try {
            await deleteIndustry(id);
            addToast('Industry division deleted successfully', 'success');
            fetchIndustries();
        } catch (error) {
            addToast('Failed to delete industry division.', 'error');
        }
    };
    
    const handleOpenModal = (industry?: Industry) => {
        setEditingIndustry(industry || null);
        setIsModalOpen(true);
    };

    return (
        <>
            {isModalOpen && <IndustryFormModal industry={editingIndustry} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
            <Card title="Industry Divisions Management" className="shadow-lg">
                <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <p className="text-gray-500">Manage detailed profiles for all industrial engineering groups.</p>
                        <div className="text-sm text-gray-400 mt-1">Total Divisions: {industries.length}</div>
                    </div>
                    <Button variant="primary" onClick={() => handleOpenModal()}>
                        <span className="mr-2">+</span> New Division
                    </Button>
                </div>
                
                {loading ? <div className="text-center p-8">Loading Divisions...</div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {industries.map(industry => (
                        <div key={industry.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
                            <div className="h-24 bg-[#1075BB] relative">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <div className="absolute -bottom-6 left-6 w-16 h-16 bg-white rounded-md shadow-md flex items-center justify-center p-1">
                                    {/* Placeholder Logo */}
                                    <div className="text-[#1075BB] font-black text-xs text-center">{industry.acronym}</div>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <Tag status={industry.status} />
                                </div>
                            </div>
                            <div className="p-6 pt-10 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-[#1E2B2B]">{industry.name}</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mt-1">{industry.acronym}</p>
                                <p className="text-sm text-gray-600 mt-3 line-clamp-2">{industry.description}</p>
                                
                                <div className="mt-auto pt-6 flex justify-between items-center">
                                    <button 
                                        onClick={() => handleDelete(industry.id, industry.name)}
                                        className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center transition-colors"
                                        title="Delete Division"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        Delete
                                    </button>
                                    <button 
                                        onClick={() => handleOpenModal(industry)}
                                        className="text-[#1075BB] hover:text-[#0D629E] text-sm font-semibold flex items-center group/btn"
                                    >
                                        Manage Details <span className="ml-1 text-lg transform group-hover/btn:translate-x-1 transition-transform">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </Card>
        </>
    );
};

export default IndustryManagement;
