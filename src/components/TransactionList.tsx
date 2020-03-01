import * as React from 'react';
import { Transaction } from './Transaction';

export const TransactionList = () => (
    <div className="box">
        <p className="has-text-weight-bold">History</p>
        <div className="horizontal-divider"></div>
        <div className="transaction-list">
            {Array(10).fill(<Transaction></Transaction>)}
        </div>
    </div>
);
