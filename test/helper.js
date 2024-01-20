const { ApolloServer } = require("@apollo/server"); 
const { addMocksToSchema } = require('@graphql-tools/mock');
const { makeExecutableSchema } = require('@graphql-tools/schema');

async function createTestServerWithMock({typeDefs, resolvers, query, variables = {}}) {
    const mocks = {
        Int: () => 6,
        Float: () => 22.1,
        String: () => 'Hello',
        Email: () => 'testara@testara.com',
        Date: () => new Date(1705713324029),
        Url: () => 'http://test.png'
      };
    const testServer = new ApolloServer({ 
        schema: addMocksToSchema({
            schema: makeExecutableSchema({ typeDefs, resolvers }),
            mocks
        }),
    })
    return await testServer.executeOperation({ 
        query , 
        variables 
    });
}

async function createTestServer({typeDefs, resolvers, query, variables = {}}) {
    const testServer = new ApolloServer( { typeDefs, resolvers })  
    return await testServer.executeOperation({ 
        query , 
        variables 
    });
}

module.exports = { createTestServer, createTestServerWithMock };