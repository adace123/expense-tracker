import * as React from 'react';
import { Budget } from '../types';

export const TotalBudget = ({ budgetAmount }: Budget) => (
    <>
        <p className="has-text-weight-bold">YOUR BALANCE</p>
        <p className="has-text-info is-size-4">${budgetAmount.toFixed(2)}</p>
    </>
)
