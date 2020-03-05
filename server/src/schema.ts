import { gql } from 'apollo-server';

export default gql`
    type Query {
        transactions: [Transaction!]!
        transaction(id: ID!): Transaction!
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
    }    
`;