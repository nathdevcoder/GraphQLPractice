

export const AuthTypes = `
    type Auth {
        id: String!
        name: String!
        email: String!
        role: ROLE!
        dateCreated: Date!
        avatar: String
        description: String
        accessToken: String
        refreshToken: String
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
`

export const AuthQueries = `
    getUser: Auth!
`

export const AuthMutations = `
    login(input: LoginInput ): Auth!
    signup(input: SignupInput): Auth!
    relogin(input: {refreshToken: String}): Auth!
    deleteprofile(input: {id: string}): Response!
`