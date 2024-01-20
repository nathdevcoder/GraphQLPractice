import { AuthInputs, AuthMutations, AuthQueries, AuthTypes } from "./AuthTypeDef";
import { TableInputs, TableMutations, TableQueries, TableTypes } from "./TableTypeDef";

 
  
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
    ${TableTypes}
    type Book {
        title: String
        author: String
    }

    #inputTypes
    ${AuthInputs}
    ${TableInputs}
    type Response {
        message: String!
        id: String
    }

    #operations
    type Query {
        ${AuthQueries}
        ${TableQueries}
        books: [Book]
    }
    type Mutation {
        ${AuthMutations}
        ${TableMutations}
    }
`
export default typeDefs;