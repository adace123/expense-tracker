import { expect } from 'chai';
import 'mocha';
import * as supertest from 'supertest';
import app from '../server';
import seedTestDb from '../seeds';
import { queries, mutations } from './constants';
import { Transaction } from '../types/transaction';
import { User } from '../types/user';

const request = supertest(app);

function validateTransaction(transaction: Transaction) {
    const transactionFields = {
        _id: 'string',
        date: 'string',
        type: 'string',
        category: 'string',
        description: 'string',
        merchant: 'string',
        amount: 'number'
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
    })
}
    

describe('GraphQL API test', () => {
    before(() => {
        return seedTestDb(10, 5);
    });

    it('should return a list of transactions', (done) => {
        request.post('/graphql')
            .send({ query: queries.transactions })
            .expect(200)
            .end((err, { body }) => {
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
                expect(body.data).to.have.property('users');
                expect(body).not.to.have.property('errors');
                expect(body.data.users).to.be.an('array');
                expect(body.data.users.length).to.be.equal(5);
                expect(body.data.users.every(validateUser)).to.be.true;
                done();
            })
    });
    
});
