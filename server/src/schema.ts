import { gql } from 'apollo-server';

export default gql`
    type Query {
        transactions: [Transaction!]!
        transaction(id: ID!): Transaction!
        users: [User!]!
        user(id: ID!): User!
    }

    input TransactionInput {
        _id: ID!
        type: TransactionType!
        date: String!
        category: Category!
        description: String
        merchant: String!
        amount: Float!
        user: ID!
    }

    type Mutation {
        createTransaction(transaction: TransactionInput!): Transaction
        deleteTransaction(id: ID!): Transaction
        updateTransaction(id: ID!, transaction: TransactionInput!): Transaction
    }
    
    enum Category {
        GROCERIES
        ENTERTAINMENT
        RESTAURANT
        AUTO
        OTHER
    }

    enum TransactionType {
        DEBIT
        CREDIT
    }

    type Transaction {
        _id: ID!
        date: String!
        type: TransactionType!
        category: Category!
        description: String
        merchant: String!
        amount: Float!
        user: ID!
    }    

    type User {
        _id: ID!
        email: String!
        password: String!
        transactions: [Transaction]
    }
`;
