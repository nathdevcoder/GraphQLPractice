import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import { ContextFunctionType  } from './@types/server';
import { VerifyAccessToken } from './Auth/UserToken';
import 'dotenv/config'
import schema from './Controller/Directives';

const port = (process.env.PORT || 4000) as number
const database = process.env.DATABASE || "mongodb://localhost:27017"  

const server = new ApolloServer({schema});

const context:ContextFunctionType = async ({ req } ) => {
  const token =  req.headers.authorization as string 
  if(!token) return {user: null}
  const user = await VerifyAccessToken(token)  
  return { user }
}

(async ()=>{
  try { 
    await mongoose.connect(database )
    console.log(`connected to ${database} database`);
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