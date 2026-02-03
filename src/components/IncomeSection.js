import React, { useState } from 'react';

const IncomeSection = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        description: '',
        amount: '',
        period: 'Monthly',
        startDate: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (income.description && income.amount) {
            onAddIncome({
                ...income,
                amount: parseFloat(income.amount),
                id: Date.now()
            });
            setIncome({
                description: '',
                amount: '',
                period: 'Monthly',
                startDate: new Date().toISOString().split('T')[0]
            });
        }
    };

    return (
        <div className="income-form">
            <h2>Add Income</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="e.g. Salary, Freelance"
                        value={income.description}
                        onChange={(e) => setIncome({ ...income, description: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={income.amount}
                        onChange={(e) => setIncome({ ...income, amount: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Period</label>
                    <select
                        value={income.period}
                        onChange={(e) => setIncome({ ...income, period: e.target.value })}
                    >
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="One-time">One-time</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={income.startDate}
                        onChange={(e) => setIncome({ ...income, startDate: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn-primary">Add Income</button>
            </form>
        </div>
    );
};

export default IncomeSection;
