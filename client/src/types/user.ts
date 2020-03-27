import { Transaction } from './transaction';

export interface User {
    _id: string,
    email: string;
    password: string;
    transactions: Array<Transaction>;
}