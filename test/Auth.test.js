const chai = require("chai");
const chaiGraphQL = require("chai-graphql");
const { createTestServerWithMock } = require("./helper");
const typeDefs = require("../dist/Controller/TypeDefs/index").default;
const resolvers = require("../dist/Controller/Resolvers/index").default;

chai.use(chaiGraphQL);

const assert = chai.assert;

describe("Authentication Testing", () => {
    
  it("Should return Correct Email, Date, and Url", async () => {
    const query = `#graphql
        mutation Signup($input: SignupInput) {
            signup(input: $input) {
              email
              avatar
              dateCreated
              name
            }
        }`;
    const variables = {
      input: {
        email: "teastat@mail.com",
        avatar: "http://test.png",
        description: "null",
        name: "null",
        password: "null",
        role: "USER",
      },
    };
    const response = await createTestServerWithMock({
      typeDefs,
      resolvers,
      query,
      variables,
    });
    assert.notGraphQLError(response.body.singleResult);
  });

  it("can Login", async () => {
    const query = `#graphql
        mutation Login($input: LoginInput) {
            login(input: $input) {
              accessToken
              refreshToken
              avatar
              roles
              role
              name
              id
              email
              dateCreated
              description
            }
          }`;
    const variables = {
      input: {
        email: "teastat@mail.com",
        password: "1234",
        role: "USER",
      },
    };
    const response = await createTestServerWithMock({
      typeDefs,
      resolvers,
      query,
      variables,
    });
    assert.notGraphQLError(response.body.singleResult);
  });

  it("can logout", async () => {
    const query = `#graphql
          mutation Logout {
            logout {
              message
              id
            }
          }`;
    const variables = {};
    const response = await createTestServerWithMock({
      typeDefs,
      resolvers,
      query,
      variables,
    });
    assert.notGraphQLError(response.body.singleResult);
  });

  it("can refresh token", async () => {
    const query = `#graphql
        mutation Relogin($input: ReloginInput) {
            relogin(input: $input) {
                roles
                role
                refreshToken
                name
                id
                email
                description
                dateCreated
                avatar
                accessToken
            }
        }`;
    const variables = {
      input: {
        refreshToken: "JWT Refresh Token",
        role: 'USER'
      },
    };
    const response = await createTestServerWithMock({
      typeDefs,
      resolvers,
      query,
      variables,
    });
    assert.notGraphQLError(response.body.singleResult);
  });

  it("can reassign Role", async () => {
    const query = `#graphql
    mutation Reassign($input: ReassignUserInput) {
        reassign(input: $input) {
          roles
          role
          refreshToken
          name
          id
          email
          description
          dateCreated
          avatar
          accessToken
        }
      }`;
    const variables = {
      input: {
        role: "MEMBER",
      },
    };
    const response = await createTestServerWithMock({
      typeDefs,
      resolvers,
      query,
      variables,
    });
    assert.notGraphQLError(response.body.singleResult);
  });

  it("can delete User", async () => {
    const query = `#graphql
    mutation Deleteprofile($input: DeleteUserInput) {
        deleteprofile(input: $input) {
          message
          id
        }
      }`;
    const variables = {
      input: {
        id: "user ID",
      },
    };
    const response = await createTestServerWithMock({
      typeDefs,
      resolvers,
      query,
      variables,
    });
    assert.notGraphQLError(response.body.singleResult);
  });
});
