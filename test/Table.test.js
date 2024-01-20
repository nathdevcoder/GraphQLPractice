const chai = require("chai");
const chaiGraphQL = require("chai-graphql");
const { createTestServerWithMock } = require("./helper");
const typeDefs = require("../dist/Controller/TypeDefs/index").default;
const resolvers = require("../dist/Controller/Resolvers/index").default;

chai.use(chaiGraphQL);

const assert = chai.assert;

describe("Table Testing", () => { 
  it("Should Query the table data with pagination", async () => {
    const query = `#graphql
    query Gettabledata($input: TableStateInput) {
        gettabledata(input: $input) {
          data {
            calories
            cookTime
            cuisine
            id
            ingredients
            instructions
            isVegetarian
          }
          state {
            page
            rowsPerPage 
            filter {
              field
              operations
              query
            }
          }
          options {
            count
          }
        }
      }`;
    const variables = {
      input: {
        sort: null,
        rowsPerPage: 20,
        page: 1,
        filter: {
          field: "cuisine",
          operations:"equals",
          query: "Italian"
        },
      }
    }
    const response = await createTestServerWithMock({
      typeDefs,
      resolvers,
      query,
      variables,
    });
    assert.notGraphQLError(response.body.singleResult);
  });  
});
