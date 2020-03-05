import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';

import typeDefs from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(8080).then(({ url }) => {
    console.log(`Server started at ${url}`);
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true }, err => {
        if (err)
            console.log(err);
        else console.log('connected');
    });
});


