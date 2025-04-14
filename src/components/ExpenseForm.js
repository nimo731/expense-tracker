import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    description: '',
    amount: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.description && expense.amount && expense.category) {
      onAddExpense({
        ...expense,
        amount: parseFloat(expense.amount) // Convert string to number
      });
      setExpense({ description: '', amount: '', category: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          value={expense.description}
          onChange={(e) => setExpense({ ...expense, description: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          value={expense.category}
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
          required
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;