import React, { useState } from 'react';
import { TransactionListItem } from './TransactionListItem';
import { generateFakeTransactions } from '../utils';

export const TransactionList = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    return (
        <div className="box">
            <div className="level">
                <p className="has-text-weight-bold">History <span>(10 Transactions)</span></p>
                <span className="icon has-text-info" onClick={() => setIsCollapsed(!isCollapsed)}>
                    <i className={`fas fa-${isCollapsed ? "plus" : "minus"}`}></i>
                </span>
            </div>
            <div className="horizontal-divider"></div>
            <div className="transaction-list" style={{maxHeight: isCollapsed ? "30vh" : "none"}}>
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
}
