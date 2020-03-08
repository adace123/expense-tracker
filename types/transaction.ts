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
    category: Category;
    description?: string;
    date: Date;
    type: TransactionType;
    merchant: string;
    amount: number;
}