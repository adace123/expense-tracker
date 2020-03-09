import * as mongoose from 'mongoose';

export interface Budget {
    budgetAmount: number;
}

export enum TransactionType {
    DEBIT = 'Debit',
    CREDIT = 'Credit'
}

export enum Category {
    GROCERIES = 'Groceries',
    ENTERTAINMENT = 'Entertainment',
    RESTAURANT = 'Restaurant',
    AUTO = 'Auto',
    OTHER = 'Other'
}

export interface Transaction {
    _id: mongoose.Types.ObjectId,
    category: Category;
    description?: string;
    date: Date;
    type: TransactionType;
    merchant: string;
    amount: number;
}