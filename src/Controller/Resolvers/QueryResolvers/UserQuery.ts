import { authenticated, authorized } from "#Auth/Auth";
import { BadGateway } from "#ErrorHandlers/ServerErrors";
import { EmailNotFoundError } from "#ErrorHandlers/UIErrors";
import { GetUser } from "#Models/UserModel";
import { GetUserResolverType } from "#Types/user";


const getUser:GetUserResolverType = async (_, __, {user}) => {
    if(!user) throw EmailNotFoundError
    const data = await GetUser(user.id)
    if(!data) throw BadGateway
    return {
        name: data.name,
        avatar: data.avatar,
        dateCreated: data.dateCreated,
        email: data.email,
        id: data._id.toString(),
        description: data.description,
        role: data.role,
    }
}


export default {
    getUser: authenticated(authorized('USER', getUser))
  };