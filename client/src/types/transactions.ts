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
    _id: String,
    category: Category;
    description?: string;
    date: string;
    type: TransactionType;
    merchant: string;
    amount: number;
}