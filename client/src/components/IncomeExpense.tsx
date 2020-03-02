import * as React from 'react';

export const IncomeExpense = () => (
    <div className="box">
        <div className="columns">
            <div className="column has-text-centered">
                <p className="heading has-text-weight-bold">INCOME</p>
                <p className="is-size-5 has-text-primary">$500.00</p>
            </div>
            <div className="vertical-divider"></div>
            <div className="column has-text-centered">
                <p className="heading has-text-weight-bold">EXPENSE</p>
                <p className="is-size-5 has-text-danger">$100.00</p>
            </div>
        </div>
    </div>
)
