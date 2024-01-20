import { AuthInputs, AuthMutations, AuthQueries, AuthTypes } from "./AuthTypeDef";

 
  
const typeDefs = `#graphql
    #customScalars
    scalar Date
    scalar Url
    scalar Email

    #ENUMS
    enum Role {
        ADMIN
        MEMBER
        STAFF
        USER
    }
    enum Size {
        SMALL
        MEDIUM
        LARGE
    }
    enum Cuisine {
        Italian
        Indian
        Chinese
        Mexican
    }
    enum Level {
        Easy
        Medium
        Hard
    }
    enum Order {
        asc
        desc
    }
    enum Operators {
        contains
        equals
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