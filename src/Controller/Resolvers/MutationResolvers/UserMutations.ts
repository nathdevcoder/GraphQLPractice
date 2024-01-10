
import { CreateToken } from "@Auth/UserToken";
import { AddUser, DeleteUser, GetUser } from "@Root/Model/User";

import { VerifyPassword } from "@Auth/UserPassword";
import { AuthenticationError } from "@ErrorHandlers/ClientErrors";
import { EmailNotFoundError, WrongPasswordError, } from "@ErrorHandlers/UIErrors";
import { BadGateway, InternalServerError } from "@Root/Errors/ServerErrors";
import { authenticated } from "@Root/Auth/Auth";

async function login(_: null, args: any, context: any) {
    const data = await GetUser(args.email);
    if (!data) throw EmailNotFoundError;
    const isEqual = await VerifyPassword(args.password, data.password);
    if (!isEqual) throw WrongPasswordError;
    const token = CreateToken(data);
    if (!token) throw InternalServerError;
    return {};
}

async function signup(_: null, args: any, context: any) {
    const data = await AddUser(args);
    if (!data) throw BadGateway;
    const token = CreateToken(data);
    if (!token) throw InternalServerError;
    return {};
}

//   resignup: async (_:null, args: any, context: any) => {
//     if (!context.req.isAuth) throw authTimeOutError;
//     const data = await UpdateUser(args);
//     if (!data) throw registeringError;
//     const token = CreateToken(data);
//     if (!token) throw creatingTokenError;
//     return {   };
//   }

async function deleteprofile(_: null, args: { userid: string }, context: any) {
    if (!context.req.isAuth) throw AuthenticationError;
    try {
        await DeleteUser(args);
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
