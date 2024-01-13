type RoleType = 'ADMIN' | 'MEMBER' | 'STAFF' | 'USER'

type TokenType = {
    role: RoleType
    id: string
} 

type authResponseType = Omit<UserType, 'accessToken' > | null
type UserResponseType = Promise<authResponseType> 

type ContextType = {
    user: authResponseType
}

type UserSchemaType = {
    name: string
    description: string 
    avatar: string
    email: string
    password: string 
    id: string  
    role: RoleType
    roles: RoleType[]
    dateCreated: Date | string
    refreshToken: string | null
}


type UserType = {
    id: string
    name: string
    email: string
    role: RoleType
    roles: RoleType[]
    dateCreated: Date | string
    avatar: string
    description: string
    accessToken: string
    refreshToken: string
} 

type AuthInputType = { 
    email: string
    role: RoleType
    password: string
} 

type RefreshTokenInputType =  Pick<UserType, 'refreshToken'> 
type RegisterInputType =  Omit<UserSchemaType, 'refreshToken' | 'id' | 'dateCreated' | 'role' > 