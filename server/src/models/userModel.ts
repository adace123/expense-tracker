import * as mongoose from 'mongoose';
import { User } from 'types/user';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'transaction' }]
});

export default mongoose.model<User & mongoose.Document>('user', UserSchema);
