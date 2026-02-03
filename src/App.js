import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredExpenses = expenses.filter(expense =>
    (expense.description?.toLowerCase() || '').includes(searchTerm) ||
    (expense.category?.toLowerCase() || '').includes(searchTerm)
  );

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const transactionCount = expenses.length;

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div className="container">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-label">Total Balance</div>
            <div className="stat-value">KSh {totalExpense.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Transactions</div>
            <div className="stat-value">{transactionCount}</div>
          </div>
        </div>

        <ExpenseForm onAddExpense={addExpense} />

        <ExpenseTable
          expenses={filteredExpenses}
          onSearch={handleSearch}
          onDelete={deleteExpense}
        />
      </div>
    </div>
  );
}

export default App;
