

export const AuthTypes = `
    type Auth {
        id: String!
        name: String!
        email: String!
        role: ROLE!
        dateCreated: String!
        avatar: String
        description: String
        accessToken: String
        refreshToken: String
    }
    type User {
        id: String!
        name: String!
        email: String!
        role: ROLE!
        dateCreated: String!
        avatar: String
        description: String
    }
`

export const AuthInputs = `
    input LoginInput {
        email: String! 
        password: String!
        role: ROLE!
    }
    input SignupInput {
        name: String!
        description: String
        avatar: String
        email: String!
        password: String! 
        role: ROLE!
    }
    input ReloginInput { 
        refreshToken: String 
    }
    input DeleteUserInput {
        id: String
    }
`

export const AuthQueries = `
    getUser: User!
`

export const AuthMutations = `
    login(input: LoginInput ): Auth!
    signup(input: SignupInput): Auth!
    relogin(input: ReloginInput): Auth!
    logout: Response!
    deleteprofile(input: DeleteUserInput): Response!
`