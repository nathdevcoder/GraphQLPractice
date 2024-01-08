

export const AuthTypes = `
    type Auth {
        userName: String
        email: String!
        token: String
        avatar: String
    }
`

export const AuthInputs = `
    input LoginInput {
        email: String! 
        password: String!
    }
    input SignupInput {
        userName: String!
        email: String!
        password: String! 
        avatar: String
        bio: String
        filepath: String
    }
`

export const AuthQueries = `
    getUser: Auth!
`

export const AuthMutations = `
    login(input: LoginInput ): Auth!
    signup(input: SignupInput): Auth!
`