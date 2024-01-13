
import { AddUser, AssignRole, DeleteUser, GetUserByEmail, LoginUser, LogoutUser } from "#Models/UserModel";

import { CreateToken, VerifyRefreshToken } from "#Auth/UserToken";
import { authenticated } from "#Auth/Auth";
import { VerifyPassword } from "#Auth/UserPassword";

import { EmailNotFoundError, WrongPasswordError, } from "#ErrorHandlers/UIErrors";
import { BadGateway, InternalServerError } from "#ErrorHandlers/ServerErrors";

import { AuthResolverType, DelUserResolverType, InvalidateResolverType, RevalidateResolverType } from "#Types/user";
import { UserResponse } from "#Utils/DBHelper";



const login:AuthResolverType = async (_, {input}) => {

    const data = await GetUserByEmail(input.email);
    if (!data) throw EmailNotFoundError;
    const isEqual = await VerifyPassword(input.password, data.password);
    if (!isEqual) throw WrongPasswordError;
    const {accessToken, refreshToken} = CreateToken(data); 
    if (!accessToken || !refreshToken) throw InternalServerError;
    const user = await LoginUser(data._id, refreshToken)
    if(!user) throw BadGateway;  
    return  UserResponse(user, {accessToken, refreshToken})

} 

const signup:AuthResolverType<'register'> = async (_, {input}) => {

    const data = await AddUser(input);
    if (!data) throw BadGateway;
    const {accessToken, refreshToken} = CreateToken(data); 
    if (!accessToken || !refreshToken) throw InternalServerError;
    const user = await LoginUser(data._id, refreshToken)
    if(!user) throw BadGateway;
    return UserResponse(user, {accessToken, refreshToken})

}

const relogin:AuthResolverType<'refresh'> = async (_, {input} ) => {
 
    const data = await VerifyRefreshToken(input.refreshToken)
    if (!data) throw InternalServerError;
    return data

}

const logout: InvalidateResolverType = async (_,__, {user}) => {

    if(!user) return {message: 'not loged in'}
    const data = await LogoutUser(user.id)
    if(!data) throw BadGateway
    return {message: 'done', id: data._id.toString()}

}

const reassign: RevalidateResolverType = async (_,{input},{user}) => {

    if(!user) throw InternalServerError
    const {accessToken, refreshToken} = CreateToken({id: user.id, role: input.role}); 
    const data = await AssignRole(
        input.role,
        user.id,
        refreshToken
    )
    if(!data) throw BadGateway
    return UserResponse(data,{accessToken, refreshToken})

}

const deleteprofile:DelUserResolverType = async (_ ,{input}) => { 
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
    logout: authenticated(logout),
    reassign: authenticated(reassign),
    deleteprofile: authenticated(deleteprofile),
};
