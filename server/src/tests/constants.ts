const transactionFields = `
    _id
    amount
    description
    merchant
    date
    category
    user
    type
`

const queries = {
    transactions: `
        {
            transactions {
                ${transactionFields}
            }
        }
    `,
    transaction: `
       query getTransaction($transactionId: ID!) {
            transaction(id: $transactionId) {
                ${transactionFields}
            }
        }
    `,
    users: `{
        users {
            _id
            email
            password
            transactions {
                amount
            }
        }
    }
    `,
    user: `
        query getUser($userId: ID!) {
            user(id: $userId) {
                _id
                email
                password
                transactions {
                    amount
                }
            }
        }
    `
};

const mutations = {
    createTransaction: `
        mutation createTransaction($transaction: TransactionInput!) {
            createTransaction(transaction: $transaction) {
                ${transactionFields}
            }
        }
    `,
    updateTransaction: `
        mutation updateTransaction($transaction: TransactionInput!) {
            updateTransaction(transaction: $transaction) {
                ${transactionFields}
            }
        }
    `,
    deleteTransaction: `
        mutation deleteTransaction($id: ID!) {
            deleteTransaction(id: $id) {
                ${transactionFields}
            }
        }
    `
};

export {
    queries,
    mutations
};