import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './Controller/Resolvers';
import typeDefs from './Controller/TypeDefs';


const port = (process.env.PORT || 4000) as number
const database = process.env.DATABASE;

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

(async ()=>{
    const { url } = await startStandaloneServer(server, {
      listen: { port },
    });
    console.log(`🚀  Server ready at: ${url}`);
})()