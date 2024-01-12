
import { AddUser, DeleteUser, GetUser, LoginUser } from "@Root/Model/User";

import { CreateToken, VerifyRefreshToken } from "@Auth/UserToken";
import { authenticated } from "@Auth/Auth";
import { VerifyPassword } from "@Auth/UserPassword";

import { EmailNotFoundError, WrongPasswordError, } from "@ErrorHandlers/UIErrors";
import { BadGateway, InternalServerError } from "@Root/Errors/ServerErrors";

import { AuthResolverType, DelUserResolverType } from "@Root/@types/user";
import { UserResponse } from "@Root/utils/DBHelper";



const login:AuthResolverType = async (_, input) => {

    const data = await GetUser(input.email);
    if (!data) throw EmailNotFoundError;
    const isEqual = await VerifyPassword(input.password, data.password);
    if (!isEqual) throw WrongPasswordError;
    const {accessToken, refreshToken} = CreateToken(data); 
    if (!accessToken || !refreshToken) throw InternalServerError;
    const user = await LoginUser(data._id, refreshToken)
    if(!user) throw BadGateway;  
    return  UserResponse(user, {accessToken, refreshToken})

} 

const signup:AuthResolverType<'register'> = async (_, input) => {

    const data = await AddUser(input);
    if (!data) throw BadGateway;
    const {accessToken, refreshToken} = CreateToken(data); 
    if (!accessToken || !refreshToken) throw InternalServerError;
    const user = await LoginUser(data._id, refreshToken)
    if(!user) throw BadGateway;
    return UserResponse(user, {accessToken, refreshToken})

}

const relogin:AuthResolverType<'refresh'> = async (_, input ) => {
 
    const data = await VerifyRefreshToken(input.refreshToken)
    if (!data) throw InternalServerError;
    return data

}

const deleteprofile:DelUserResolverType = async (_ ,input) => { 
    try {
        await DeleteUser({userid:input.id});
        return { message: "Account Deleted" };
    } catch (error) {
        throw InternalServerError
    } 
}



export default {
    login,
    signup,
    relogin: authenticated(relogin),
    deleteprofile: authenticated(deleteprofile),
};
