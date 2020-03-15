import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';
import dbConnect from './db';

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

export default app.listen({port: 4000}, async () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

    await dbConnect();
});
