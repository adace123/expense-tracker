import * as mongoose from 'mongoose';
import { Category, TransactionType } from '../types/transaction';

const TransactionSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: Object.keys(Category),
        required: true
    },
    type: {
        type: String,
        enum: Object.keys(TransactionType),
        required: true
    },
    description: String,
    date: {
        type: String,
        required: true
    },
    merchant: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    }
});

export default mongoose.model('transactions', TransactionSchema);
