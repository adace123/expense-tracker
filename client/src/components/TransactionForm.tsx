import React, { useState } from 'react';
import { Categories, TransactionType } from '../types';

export const TransactionForm = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div className="box">
            <div className="level">
                <p className="has-text-weight-bold">Add New Transaction</p>
                <span className="icon has-text-info" onClick={() => setIsCollapsed(!isCollapsed)}>
                    <i className={`fas fa-${isCollapsed ? "plus" : "minus"}`}></i>
                </span>
            </div>
            {
                !isCollapsed && <form className="transaction-form">
                <div className="horizontal-divider"></div>
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div className="field">
                                <label className="label">Category</label>
                                <div className="control">
                                    <div className="select">
                                        <select>
                                            {
                                                Object.keys(TransactionType)
                                                    .sort()
                                                    .map(k => <option>{TransactionType[k]}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="level-item">
                            <div className="field">
                                <label className="label">Type</label>
                                <div className="control">
                                    <div className="select">
                                        <select>
                                            {
                                                Object.keys(Categories)
                                                    .map(k => <option>{Categories[k]}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Merchant</label>
                    <div className="control">
                        <input className="input"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Amount</label>
                    <div className="control">
                        <input className="input is-small" type="number" step="0.01"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <input className="input" placeholder="Optional"/>
                    </div>
                </div>
                <button className="button has-background-success has-text-white is-medium is-fullwidth">Add Transaction</button>
            </form>
            }
        </div>
    );
} 
