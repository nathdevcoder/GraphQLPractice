

export const AuthTypes = `
    type Auth {
        id: String!
        name: String!
        email: Email!
        role: Role!
        roles: [Role]!
        dateCreated: Date!
        avatar(size: Size): Url
        description: String
        accessToken: String
        refreshToken: String
        csrfToken: String
    }
    type User {
        id: String!
        name: String!
        email: Email!
        role: Role!
        roles: [Role]!
        dateCreated: Date!
        avatar(size: Size): Url
        description: String
    }
`

export const AuthInputs = `
    input LoginInput {
        email: Email! 
        password: String!
        role: Role!
    }
    input SignupInput {
        name: String!
        description: String
        avatar: Url
        email: Email!
        password: String! 
        role: Role!
    }
    input ReloginInput { 
        refreshToken: String!
        role: Role!
    }
    input DeleteUserInput {
        id: String
    }
    input ReassignUserInput {
        role: Role
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