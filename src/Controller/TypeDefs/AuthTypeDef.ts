

export const AuthTypes = `
    type Auth {
        id: String!
        name: String!
        email: Email!
        role: ROLE!
        dateCreated: Date!
        avatar: URL
        description: String
        accessToken: String
        refreshToken: String
    }
    type User {
        id: String!
        name: String!
        email: Email!
        role: ROLE!
        dateCreated: Date!
        avatar: URL
        description: String
    }
`

export const AuthInputs = `
    input LoginInput {
        email: Email! 
        password: String!
        role: ROLE!
    }
    input SignupInput {
        name: String!
        description: String
        avatar: String
        email: Email!
        password: String! 
        role: ROLE!
    }
    input ReloginInput { 
        refreshToken: String 
    }
    input DeleteUserInput {
        id: String
    }
    input ReassignUserInput {
        role: ROLE
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
    reassign(input: ReassignUserInput): Auth!
    deleteprofile(input: DeleteUserInput): Response!
`