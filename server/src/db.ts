import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export default async (): Promise<mongoose.ConnectionBase> => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string, { 
            useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true
         })
        console.log('Mongo connection established');
        return connection;
    } catch(e) {
        throw e;
    }
};
