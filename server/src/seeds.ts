import { Command } from 'commander'; 
import * as faker from 'faker';
import * as _ from 'lodash';

import * as mongoose from 'mongoose';

import User from '../../types/user';
import { Transaction, Category, TransactionType } from '../../types/transaction';
import transactionModel from './models/transactionModel';
import userModel from './models/userModel';
import dbConnect from './db';

const command = new Command();

interface FakeData {
    users: Array<User>;
    transactions: Array<Transaction>;
}

function preprocessBulkWrite(documentArray: Array<User | Transaction>): any[] {
    return documentArray.map(document => ({ insertOne: { document } }));
}

export function generateFakeData(transactionCount: number, usercount: number): FakeData {
    const fakeUsers: Array<User> = _.range(0, usercount).map(i => (
        {
            _id: new mongoose.Types.ObjectId(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            transactions: []
        }
    ));

    const fakeTransactions = _.range(0, transactionCount).map(i => {
        const randomCategory: Category = _.sample(Object.keys(Category)) as Category;
        const randomTransactionType: TransactionType = _.sample(Object.keys(TransactionType)) as TransactionType
        const user: User = _.sample(fakeUsers) as User;

        const transaction = {
            _id: new mongoose.Types.ObjectId(),
            date: faker.date.past(),
            category: randomCategory,
            type: randomTransactionType,
            description: faker.lorem.sentence(),
            amount: parseFloat(faker.commerce.price()),
            merchant: faker.company.companyName(),
            user: user._id
        }
        
        user.transactions.push(transaction);
        return transaction;
    });

    return {
        users: fakeUsers,
        transactions: fakeTransactions
    };
}

command
    .option('-t, --numTransactions <number>', 'Number of transactions to save', 10)
    .option('-u, --numUsers <number>', 'Number of users to save', 5)
    .option('--no-reset', 'Delete transaction-test collection before saving')
    .parse(process.argv);

dbConnect().then(async connection => {
    const { users, transactions } = generateFakeData(command.numTransactions, command.numUsers);
    
    if (command.reset) {
        userModel.countDocuments((_, count) => {
            count && userModel.collection.drop();
        });
    }

    try {
        await transactionModel.bulkWrite(preprocessBulkWrite(transactions));
        await userModel.bulkWrite(preprocessBulkWrite(users));
        console.log(`Wrote ${command.numUsers} fake users to the DB.`);
        console.log(`Wrote ${command.numTransactions} fake transactions to the DB.`);
    } catch(e) {
        console.log(e);
    } finally {
        connection.close();
    }
});
