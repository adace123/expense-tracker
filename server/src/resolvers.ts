import * as mongoose from 'mongoose';
import transactionModel from './models/transactionModel';
import userModel from './models/userModel';

export default {
    Query: {
        transactions(): Promise<mongoose.Document[]> {
            return transactionModel.find().exec();
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
        async createTransaction(parent, { transaction }, context, info): Promise<mongoose.Document> {
            const user: any = await userModel.findById(transaction.user).exec();
            if (!user) throw new Error(`Could not find user with ID ${transaction.user}`);
            transaction.date = transaction.date || new Date().toISOString();
            transaction._id = transaction._id || new mongoose.Types.ObjectId();
            return transactionModel.create(transaction).then(newTransaction => {
                user.transactions.push(newTransaction);
                user.save();
                return newTransaction;
            });
        },
        deleteTransaction(parent, { id }, context, info): Promise<mongoose.Document | null> {
            return transactionModel.findByIdAndDelete(id).exec();
        },
        updateTransaction(parent, { id, transaction }, context, info): Promise<mongoose.Document | null> {
            return transactionModel.findByIdAndUpdate(id, transaction, { new: true }).exec();
        }
    }
}