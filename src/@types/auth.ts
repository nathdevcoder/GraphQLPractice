type RoleType = 'ADMIN' | 'MEMBER' | 'STAFF' | 'USER'

type TokenType = {
    role: RoleType
    id: string
} 

type ContextType = {
    user: UserType | null
}

type UserSchemaType = {
    name: string
    description: string 
    avatar: string
    email: string
    password: string 
    id: string  
    role: RoleType
    dateCreated: Date | string
    refreshToken: string | null
}


type UserType = {
    id: string
    name: string
    email: string
    role: RoleType
    dateCreated: Date | string
    avatar: string
    description: string
    accessToken: string
    refreshToken: string
}

type UserResponseType = Promise<Omit<UserType, 'accessToken' | 'refreshToken' >> 

type AuthInputType = { 
    email: string
    role: RoleType
    password: string
} 

type RefreshTokenInputType = Pick<UserType, 'refreshToken'>
type RegisterInputType = Omit<UserSchemaType, 'refreshToken' | 'id' | 'dateCreated' | 'role' >