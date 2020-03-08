import * as mongoose from 'mongoose';

import transactionModel from './models/transactionModel';
import { Transaction } from '../../types/transaction';

export default {
    Query: {
        transactions(): Promise<mongoose.Document[]> {
            return transactionModel.find().exec();
        },
        transaction(parent, { id }, context, info): Promise<mongoose.Document | null> {
            return transactionModel.findById(id).exec();
        }
    },
    Mutation: {
        createTransaction(parent, { transaction }, context, info): Promise<mongoose.Document> {
            transaction.date = new Date();
            const newTransaction = new transactionModel(transaction);
            return newTransaction.save();
        },
        deleteTransaction(parent, { id }, context, info): Promise<mongoose.Document | null> {
            return transactionModel.findByIdAndDelete(id).exec();
        },
        updateTransaction(parent, { id, transaction }, context, info): Promise<mongoose.Document | null> {
            return transactionModel.findByIdAndUpdate(id, transaction, { new: true }).exec();
        }
    }
}