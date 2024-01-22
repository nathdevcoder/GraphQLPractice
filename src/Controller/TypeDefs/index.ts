import { AuthInputs, AuthMutations, AuthQueries, AuthTypes } from "./AuthTypeDef";
import { DirEnums, DirInputs, DirMutations, DirQueries, DirTypes } from "./DirectoryTypeDef";
import { TableEnums, TableInputs, TableMutations, TableQueries, TableTypes } from "./TableTypeDef";

 
  
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
    ${TableEnums}
    ${DirEnums}

    #Types
    ${AuthTypes}
    ${TableTypes}
    ${DirTypes}
    type Book {
        title: String
        author: String
    }

    #inputTypes
    ${AuthInputs}
    ${TableInputs}
    ${DirInputs}
    type Response {
        message: String!
        id: String
    }

    #operations
    type Query {
        ${AuthQueries}
        ${TableQueries}
        ${DirQueries}
        books: [Book]
    }
    type Mutation {
        ${AuthMutations}
        ${TableMutations}
        ${DirMutations}
    }
`
export default typeDefs;