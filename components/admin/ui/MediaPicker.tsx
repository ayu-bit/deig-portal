
import React, { useState, useEffect } from 'react';
import { getMedia, uploadMedia } from '../../../services/api';
import type { MediaAsset, MediaType } from '../../../types';
import { Loader2, Search, X, Image as ImageIcon, Video, Check, Plus } from 'lucide-react';
import Button from '../ui/Button';

interface MediaPickerProps {
    onSelect: (url: string) => void;
    onClose: () => void;
    title?: string;
    allowedTypes?: MediaType[];
}

const MediaPicker: React.FC<MediaPickerProps> = ({ 
    onSelect, 
    onClose, 
    title = 'Select Media',
    allowedTypes = ['Image', 'Video'] 
}) => {
    const [assets, setAssets] = useState<MediaAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [uploading, setUploading] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const data = await getMedia();
                const filtered = data.filter(asset => allowedTypes.includes(asset.type));
                setAssets(filtered);
            } catch (error) {
                console.error("Failed to fetch media", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMedia();
    }, [allowedTypes]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        setUploading(true);
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        
        try {
            const newAsset = await uploadMedia(formData);
            setAssets(prev => [newAsset, ...prev]);
            setSelectedUrl(newAsset.url);
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setUploading(false);
        }
    };

    const filteredAssets = assets.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden border border-[#B3D6F0]">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h3 className="text-xl font-bold text-[#04253D]">{title}</h3>
                        <p className="text-xs text-gray-500">Choose an existing asset or upload a new one.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-64">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                            type="text"
                            placeholder="Search assets..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#1075BB] outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <input 
                            type="file"
                            id="media-picker-upload"
                            className="hidden"
                            onChange={handleUpload}
                            accept={allowedTypes.includes('Image') && allowedTypes.includes('Video') ? 'image/*,video/*' : allowedTypes.includes('Image') ? 'image/*' : 'video/*'}
                        />
                        <Button 
                            variant="secondary" 
                            size="sm"
                            disabled={uploading}
                            onClick={() => document.getElementById('media-picker-upload')?.click()}
                        >
                            {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                            Upload New
                        </Button>
                        <Button 
                            disabled={!selectedUrl}
                            variant="primary"
                            size="sm"
                            onClick={() => selectedUrl && onSelect(selectedUrl)}
                        >
                            Confirm Selection
                        </Button>
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-4 bg-white">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3">
                            <Loader2 className="w-10 h-10 animate-spin text-[#1075BB]" />
                            <p className="text-gray-400">Loading library...</p>
                        </div>
                    ) : filteredAssets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                            <ImageIcon className="w-16 h-16 opacity-20" />
                            <p>No matching assets found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredAssets.map((asset) => (
                                <div 
                                    key={asset.id}
                                    onClick={() => setSelectedUrl(asset.url)}
                                    className={`relative group aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                                        selectedUrl === asset.url ? 'border-[#1075BB] ring-4 ring-[#1075BB]/10 shadow-lg' : 'border-transparent hover:border-gray-200'
                                    }`}
                                >
                                    {asset.type === 'Image' ? (
                                        <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                            <Video className="w-10 h-10 text-white/40" />
                                        </div>
                                    )}
                                    
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-gray-800 truncate max-w-[80%]">
                                            {asset.name}
                                        </div>
                                    </div>

                                    {selectedUrl === asset.url && (
                                        <div className="absolute top-2 right-2 bg-[#1075BB] text-white p-1 rounded-full shadow-lg scale-110">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MediaPicker;
