type RoleType = 'ADMIN' | 'MEMBER' | 'STAFF' | 'USER'

type TokenType = {
    role: RoleType
    id: string
} 

type ContextType = {
    user: UserType | null
}

type UserSchemaType = {
    userName: string
    description: string 
    avatar: string
    email: string
    password: string 
    id: string  
    role: RoleType
    dateCreated: Date | string
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