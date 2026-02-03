import React from 'react';
import SearchBar from './SearchBar';

const ExpenseTable = ({ expenses, onSearch, onDelete }) => {
  return (
    <div className="expense-tracker-list">
      <SearchBar onSearch={onSearch} />

      {/* Table View (Hidden on Mobile) */}
      <div className="table-responsive desktop-only">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="5">No transactions found for this period.</td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>{expense.description}</td>
                  <td className="amount-cell">KSh {typeof expense.amount === 'number' ? expense.amount.toFixed(2) : expense.amount}</td>
                  <td><span className="category-tag">{expense.category}</span></td>
                  <td>
                    <button className="delete-btn" onClick={() => onDelete(expense.id)} title="Delete">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card View (Visible on Mobile) */}
      <div className="mobile-card-list mobile-only">
        {expenses.length === 0 ? (
          <p className="no-data-msg">No transactions found for this period.</p>
        ) : (
          expenses.map((expense) => (
            <div key={expense.id} className="transaction-card">
              <div className="card-header">
                <span className="card-date">{expense.date}</span>
                <span className="card-category-tag">{expense.category}</span>
              </div>
              <div className="card-body">
                <div className="card-info">
                  <div className="card-desc">{expense.description}</div>
                </div>
                <div className="card-amount">KSh {expense.amount.toFixed(2)}</div>
              </div>
              <button className="card-delete-btn" onClick={() => onDelete(expense.id)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseTable;