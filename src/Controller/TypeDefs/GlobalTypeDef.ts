

const GlobalSchema = `
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

    #Types
    type Response {
        message: String!
        id: String
    } 
`

export default GlobalSchema