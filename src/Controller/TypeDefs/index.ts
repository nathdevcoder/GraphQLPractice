import { AuthInputs, AuthMutations, AuthQueries, AuthTypes } from "./AuthTypeDef";

 
  
const typeDefs = `#graphql
    #Types
    ${AuthTypes}
    type Book {
        title: String
        author: String
    }

    #inputTypes
    ${AuthInputs}

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