import { Document, Types } from "mongoose";
 

export type DBType<T> = Document<unknown, {}, T> & T & {
  _id: Types.ObjectId;
}

export function UserResponse(data:DBType<UserSchemaType>, token:Pick<UserType, 'accessToken' | 'refreshToken'>){
    return {
        name: data.name,
        email: data.email,  
        avatar: data.avatar, 
        description: data.description,
        dateCreated: data.dateCreated,
        role: data.role,
        id: data._id.toString(),
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        roles: data.roles
      }
}