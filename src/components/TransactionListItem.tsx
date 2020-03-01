import * as React from 'react';
import { Transaction } from '../types';

export const TransactionListItem = (transaction: Transaction) => (
    <div className="box transaction-item" style={{borderRight: '8px solid purple'}}>
        <div className="level">
            <div className="level-left">
                {transaction.category}
            </div>
            <div className="level-right">
                {transaction.amount}
            </div>
        </div>
    </div>
);
