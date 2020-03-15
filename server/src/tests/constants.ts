const queries = {
    transactions: `
        {
            transactions {
                _id
                amount
                description
                merchant
                date
                category
                type
            }
        }
    `,
    transaction: `
       query getTransaction($transactionId: ID!) {
            transaction(id: $transactionId) {
                _id
                amount
                description
                merchant
                date
                category
                type
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

};

export {
    queries,
    mutations
};