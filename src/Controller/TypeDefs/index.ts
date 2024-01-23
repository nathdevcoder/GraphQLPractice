import { AuthInputs, AuthMutations, AuthQueries, AuthTypes } from "./AuthTypeDef";
import { DirEnums, DirInputs, DirMutations, DirQueries, DirTypes } from "./DirectoryTypeDef";
import { TableEnums, TableInputs, TableMutations, TableQueries, TableTypes } from "./TableTypeDef";

 
  
const typeDefs = `#graphql
    #customDirectives
    directive @camelcase on FIELD_DEFINITION
    directive @snakecase on FIELD_DEFINITION
    directive @uppercase on FIELD_DEFINITION
    directive @lowercase on FIELD_DEFINITION
    directive @money(currency: String) on FIELD_DEFINITION
    directive @log on FIELD_DEFINITION

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