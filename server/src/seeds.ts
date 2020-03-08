import { Command } from 'commander'; 
import * as faker from 'faker';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';

import { Transaction, Category, TransactionType } from '../../types/transaction';
import transactionModel from './models/transactionModel';
import dbConnect from './db';

const command = new Command();

export function generateFakeTransactions(amount: number): Array<Transaction> {
    return _.range(0, amount).map(i => {
        const randomCat: Category = _.sample(Object.keys(Category)) as Category;
        const randomTransactionType: TransactionType = _.sample(Object.keys(TransactionType)) as TransactionType
        
        const document = {
            date: faker.date.past(),
            category: randomCat,
            type: randomTransactionType,
            description: faker.lorem.sentence(),
            amount: parseFloat(faker.commerce.price()),
            merchant: faker.company.companyName()
        }
        return document;
    });
}

command
    .option('-n, --numRecords <number>', 'Number of records to save', 10)
    .option('--no-reset', 'Delete transaction-test collection before saving')
    .parse(process.argv);

dbConnect().then(async connection => {
    const fakeTransactionRecords = generateFakeTransactions(command.numRecords)
        .map(document => ({insertOne: { document }}));
    const testTransactionModel = mongoose.model('test-transaction', transactionModel.schema);

    if (command.reset) {
        testTransactionModel.collection.drop();
    }

    try {
        await testTransactionModel.collection.bulkWrite(fakeTransactionRecords);
        console.log(`Wrote ${command.numRecords} fake transactions to the DB.`);
    } catch(e) {
        console.log(e);
    } finally {
        connection.close();
    }
});
