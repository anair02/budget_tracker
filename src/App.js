import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './BudgetTracker.css';

const BudgetTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [balance, setBalance] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  const updateBalance = useCallback(() => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalIncome = income.reduce((sum, incomeItem) => sum + incomeItem.amount, 0);
    setBalance(totalIncome - totalExpenses);
  }, [expenses, income]);

  useEffect(() => {
    // Fetch expenses and income data from the Flask backend
    const fetchData = async () => {
      try {
        const expensesResponse = await axios.get('/api/expenses');
        setExpenses(expensesResponse.data);
        const incomeResponse = await axios.get('/api/income');
        setIncome(incomeResponse.data);
        updateBalance();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [income,expenses,updateBalance]);

  const addExpense = useCallback(async (amount, category) => {
    try {
      const response = await axios.post('/api/expenses', { amount, category });
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      updateBalance();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  }, [setExpenses, updateBalance]);
  
  const handleAddExpense = useCallback(() => {
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseCategoryInput = document.getElementById('expense-category');

    if (expenseAmountInput && expenseCategoryInput) {
      const expenseAmount = parseFloat(expenseAmountInput.value);
      const selectedCategory = expenseCategoryInput.value;

      if (!isNaN(expenseAmount) && expenseAmount > 0 && selectedCategory) {
        addExpense(expenseAmount, selectedCategory);
        expenseAmountInput.value = '';
        expenseCategoryInput.value = '';
      }
    } else {
      console.error('Input fields not found');
    }
  }, [addExpense]);

  const addIncome = (amount) => {
    setIncome([...income, { amount }]);
    updateBalance();
  };

  const handleAddIncome = () => {
    // Read the income amount from the input field
    const incomeAmount = parseFloat(document.getElementById('income-amount').value);
  
    // Add income only if amount is valid
    if (!isNaN(incomeAmount) && incomeAmount > 0) {
      addIncome(incomeAmount);
      // Clear input field after adding income
      document.getElementById('income-amount').value = '';
    }
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
          <div>
          <input id = "expense-amount" type="number" placeholder="Amount" />
          <select id="expense-category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value ="">Select Category</option>
            <option value = "Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Rent/Mortgage">Rent/Mortgage</option>
            <option value="Insurance">Insurance</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Other">Other</option>
          </select>
          <button onClick={handleAddExpense}>Add Expense</button>
          </div>
        </div>
        <div className="income-input">
          <h3>Add Income</h3>
          <input id="income-amount" type="number" placeholder="Amount" />
          <button onClick={handleAddIncome}>Add Income</button>
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