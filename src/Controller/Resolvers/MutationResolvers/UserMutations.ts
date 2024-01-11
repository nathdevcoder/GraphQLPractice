
import { AddUser, DeleteUser, GetUser } from "@Root/Model/User";

import { CreateToken } from "@Auth/UserToken";
import { authenticated } from "@Auth/Auth";
import { VerifyPassword } from "@Auth/UserPassword";

import { EmailNotFoundError, WrongPasswordError, } from "@ErrorHandlers/UIErrors";
import { BadGateway, InternalServerError } from "@Root/Errors/ServerErrors";

import { AuthResolverType, DelUserResolverType } from "@Root/@types/user";



const login:AuthResolverType = async (_, input) => {

    const data = await GetUser(input.email);
    if (!data) throw EmailNotFoundError;
    const isEqual = await VerifyPassword(input.password, data.password);
    if (!isEqual) throw WrongPasswordError;
    const token = CreateToken(data);
    if (!token) throw InternalServerError;
    return { 
        role: 'ADMIN',
        dateCreated: '',
        email: 'a@a.com',
        id: 'asd',
        name: 'nath'
    };

} 

const signup:AuthResolverType = async (_, input) => {

    const data = await AddUser(input);
    if (!data) throw BadGateway;
    const token = CreateToken(data);
    if (!token) throw InternalServerError;
    return { 
        role: 'ADMIN',
        dateCreated: '',
        email: 'a@a.com',
        id: 'asd',
        name: 'nath'
    };

}

//   resignup: async (_:null, input: any, context: any) => {
//     if (!context.req.isAuth) throw authTimeOutError;
//     const data = await UpdateUser(input);
//     if (!data) throw registeringError;
//     const token = CreateToken(data);
//     if (!token) throw creatingTokenError;
//     return {   };
//   }

const deleteprofile:DelUserResolverType = async (_ ,input) => { 
    try {
        await DeleteUser({userid:input.email});
        return { message: "Account Deleted" };
    } catch (error) {
        throw InternalServerError
    } 
}



export default {
    login,
    signup,
    deleteprofile: authenticated(deleteprofile),
};
