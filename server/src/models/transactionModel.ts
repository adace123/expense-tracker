import mongoose from 'mongoose';

enum TransactionType {
    DEBIT = 'Debit',
    CREDIT = 'Credit'
}

enum Category {
    GROCERIES = 'Groceries',
    ENTERTAINMENT = 'Entertainment',
    RESTAURANT = 'Restaurant',
    AUTO = 'Auto',
    OTHER = 'Other'
}

const TransactionSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: Category,
        required: true
    },
    type: {
        type: String,
        enum: TransactionType,
        required: true
    },
    description: String,
    date: {
        type: Date,
        required: true
    },
    merchant: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

export default mongoose.model('transactions', TransactionSchema);
