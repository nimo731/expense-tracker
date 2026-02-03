import React from 'react';

const SummaryView = ({ incomeTotal, expenseTotal, savings, period }) => {
    return (
        <div className="stats-container">
            <div className="stat-card income">
                <div className="stat-label">Total Income ({period})</div>
                <div className="stat-value income">KSh {incomeTotal.toFixed(2)}</div>
            </div>
            <div className="stat-card expense">
                <div className="stat-label">Total Expenses ({period})</div>
                <div className="stat-value expense">KSh {expenseTotal.toFixed(2)}</div>
            </div>
            <div className="stat-card balance">
                <div className="stat-label">Remaining Balance</div>
                <div className="stat-value balance">KSh {savings.toFixed(2)}</div>
            </div>
        </div>
    );
};

export default SummaryView;
