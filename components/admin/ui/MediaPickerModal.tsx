
import React, { useState, useEffect, useCallback } from 'react';
import '../../../types';
import { getMedia, uploadMedia } from '../../../services/api';
import Button from './Button';
import type { MediaAsset } from '../../../types';
import { useToast } from '../../../contexts/ToastContext';
import { Search, Loader2, X, CheckCircle2 } from 'lucide-react';

interface MediaPickerModalProps {
    onClose: () => void;
    onSelect: (asset: MediaAsset) => void;
    title?: string;
    allowedTypes?: MediaAsset['type'][];
}

const MediaPickerModal: React.FC<MediaPickerModalProps> = ({ 
    onClose, 
    onSelect, 
    title = "Select Media", 
    allowedTypes = ['Image', 'Video'] 
}) => {
    const [assets, setAssets] = useState<MediaAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All types');
    const [uploading, setUploading] = useState(false);
    const { addToast } = useToast();

    const fetchMedia = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getMedia();
            setAssets(data);
        } catch (error) {
            addToast('Failed to load media library.', 'error');
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        fetchMedia();
    }, [fetchMedia]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const newAsset = await uploadMedia(formData);
            addToast('File uploaded successfully', 'success');
            onSelect(newAsset);
        } catch (error) {
            addToast('File upload failed.', 'error');
        } finally {
            setUploading(false);
        }
    };

    const filteredAssets = assets.filter(asset => {
        const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'All types' || asset.type === typeFilter;
        const isAllowed = allowedTypes.includes(asset.type);
        return matchesSearch && matchesType && isAllowed;
    });

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
                    <h3 className="text-lg font-bold text-brand-blue-900 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        {title}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-4 bg-gray-50 border-b flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-2 flex-1 min-w-[200px]">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                            <input 
                                type="text"
                                placeholder="Search library..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand-blue-500 outline-none"
                            />
                        </div>
                        <select 
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white outline-none"
                        >
                            <option value="All types">All types</option>
                            {allowedTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <input 
                            type="file" 
                            id="media-picker-upload" 
                            className="hidden" 
                            onChange={handleFileUpload}
                            accept={allowedTypes.includes('Image') ? "image/*" : "" + (allowedTypes.includes('Video') ? ",video/*" : "")}
                        />
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            disabled={uploading}
                            onClick={() => document.getElementById('media-picker-upload')?.click()}
                        >
                            {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : '+'} Upload New
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 min-h-[300px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-2">
                            <Loader2 className="w-8 h-8 animate-spin" />
                            <p>Scanning library...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredAssets.map(asset => (
                                <div 
                                    key={asset.id}
                                    onClick={() => onSelect(asset)}
                                    className="group relative aspect-square bg-[#F0F7FC] rounded-lg border-2 border-transparent hover:border-brand-blue-500 cursor-pointer overflow-hidden transition-all shadow-sm"
                                >
                                    {asset.type === 'Image' ? (
                                        <img src={asset.thumbnailUrl} alt={asset.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-2 text-center">
                                            <div className="w-12 h-12 rounded-full bg-brand-blue-100 flex items-center justify-center text-brand-blue-600">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>
                                            </div>
                                            <span className="text-[10px] font-medium text-gray-500 uppercase truncate w-full">{asset.name}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-brand-blue-900/0 group-hover:bg-brand-blue-900/20 transition-colors" />
                                    <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                                        <p className="text-[10px] text-white truncate">{asset.name}</p>
                                    </div>
                                </div>
                            ))}
                            {filteredAssets.length === 0 && (
                                <div className="col-span-full border-2 border-dashed border-gray-200 rounded-lg p-12 text-center text-gray-400">
                                    No matching media assets found in library.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-4 bg-gray-50 border-t flex justify-end">
                    <Button variant="secondary" onClick={onClose}>Close Library</Button>
                </div>
            </div>
        </div>
    );
};

export default MediaPickerModal;
