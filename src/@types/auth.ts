type RoleType = 'ADMIN' | 'MEMBER' | 'STAFF' | 'USER'

type TokenType = {
    role: RoleType
    id: string
}

type UserType = {
    id: string
    name: string
    email: string
    role: RoleType
    dateCreated: Date | string
}

type AuthInputType = { 
    email: string
    role: RoleType
    password: string
}