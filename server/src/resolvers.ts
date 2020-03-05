export default {
    Query: {
        transactions: () => [
            {type: 'CREDIT', description: 'refund', merchant: 'ABC Co.', category: 'GROCERIES', amount: 123, _id: 456, date: new Date().toISOString()}
        ],
        transaction: (id) => ({
            type: 'DEBIT', description: 'lunch', merchant: 'Starbucks', category: 'RESTAURANT', amount: 10, _id: 101, date: new Date().toISOString()
        })
    }
}