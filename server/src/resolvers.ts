import * as mongoose from 'mongoose';

import transactionModel from './models/transactionModel';
import userModel from './models/userModel';

export default {
    Query: {
        transactions(): Promise<mongoose.Document[]> {
            return transactionModel.find().populate('user').exec();
        },
        transaction(parent, { id }, context, info): Promise<mongoose.Document | null> {
            return transactionModel.findById(id).exec();
        },
        users(): Promise<mongoose.Document[]> {
            return userModel.find().populate('transactions').exec();
        },
        user(parent, { id }, context, info): Promise<mongoose.Document | null> {
            return userModel.findById(id).populate('transactions').exec();
        }
    },
    Mutation: {
        createTransaction(parent, { transaction }, context, info): Promise<mongoose.Document> {
            transaction.date = transaction.date || new Date();
            return transactionModel.create(transaction);
        },
        deleteTransaction(parent, { id }, context, info): Promise<mongoose.Document | null> {
            return transactionModel.findByIdAndDelete(id).exec();
        },
        updateTransaction(parent, { id, transaction }, context, info): Promise<mongoose.Document | null> {
            return transactionModel.findByIdAndUpdate(id, transaction, { new: true }).exec();
        }
    }
}