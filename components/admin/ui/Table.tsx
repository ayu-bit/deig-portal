
import * as React from 'react';
import '../../../types';

interface TableProps {
    headers: string[];
    children: React.ReactNode;
    selectionHeader?: React.ReactNode; // Explicitly handle elements like "Select All" checkboxes
}

const Table: React.FC<TableProps> = ({ headers, children, selectionHeader }) => {
    return (
        <div className="overflow-x-auto admin-scrollbar border border-brand-blue-200 rounded-lg">
            <table className="min-w-full font-roboto text-sm">
                <thead className="bg-[#1075BB]">
                    <tr>
                        {selectionHeader && (
                            <th scope="col" className="px-6 py-3 text-left w-12">
                                {selectionHeader}
                            </th>
                        )}
                        {headers.map((header, index) => (
                            <th 
                                key={index} 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {children}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
