
// FIX: Reordered imports to ensure global JSX namespace augmentation from `types.ts` is applied before React is imported. This resolves errors where standard HTML elements were not recognized in JSX.
import '../../../types';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getMedia, uploadMedia, deleteMedia } from '../../../services/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import GridView from './media/GridView';
import ListView from './media/ListView';
import type { MediaAsset } from '../../../types';
import { useToast } from '../../../contexts/ToastContext';

type ViewMode = 'grid' | 'list';

const UploadModal: React.FC<{ onClose: () => void, onUpload: (files: FileList) => void }> = ({ onClose, onUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-brand-blue-900 mb-4">Upload Media</h3>
                <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center bg-[#F0F7FC] cursor-pointer hover:border-[#1075BB] hover:bg-blue-50"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); if(e.dataTransfer.files.length) { onUpload(e.dataTransfer.files); onClose(); } }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        onChange={(e) => { if(e.target.files?.length) { onUpload(e.target.files); onClose(); } }} 
                    />
                    <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    <p className="mt-2 text-sm text-gray-500">
                        <span className="font-semibold text-[#1075BB]">Click to upload</span> or drag files here.
                    </p>
                </div>
                <div className="mt-4 flex justify-end">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                </div>
            </div>
        </div>
    );
};

const MediaManager: React.FC = () => {
    const [assets, setAssets] = useState<MediaAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All types');
    const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set());
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const { addToast } = useToast();

    const fetchMedia = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getMedia();
            setAssets(data);
        } catch (error) {
            addToast('Failed to load media.', 'error');
        } finally {
            setLoading(false);
        }
    }, [addToast]);
    
    useEffect(() => {
        fetchMedia();
    }, [fetchMedia]);

    const handleSelectionChange = (assetId: string) => {
        setSelectedAssets(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(assetId)) {
                newSelection.delete(assetId);
            } else {
                newSelection.add(assetId);
            }
            return newSelection;
        });
    };

    const filteredAssets = assets.filter(asset => {
        const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'All types' || asset.type === typeFilter;
        return matchesSearch && matchesType;
    });

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedAssets(new Set(filteredAssets.map(a => a.id)));
        } else {
            setSelectedAssets(new Set());
        }
    };

    const handleFileUpload = async (files: FileList) => {
        if (!files || files.length === 0) return;
        const formData = new FormData();
        formData.append('file', files[0]);
        try {
            await uploadMedia(formData);
            addToast('File uploaded successfully', 'success');
            fetchMedia();
        } catch (error) {
            addToast('File upload failed.', 'error');
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedAssets.size === 0) return;
        if (window.confirm(`Are you sure you want to delete ${selectedAssets.size} item(s)?`)) {
            try {
                await deleteMedia(Array.from(selectedAssets));
                addToast(`${selectedAssets.size} item(s) deleted.`, 'success');
                setSelectedAssets(new Set());
                fetchMedia();
            } catch (error) {
                addToast('Failed to delete items.', 'error');
            }
        }
    };
    
    const isAllSelected = selectedAssets.size === filteredAssets.length && filteredAssets.length > 0;
    const isIndeterminate = selectedAssets.size > 0 && selectedAssets.size < filteredAssets.length;

    return (
        <div className="space-y-6">
            {isUploadModalOpen && <UploadModal onClose={() => setIsUploadModalOpen(false)} onUpload={handleFileUpload} />}
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <div>
                    <h2 className="text-xl text-[#04253D] font-montserrat font-bold">Media Manager</h2>
                    <p className="text-sm text-gray-500">Organize and manage your digital assets.</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <Button variant="primary" onClick={() => setIsUploadModalOpen(true)}>
                        <span className="mr-2">+</span> Upload Media
                    </Button>
                 </div>
            </div>

            <Card>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <input 
                                type="text" 
                                placeholder="Search media..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border-gray-300 rounded-md py-1.5 pl-8 pr-3 text-[#04253D] text-sm focus:ring-1 focus:ring-[#1075BB]" 
                            />
                            <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <select 
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="bg-white border-gray-300 text-[#04253D] text-sm rounded-md focus:ring-[#1075BB] py-1.5"
                        >
                            <option value="All types">All types</option>
                            <option value="Image">Image</option>
                            <option value="Video">Video</option>
                            <option value="Document">Document</option>
                        </select>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center bg-gray-100 border border-gray-200 rounded-md p-0.5">
                            <button 
                                onClick={() => setViewMode('grid')} 
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-brand-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                title="Grid View"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            </button>
                            <button 
                                onClick={() => setViewMode('list')} 
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-brand-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                title="List View"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </button>
                        </div>
                        
                        {selectedAssets.size > 0 && (
                             <Button variant="secondary" size="sm" className="!border-red-300 !text-red-600 hover:!bg-red-50" onClick={handleDeleteSelected}>
                                Delete ({selectedAssets.size})
                            </Button>
                        )}
                    </div>
                </div>

                {loading ? <div className="p-10 text-center text-gray-500">Loading media library...</div> : (
                    <>
                        {filteredAssets.length === 0 ? (
                            <div className="text-center py-10 text-gray-500 italic">No media assets match your filters.</div>
                        ) : (
                            viewMode === 'grid' ? (
                                <GridView assets={filteredAssets} selectedAssets={selectedAssets} onSelectionChange={handleSelectionChange} />
                            ) : (
                                <ListView assets={filteredAssets} selectedAssets={selectedAssets} onSelectionChange={handleSelectionChange} onSelectAll={handleSelectAll} isAllSelected={isAllSelected} isIndeterminate={isIndeterminate} />
                            )
                        )}
                    </>
                )}
            </Card>
        </div>
    );
};

export default MediaManager;
