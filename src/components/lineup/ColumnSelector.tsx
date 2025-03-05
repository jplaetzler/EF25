import React from 'react';
import { ColumnPreferences } from '../../types/lineup-types';

interface ColumnSelectorProps {
    columnPreferences: ColumnPreferences;
    toggleColumnPreference: (column: keyof ColumnPreferences) => void;
}

export const ColumnSelector: React.FC<ColumnSelectorProps> = ({
    columnPreferences,
    toggleColumnPreference
}) => {
    return (
        <div className="bg-black/60 p-5 rounded-lg border border-purple-400/30 mb-6"
            style={{boxShadow: "0 0 10px rgba(128, 0, 255, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)"}}>
            <h4 className="font-semibold mb-4 text-purple-300" style={{textShadow: "0 0 3px rgba(128, 0, 255, 0.5)"}}>
                Include Columns:
            </h4>
            <div className="flex flex-wrap gap-6">
                <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={columnPreferences.name}
                        onChange={() => toggleColumnPreference('name')}
                        className="mr-2 h-5 w-5 bg-black/50 border-green-400 checked:bg-green-600"
                    />
                    <span className="text-green-200" style={{textShadow: "0 0 3px rgba(0, 255, 128, 0.5)"}}>Artist Name</span>
                </label>
                <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={columnPreferences.category}
                        onChange={() => toggleColumnPreference('category')}
                        className="mr-2 h-5 w-5 bg-black/50 border-blue-400 checked:bg-blue-600"
                    />
                    <span className="text-blue-200" style={{textShadow: "0 0 3px rgba(0, 128, 255, 0.5)"}}>Category</span>
                </label>
                <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={columnPreferences.day}
                        onChange={() => toggleColumnPreference('day')}
                        className="mr-2 h-5 w-5 bg-black/50 border-purple-400 checked:bg-purple-600"
                    />
                    <span className="text-purple-200" style={{textShadow: "0 0 3px rgba(128, 0, 255, 0.5)"}}>Day</span>
                </label>
            </div>
        </div>
    );
};