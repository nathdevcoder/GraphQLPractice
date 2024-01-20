import { getUser } from "./QueryResolvers/UserQuery";
import { books } from "./QueryResolvers/bookQuery"; 
import {gettabledata} from "./QueryResolvers/TableQuery"
import { deleteprofile, login, logout, reassign, relogin, signup } from './MutationResolvers/UserMutations';
import dateScalar from "./CustomScalars/DateScalar";
import EmailScalar from "./CustomScalars/EmailScalar";
import URLScalar from "./CustomScalars/UrlScalar";
import { authenticated, authorized } from "#Auth/Auth";
import { image } from "./TypeResolvers/userTypes";

const resolvers = {
    Date: dateScalar,
    Email: EmailScalar,
    Url: URLScalar,

    Query: { 
        getUser: authenticated(authorized('USER', getUser)),
        books: authenticated(authorized('USER', books)),
        gettabledata: gettabledata
    },

    Mutation: {
        login: login,
        signup: signup,
        relogin: authenticated(relogin),
        logout: authenticated(logout),
        reassign: authenticated(reassign),
        deleteprofile: authenticated(deleteprofile),
    },

    User: {
        avatar: image
    },

    Auth: {
        avatar: image
    }
};
export default resolvers;