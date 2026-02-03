import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import IncomeSection from './components/IncomeSection';
import SummaryView from './components/SummaryView';
import CalendarView from './components/CalendarView';
import Analytics from './components/Analytics';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewPeriod, setViewPeriod] = useState('Monthly'); // 'Weekly' or 'Monthly'

  // Load data from localStorage on mount (optional but good for UX)
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedIncome = localStorage.getItem('income');
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedIncome) setIncome(JSON.parse(savedIncome));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('income', JSON.stringify(income));
  }, [expenses, income]);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };

  const addIncome = (newIncome) => {
    setIncome([...income, { ...newIncome, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter Logic based on Period
  const getFilteredData = () => {
    const now = new Date();
    let start, end;

    if (viewPeriod === 'Weekly') {
      start = startOfWeek(now);
      end = endOfWeek(now);
    } else {
      start = startOfMonth(now);
      end = endOfMonth(now);
    }

    const filteredExpenses = expenses.filter(e => {
      const date = parseISO(e.date);
      return isWithinInterval(date, { start, end });
    });

    const filteredIncome = income.filter(i => {
      const date = parseISO(i.startDate);
      return isWithinInterval(date, { start, end });
    });

    return { filteredExpenses, filteredIncome };
  };

  const { filteredExpenses, filteredIncome } = getFilteredData();

  const totalExpense = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncome = filteredIncome.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBalance = totalIncome - totalExpense;

  // Search filtered view for the table
  const searchFilteredExpenses = filteredExpenses.filter(expense =>
    (expense.description?.toLowerCase() || '').includes(searchTerm) ||
    (expense.category?.toLowerCase() || '').includes(searchTerm)
  );

  const exportCSV = () => {
    const headers = ['Type', 'Description', 'Amount', 'Category/Period', 'Date'];
    const rows = [
      ...income.map(i => ['Income', i.description, i.amount, i.period, i.startDate]),
      ...expenses.map(e => ['Expense', e.description, e.amount, e.category, e.date])
    ];

    let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `finance_report_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <h1>Finance Tracker Pro</h1>

      <div className="period-toggle">
        <button
          className={`toggle-btn ${viewPeriod === 'Weekly' ? 'active' : ''}`}
          onClick={() => setViewPeriod('Weekly')}
        >
          Weekly View
        </button>
        <button
          className={`toggle-btn ${viewPeriod === 'Monthly' ? 'active' : ''}`}
          onClick={() => setViewPeriod('Monthly')}
        >
          Monthly View
        </button>
      </div>

      <div className="container">
        <SummaryView
          incomeTotal={totalIncome}
          expenseTotal={totalExpense}
          savings={remainingBalance}
          period={viewPeriod}
        />

        <div className="form-section">
          <IncomeSection onAddIncome={addIncome} />
          <ExpenseForm onAddExpense={addExpense} />
        </div>

        <CalendarView expenses={expenses} income={income} />

        <Analytics expenses={filteredExpenses} income={filteredIncome} />

        <div className="expense-table-container">
          <h2>Transaction History ({viewPeriod})</h2>
          <ExpenseTable
            expenses={searchFilteredExpenses}
            onSearch={handleSearch}
            onDelete={deleteExpense}
          />
        </div>

        <div className="footer-actions">
          <button className="export-btn" onClick={exportCSV}>Export as CSV</button>
        </div>
      </div>
    </div>
  );
}

export default App;
