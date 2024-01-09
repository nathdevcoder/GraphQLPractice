import { ApolloServer } from '@apollo/server';
import { StandaloneServerContextFunctionArgument, startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './Controller/Resolvers';
import typeDefs from './Controller/TypeDefs';
import mongoose from 'mongoose';


const port = (process.env.PORT || 4000) as number
const database = process.env.DATABASE as string

const server = new ApolloServer({
    typeDefs,
    resolvers, 
});

const context = async ({ req }: StandaloneServerContextFunctionArgument ) => {
  return { token: req.headers.token }
}

(async ()=>{
  try { 
    await mongoose.connect(database || "mongodb://localhost:27017", );
    console.log('connected to database');
    const { url } = await startStandaloneServer(server, { context, listen: { port } });
    console.log(`🚀  Server ready at: ${url}`);
  } catch (error:unknown) {
    if (error instanceof Object && 'message' in error) {
      console.error(`Failed to connect to the database: ${error.message}`);
    } else {
      console.error(`An unexpected error occurred during database connection`);
    }
    console.log(`Exiting the application`);
    process.exit(1);
  }
})()