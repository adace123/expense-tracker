import { ApolloServer } from 'apollo-server';

import typeDefs from './schema';
import resolvers from './resolvers';
import dbConnect from './db';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(async ({ url }) => {
    console.log(`Server started at ${url}`);
    await dbConnect();
});
