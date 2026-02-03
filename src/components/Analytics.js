import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#4f46e5', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

const Analytics = ({ expenses, income }) => {
    // Category data for Pie Chart
    const categoryData = expenses.reduce((acc, curr) => {
        const existing = acc.find(item => item.name === curr.category);
        if (existing) {
            existing.value += curr.amount;
        } else {
            acc.push({ name: curr.category, value: curr.amount });
        }
        return acc;
    }, []);

    // Summary data for Bar Chart
    const summaryData = [
        { name: 'Income', amount: income.reduce((sum, i) => sum + i.amount, 0) },
        { name: 'Expenses', amount: expenses.reduce((sum, e) => sum + e.amount, 0) }
    ];

    return (
        <div className="analytics-section">
            <div className="chart-container">
                <h3>Expenses by Category</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <PieChart>
                        <Pie
                            data={categoryData}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h3>Income vs Expenses</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={summaryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                            {summaryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.name === 'Income' ? '#10b981' : '#ef4444'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Analytics;
