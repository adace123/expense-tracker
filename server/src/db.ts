import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config({
    path: '/app/src/.env'
});

export default async (): Promise<mongoose.ConnectionBase> => {
    const nodeEnv: string = process.env.NODE_ENV || 'DEV';
    const connectionString = process.env[`MONGO_${nodeEnv}_DB_CONNECTION_STRING`];

    try {
        const { connection } = await mongoose.connect(connectionString as string, { 
            useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true, connectTimeoutMS: 30000
         })
        console.log(`Successfully connected to the ${nodeEnv} database.`);
        return connection;
    } catch(e) {
        throw e;
    }
};
