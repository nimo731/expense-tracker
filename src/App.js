import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
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

  const exportPDF = () => {
    const doc = new jsPDF();
    const dateStr = format(new Date(), 'yyyy-MM-dd HH:mm');

    // Header
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229); // Primary color #4f46e5
    doc.text('Finance Tracker Pro Report', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Text secondary #64748b
    doc.text(`Generated on: ${dateStr}`, 14, 28);
    doc.text(`View Period: ${viewPeriod}`, 14, 33);

    // Summary Section
    doc.setFontSize(14);
    doc.setTextColor(30, 41, 59); // Text primary #1e293b
    doc.text('Financial Summary', 14, 45);

    autoTable(doc, {
      startY: 50,
      head: [['Metric', 'Amount (KSh)']],
      body: [
        ['Total Income', totalIncome.toFixed(2)],
        ['Total Expenses', totalExpense.toFixed(2)],
        ['Remaining Balance', remainingBalance.toFixed(2)],
      ],
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] },
    });

    // Transactions Table
    doc.text('Transaction History', 14, doc.lastAutoTable.finalY + 15);

    const tableData = [
      ...filteredIncome.map(i => [i.startDate, i.description, `+${i.amount.toFixed(2)}`, i.period, 'Income']),
      ...filteredExpenses.map(e => [e.date, e.description, `-${e.amount.toFixed(2)}`, e.category, 'Expense'])
    ].sort((a, b) => new Date(b[0]) - new Date(a[0]));

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Date', 'Description', 'Amount', 'Category/Period', 'Type']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [139, 92, 246] }, // Accent color #8b5cf6
      alternateRowStyles: { fillColor: [248, 250, 252] },
    });

    doc.save(`finance_report_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
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
          <button className="export-btn" onClick={exportCSV}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export as CSV
          </button>
          <button className="export-btn" onClick={exportPDF}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
