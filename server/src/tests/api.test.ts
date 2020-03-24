import { expect } from 'chai';
import 'mocha';
import * as mongoose from 'mongoose';
import * as supertest from 'supertest';
import app from '../server';
import { seedTestDb, generateFakeData } from '../seeds';
import { queries, mutations } from './constants';
import { Transaction, Category, TransactionType } from '../types/transaction';
import { User } from '../types/user';
import transactionModel from '../models/transactionModel';
import { fail } from 'assert';
import userModel from '../models/userModel';

const request = supertest(app);

function validateTransaction(transaction: Transaction) {
    const transactionFields = {
        _id: 'string',
        date: 'string',
        type: 'string',
        category: 'string',
        description: 'string',
        merchant: 'string',
        amount: 'number',
        user: 'string'
    };

    return Object.entries(transactionFields).every(([key, type]) => {
        return transaction.hasOwnProperty(key) && typeof transaction[key] === type;
    });
}

function validateUser(user: User) {
    const userFields = {
        _id: 'string',
        email: 'string',
        password: 'string',
        transactions: 'object'
    }

    return Object.entries(userFields).every(([key, type]) => {
        return user.hasOwnProperty(key) && typeof user[key] === type;
    }) && Array.isArray(user.transactions);
}
    

describe('GraphQL API test', () => {
    before(() => {
        return seedTestDb(10, 5);
    });

    describe('Test Queries', () => {
        it('should return a list of transactions', (done) => {
            request.post('/graphql')
                .send({ query: queries.transactions })
                .expect(200)
                .end((err, { body }) => {
                    if (err) return done(err);
                    expect(body.data).to.have.property('transactions');
                    expect(body).not.to.have.property('errors');
                    expect(body.data.transactions).to.be.an('array');
                    expect(body.data.transactions.length).to.equal(10);
                    expect(body.data.transactions.every(validateTransaction)).to.be.true;
                    done();
                })
        });
        
        it('should return a list of users with their transactions', (done) => {
            request.post('/graphql')
                .send({ query: queries.users })
                .expect(200)
                .end((err, { body }) => {
                    if (err) return done(err);
    
                    expect(body.data).to.have.property('users');
                    expect(body).not.to.have.property('errors');
                    expect(body.data.users).to.be.an('array');
                    expect(body.data.users.length).to.be.equal(5);
                    expect(body.data.users.every(validateUser)).to.be.true;
                    done();
                });
        });

        it('should return a single transaction', async () => {
            const transaction = await transactionModel.findOne().exec();
            if (!transaction) fail('Could not find transaction');
            
            const { body } = await request.post('/graphql')
                .send({
                    query: queries.transaction,
                    variables: { transactionId: transaction._id }
                })
                .expect(200);
            
            expect(body.data).to.have.property('transaction');
            expect(body).not.to.have.property('errors');
            
            expect(validateTransaction(body.data.transaction)).to.be.true;
            expect(body.data.transaction._id).to.be.equal(transaction._id.toString());
        });

        it('should return a single user', async () => {
            const user = await userModel.findOne().exec();
            if (!user) fail('Could not find user');
            
            const { body } = await request.post('/graphql')
                .send({
                    query: queries.user,
                    variables: { userId: user._id }
                })
                .expect(200);
            
            expect(body.data).to.have.property('user');
            expect(body).not.to.have.property('errors');
            expect(validateUser(body.data.user)).to.be.true;
            expect(body.data.user._id).to.be.equal(user._id.toString());
        });
    });

    describe('Test Mutations', () => {
        it('should add a transaction to the DB', async () => {
            const user = await userModel.findOne().exec();
            if (!user) fail('Could not find any users');

            const { transactions } = generateFakeData(1, 1);
            transactions[0].user = user._id;
            
            const { body } = await request.post('/graphql')
                .send({
                    query: mutations.createTransaction,
                    variables: {
                        transaction: transactions[0]
                    }
                })
                .expect(200);
            
            expect(body.data).to.have.property('createTransaction');
            expect(validateTransaction(body.data.createTransaction)).to.be.true;
            expect(body.data.createTransaction.user).to.be.equal(user._id.toString());
        });

        it('should update a transaction', async () => {
            const transaction = await transactionModel.findOne().exec();
            if (!transaction) fail('Could not find any transactions');
            
            request.post('/graphql')
                .send({
                    query: mutations.updateTransaction,
                    variables: {
                        transaction: {_id: transaction._id, amount: 123.45}
                    }
                })
                .expect(200)
                .end((err, { body }) => {
                    expect(err).to.be.null;
                    expect(body.data).to.have.property('updateTransaction');
                    expect(validateTransaction(body.data.updateTransaction)).to.be.true;
                    expect(parseFloat(body.data.updateTransaction.amount)).to.equal(123.45);
                })
        });

        it('should delete a transaction', async () => {
            const transaction = await transactionModel.findOne().exec();
            if (!transaction) fail('Could not find any transactions');

            const { body } = await request.post('/graphql')
                .send({
                    query: mutations.deleteTransaction,
                    variables: {
                        id: transaction._id
                    }
                })
                .expect(200);

            expect(body.data).to.have.property('deleteTransaction');
            expect(validateTransaction(body.data.deleteTransaction)).to.be.true;
        });

        it('should add a user to the DB', async () => {
            const { users } = generateFakeData(0, 1);

            const { body } = await request.post('/graphql')
                .send({
                    query: mutations.createUser,
                    variables: { user: users[0] }  
                })
                .expect(200)
            
            expect(body.data).to.have.property('createUser');
            expect(validateUser(body.data.createUser)).to.be.true;
        });

        it('should update a user', async () => {
            const user = await userModel.findOne().exec();
            if (!user) fail('Could not find any users');
            
            const { body } = await request.post('/graphql')
                .send({
                    query: mutations.updateUser,
                    variables: {
                        user: {_id: user._id, email: 'abc123@gmail.com', password: 'secretpass1'}
                    }
                })
            
            expect(body.data).to.have.property('updateUser');
            expect(validateUser(body.data.updateUser)).to.be.true;

            expect(body.data.updateUser.email).to.be.equal('abc123@gmail.com');
            expect(body.data.updateUser.password).to.be.equal('secretpass1');
        });
    });
    
});
