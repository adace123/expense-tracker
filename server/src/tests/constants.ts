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
    `
};

const mutations = {

};

export {
    queries,
    mutations
};