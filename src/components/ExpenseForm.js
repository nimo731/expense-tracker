import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.description && expense.amount && expense.category) {
      onAddExpense({
        ...expense,
        amount: parseFloat(expense.amount)
      });
      setExpense({
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <div className="expense-form">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={expense.description}
            onChange={(e) => setExpense({ ...expense, description: e.target.value })}
            required
            placeholder="e.g. Grocery"
          />
        </div>
        <div className="form-group">
          <label>Amount (KSh)</label>
          <input
            type="number"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={expense.category}
            onChange={(e) => setExpense({ ...expense, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={expense.date}
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
          />
        </div>
        <button type="submit" className="btn-primary">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;