import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StatsData {
    name: string;
    count: number;
}

interface LineupStatsProps {
    dayStats: StatsData[];
    categoryStats: StatsData[];
    chartType: 'day' | 'category';
}

export const LineupStats: React.FC<LineupStatsProps> = ({
    dayStats,
    categoryStats,
    chartType
}) => {
    const data = chartType === 'day' ? dayStats : categoryStats;
    const color = chartType === 'day' ? '#8884d8' : '#4ade80';
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke={color} />
                <YAxis stroke={color} />
                <Tooltip 
                    contentStyle={{backgroundColor: 'rgba(0, 0, 0, 0.8)', borderColor: color}}
                    itemStyle={{color: '#fff'}}
                    labelStyle={{color: color}}
                />
                <Bar dataKey="count" fill={color} />
            </BarChart>
        </ResponsiveContainer>
    );
};