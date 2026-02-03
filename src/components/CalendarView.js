import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

const CalendarView = ({ expenses, income }) => {
    const getDayContent = ({ date, view }) => {
        if (view !== 'month') return null;

        const dateStr = format(date, 'yyyy-MM-dd');
        const dayExpenses = expenses.filter(e => e.date === dateStr);
        const dayIncome = income.filter(i => i.startDate === dateStr);

        if (dayExpenses.length === 0 && dayIncome.length === 0) return null;

        return (
            <div className="calendar-dots">
                {dayIncome.length > 0 && <div className="dot income"></div>}
                {dayExpenses.length > 0 && <div className="dot expense"></div>}
            </div>
        );
    };

    const onDateClick = (date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const dayExpenses = expenses.filter(e => e.date === dateStr);
        const dayIncome = income.filter(i => i.startDate === dateStr);

        if (dayExpenses.length > 0 || dayIncome.length > 0) {
            let message = `Activity for ${dateStr}:\n`;
            if (dayIncome.length > 0) {
                message += `Income: KSh ${dayIncome.reduce((sum, i) => sum + i.amount, 0).toFixed(2)}\n`;
            }
            if (dayExpenses.length > 0) {
                message += `Expenses: KSh ${dayExpenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}`;
            }
            alert(message);
        }
    };

    return (
        <div className="calendar-view">
            <h2>Transaction Calendar</h2>
            <Calendar
                tileContent={getDayContent}
                onClickDay={onDateClick}
            />
        </div>
    );
};

export default CalendarView;
