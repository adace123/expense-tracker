export interface Budget {
    budgetAmount: number;
}

export enum TransactionType {
    DEBIT = 'Debit',
    CREDIT = 'Credit'
}

export interface Transaction {
    category: string;
    name: string;
    type: TransactionType;
    amount: number;
}

export enum Categories {
    GROCERIES = 'Groceries',
    ENTERTAINMENT = 'Entertainment',
    RESTAURANT = 'Restaurant',
    AUTO = 'Auto',
    OTHER = 'Other'
}