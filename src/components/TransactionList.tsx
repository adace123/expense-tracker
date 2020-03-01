import * as React from 'react';
import { TransactionListItem } from './TransactionListItem';
import { generateFakeTransactions } from '../utils';

export const TransactionList = () => (
    <div className="box">
        <p className="has-text-weight-bold">History</p>
        <div className="horizontal-divider"></div>
        <div className="transaction-list">
            {
                generateFakeTransactions(10)
                    .map(t => <TransactionListItem
                                key={t._id}
                                {...t}
                                ></TransactionListItem>)
            }
        </div>
    </div>
);
