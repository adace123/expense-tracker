import transactionModel from './models/transactionModel';

export default {
    Query: {
        transactions: () => transactionModel.find()
    }
}