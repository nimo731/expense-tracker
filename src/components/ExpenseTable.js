import React from 'react';
import SearchBar from './SearchBar';

const ExpenseTable = ({ expenses, onSearch, onDelete }) => {
  return (
    <div className="expense-table-container">
      <SearchBar onSearch={onSearch} />
      <table className="expense-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="4">No expenses found. Add some!</td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr key={expense.id}>
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
  );
};

export default ExpenseTable;