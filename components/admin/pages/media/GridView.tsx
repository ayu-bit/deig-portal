
// FIX: Moved React import to the top of the file before other imports. This ensures that the base JSX namespace is established before any augmentations, resolving errors where standard HTML elements were not recognized in JSX.
import * as React from 'react';
// FIX: Add import for `types.ts` to ensure global JSX namespace augmentation is applied correctly, resolving errors where standard HTML elements were not recognized in JSX.
import '../../../../types';
import type { MediaAsset } from '../../../../types';
import Checkbox from '../../ui/Checkbox';

interface GridViewProps {
    assets: MediaAsset[];
    selectedAssets: Set<string>;
    onSelectionChange: (assetId: string) => void;
}

const FileTypeIcon: React.FC<{ type: MediaAsset['type'] }> = ({ type }) => {
    // Icons for non-image files
    switch (type) {
        case 'Video':
            return <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>;
        case 'Document':
            return <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;
        case 'Archive':
            return <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>;
        default:
            return null;
    }
};


const GridView: React.FC<GridViewProps> = ({ assets, selectedAssets, onSelectionChange }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
            {assets.map(asset => (
                <div 
                    key={asset.id} 
                    className={`relative group rounded-lg overflow-hidden border-2 ${selectedAssets.has(asset.id) ? 'border-[#1075BB]' : 'border-transparent'} transition-all duration-200 cursor-pointer`}
                    onClick={() => onSelectionChange(asset.id)}
                >
                    <div className="absolute top-2 left-2 z-10">
                        <Checkbox 
                            checked={selectedAssets.has(asset.id)}
                            onChange={() => onSelectionChange(asset.id)} 
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <div className="aspect-square bg-[#F0F7FC] flex items-center justify-center">
                        {asset.type === 'Image' ? (
                             <img src={asset.thumbnailUrl} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                            <FileTypeIcon type={asset.type} />
                        )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-xs text-white font-semibold truncate" title={asset.name}>{asset.name}</p>
                        <p className="text-xs text-gray-300">{asset.size}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GridView;
