import React, { useState } from 'react';
import moment from 'moment';
import { Transaction } from '../types';

export const TransactionListItem = (transaction: Transaction) =>  {
    const [accordionShowing, setAccordionShowing] = useState(false);
    return (
        <div className="box transaction-item" onClick={() => setAccordionShowing(!accordionShowing)} style={{borderRight: '8px solid purple'}}>
            <div className="level">
                <div>
                    <p className="is-size-6 has-text-grey-light">{transaction.category}</p>
                    <p>{transaction.merchant}</p>
                </div>
                <div>
                    <p className="has-text-weight-bold">{transaction.amount}</p>
                </div>
            </div>
            {
                accordionShowing &&
                <div>
                    <p className="has-text-grey-light">{moment(transaction.date).format('MM-DD-YYYY')}</p>
                    <div className="horizontal-divider"></div>
                    <p className="has-text-info">
                        {transaction.description.length ? transaction.description : "No description available"}
                    </p>
                </div>
            }
        </div>
    );
}
