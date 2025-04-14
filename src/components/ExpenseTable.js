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
            expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.description}</td>
                <td>KSh{typeof expense.amount === 'number' ? expense.amount.toFixed(2) : expense.amount}</td>
                <td>{expense.category}</td>
                <td>
                  <button onClick={() => onDelete(index)}>Delete</button>
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