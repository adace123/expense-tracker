import * as mongoose from 'mongoose';
import { Transaction } from './transaction';

export default interface User {
    _id: mongoose.Types.ObjectId,
    email: string;
    password: string;
    transactions: Array<Transaction>;
}
