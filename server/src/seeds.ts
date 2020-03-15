import * as faker from 'faker';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';

import { User } from './types/user';
import { Transaction, Category, TransactionType } from './types/transaction';
import transactionModel from './models/transactionModel';
import userModel from './models/userModel';

interface FakeData {
    users: Array<User>;
    transactions: Array<Transaction>;
}

function preprocessBulkWrite(documentArray: Array<User | Transaction>): any[] {
    return documentArray.map(document => ({ insertOne: { document } }));
}

function generateFakeData(transactionCount: number, usercount: number): FakeData {
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

async function seedTestDb(numTransactions: number, numUsers: number) {
    await dropTestDb();
    const { users, transactions } = generateFakeData(numTransactions, numUsers);

    try {
        await transactionModel.bulkWrite(preprocessBulkWrite(transactions));
        await userModel.bulkWrite(preprocessBulkWrite(users));
        console.log(`Wrote ${numUsers} fake users to the test DB.`);
        console.log(`Wrote ${numTransactions} fake transactions to the test DB.`);
    } catch(e) {
        throw e;
    }
}

async function dropTestDb() {
    for (const model of [transactionModel, userModel]) {
        try {
            const documentCount = await model.countDocuments();
            if (documentCount) {
                console.log(`Dropping the ${model.collection.name} collection from the test DB`);
                await model.collection.drop();
            }
        } catch (e) {
            throw e;
        }
    }
}

export default seedTestDb;
