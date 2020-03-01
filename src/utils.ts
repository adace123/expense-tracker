import * as faker from 'faker';
import * as _ from 'lodash';
import * as uuid from 'uuid';
import { Transaction, Categories, TransactionType } from './types';

export function generateFakeTransactions(amount: number): Transaction[] {
    const transactionData: Array<Transaction> = [];
    for (let i = 0; i < amount; i++) {
        transactionData.push({
            _id: uuid.v4(),
            date: faker.date.past(),
            category: Categories[_.sample(Object.keys(Categories))],
            type: TransactionType[_.sample(Object.keys(TransactionType))],
            description: faker.lorem.sentence(),
            amount: parseFloat(faker.commerce.price()),
            merchant: faker.company.companyName()
        });
    }
    return transactionData;
}
