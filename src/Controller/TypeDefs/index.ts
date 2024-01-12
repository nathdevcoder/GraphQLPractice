import { AuthInputs, AuthMutations, AuthQueries, AuthTypes } from "./AuthTypeDef";

 
  
const typeDefs = `#graphql
    #ENUMS
    enum ROLE {
        ADMIN
        MEMBER
        STAFF
        USER
    }

    #Types
    ${AuthTypes}
    type Book {
        title: String
        author: String
    }

    #inputTypes
    ${AuthInputs}
    type Response {
        message: String!
        id: String
    }

    #operations
    type Query {
        ${AuthQueries}
        books: [Book]
    }
    type Mutation {
        ${AuthMutations}
    }
`
export default typeDefs;