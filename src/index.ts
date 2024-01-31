import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import mongoose from 'mongoose';
import { ContextFunctionType  } from './@types/server';
import { VerifyAccessToken } from './Auth/UserToken';
import schema from './Controller/Directives';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws'; 

import cors from 'cors';
import 'dotenv/config'

const PORT = (process.env.PORT || 4000) as number
const database = process.env.DATABASE || "mongodb://localhost:27017"  

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});
 


const context:ContextFunctionType = async ({ req } ) => {
  if(!req) return {user: null}
  const token =  req.headers.authorization as string 
  if(!token) return {user: null}
  const user = await VerifyAccessToken(token)  
  return { user }
}

const serverCleanup = useServer({ 
  schema, 
  context,
 }, 
 wsServer
);

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  plugins: [ 
    ApolloServerPluginDrainHttpServer({ httpServer }),{
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});



(async ()=>{
  try { 
    await mongoose.connect(database )
    console.log(`connected to ${database} database`); 
    await server.start();
    app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server)); 
    httpServer.listen(PORT, () => {
      console.log(`Server is now running on http://localhost:${PORT}/graphql`);
    });  
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