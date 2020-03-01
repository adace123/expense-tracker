import * as React from "react";
import * as ReactDOM from "react-dom";
import './index.scss';
import 'bulma/css/bulma.css';

import { TotalBudget } from './components/TotalBudget';
import { IncomeExpense } from './components/IncomeExpense';
import { TransactionList } from './components/TransactionList';
import { TransactionForm } from './components/TransactionForm';

const App = () => (
    <div id="expense-tracker" className="is-fullheight box has-background-light">
        <p id="title" className="is-size-4 has-text-weight-bold">
            Expense Tracker
        </p>
        <TotalBudget budgetAmount={0}></TotalBudget>
        <IncomeExpense></IncomeExpense>
        <TransactionList></TransactionList>
        <TransactionForm></TransactionForm>
    </div>
);

ReactDOM.render(App(), document.getElementById('app'));
