const { ApolloServer } = require("@apollo/server"); 
const { addMocksToSchema } = require('@graphql-tools/mock');
const { makeExecutableSchema } = require('@graphql-tools/schema');

async function createTestServer({typeDefs, resolvers, query, variables = {}}) {
    const testServer = new ApolloServer({ 
        schema: addMocksToSchema({
            schema: makeExecutableSchema({ typeDefs, resolvers }),
        }),
    })
    return await testServer.executeOperation({ 
        query , 
        variables 
    });
}

module.exports = createTestServer;