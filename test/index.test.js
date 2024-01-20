const chai = require('chai');
const chaiGraphQL = require('chai-graphql');
const {createTestServer} = require('./helper')

chai.use(chaiGraphQL);
 
const assert = chai.assert;

const typeDefs = `#graphql
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name}!`,
  },
};

const query =  `#graphql
  query SayHelloWorld($name: String) { 
    hello(name: $name) 
  }
`

const variables = { 
  name: 'world' 
}

describe('test server test', () => {
    it('returns hello with the provided name', async () => {
        const response = await createTestServer({
            typeDefs,
            resolvers,
            query,
            variables,
        })
        assert.notGraphQLError(response.body.singleResult)
        assert.graphQL(response.body.singleResult, { hello: 'Hello world!' })
         
      });
})
