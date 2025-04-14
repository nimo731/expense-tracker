import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredExpenses = expenses.filter(expense =>
    (expense.description?.toLowerCase() || '').includes(searchTerm) ||
    (expense.category?.toLowerCase() || '').includes(searchTerm)
  );

  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div className="container">
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
