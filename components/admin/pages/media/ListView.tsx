
import * as React from 'react';
import '../../../../types';
import type { MediaAsset } from '../../../../types';
import Table from '../../ui/Table';
import Checkbox from '../../ui/Checkbox';

interface ListViewProps {
    assets: MediaAsset[];
    selectedAssets: Set<string>;
    onSelectionChange: (assetId: string) => void;
    onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isAllSelected: boolean;
    isIndeterminate: boolean;
}

const FileTypeIcon: React.FC<{ type: MediaAsset['type'], className?: string }> = ({ type, className = "w-10 h-10 text-gray-400" }) => {
    switch (type) {
        case 'Video':
            return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>;
        case 'Document':
            return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;
        case 'Archive':
             return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>;
        default:
            return null;
    }
};

const ListView: React.FC<ListViewProps> = ({ assets, selectedAssets, onSelectionChange, onSelectAll, isAllSelected, isIndeterminate }) => {
    const tableHeaders = ['File', 'Uploader', 'Size', 'Date Uploaded', 'Usage'];

    return (
        <Table 
            headers={tableHeaders} 
            selectionHeader={
                <Checkbox checked={isAllSelected} indeterminate={isIndeterminate} onChange={onSelectAll} />
            }
        >
            {assets.map(asset => (
                <tr key={asset.id} className={`hover:bg-gray-50 ${selectedAssets.has(asset.id) ? 'bg-blue-50' : 'odd:bg-white even:bg-[#F0F7FC]'}`}>
                    <td className="px-6 py-4 w-12">
                         <Checkbox checked={selectedAssets.has(asset.id)} onChange={() => onSelectionChange(asset.id)} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                                {asset.type === 'Image' ? (
                                    <img className="h-12 w-12 object-cover rounded-md" src={asset.thumbnailUrl} alt={asset.name} />
                                ) : (
                                    <FileTypeIcon type={asset.type} className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <div className="ml-4">
                                <div className="font-semibold text-[#1E2B2B]">{asset.name}</div>
                                <div className="text-xs text-gray-500">{asset.type}</div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{asset.uploadedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{asset.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{asset.uploadedAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                        {Array.isArray(asset.usage) ? asset.usage.join(', ') : '-'}
                    </td>
                </tr>
            ))}
        </Table>
    );
};

export default ListView;
