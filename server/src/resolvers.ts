import transactionModel from './models/transactionModel';
import * as ApolloServer from 'apollo-server';

export default {
    Query: {
        transactions: () => transactionModel.find(),
        transaction: (parent, { id }, context, info) => transactionModel.findById(id)
    }
}