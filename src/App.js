import React, { useState } from 'react';
import './BudgetTracker.css';

const BudgetTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [balance, setBalance] = useState(0);

  const addExpense = (amount, category) => {
    setExpenses([...expenses, { amount, category }]);
    updateBalance();
  };

  const addIncome = (amount, source) => {
    setIncome([...income, { amount, source }]);
    updateBalance();
  };

  const updateBalance = () => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalIncome = income.reduce((sum, incomeItem) => sum + incomeItem.amount, 0);
    setBalance(totalIncome - totalExpenses);
  };

  const getExpensesByCategory = () => {
    return expenses.reduce((result, expense) => {
      if (!result[expense.category]) {
        result[expense.category] = [];
      }
      result[expense.category].push(expense);
      return result;
    }, {});
  };

  const renderExpensesByCategory = () => {
    const expensesByCategory = getExpensesByCategory();
    return Object.keys(expensesByCategory).map((category) => (
      <div key={category} className="expense-category">
        <h3>{category}</h3>
        <ul>
          {expensesByCategory[category].map((expense, index) => (
            <li key={index}>{expense.amount}</li>
          ))}
        </ul>
        <p>Total: {expensesByCategory[category].reduce((sum, expense) => sum + expense.amount, 0)}</p>
      </div>
    ));
  };

  return (
    <div className="budget-tracker">
      <h1>Budget Tracker</h1>
      <div className="balance">
        <h2>Current Balance: ${balance.toFixed(2)}</h2>
      </div>
      <div className="input-forms">
        <div className="expense-input">
          <h3>Add Expense</h3>
          <input type="number" placeholder="Amount" />
          <input type="text" placeholder="Category" />
          <button onClick={() => addExpense(50, 'Groceries')}>Add Expense</button>
        </div>
        <div className="income-input">
          <h3>Add Income</h3>
          <input type="number" placeholder="Amount" />
          <input type="text" placeholder="Source" />
          <button onClick={() => addIncome(1000, 'Salary')}>Add Income</button>
        </div>
      </div>
      <div className="expense-report">
        <h2>Expense Report</h2>
        {renderExpensesByCategory()}
      </div>
    </div>
  );
};

export default BudgetTracker;