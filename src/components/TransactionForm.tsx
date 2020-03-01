import * as React from 'react';
import { Categories, TransactionType } from '../types';

export const TransactionForm = () => (
    <div className="box">
        <p className="has-text-weight-bold">Add New Transaction</p>
        <div className="horizontal-divider"></div>
        <form className="transaction-form">
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
    </div>
);
