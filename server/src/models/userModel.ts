import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'transactions' }]
});

export default mongoose.model('user', UserSchema);
