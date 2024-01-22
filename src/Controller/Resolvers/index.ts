import { getUser } from "./QueryResolvers/UserQuery";
import { books } from "./QueryResolvers/bookQuery"; 
import {gettabledata} from "./QueryResolvers/TableQuery"
import { deleteprofile, login, logout, reassign, relogin, signup } from './MutationResolvers/UserMutations';
import { addtabledata } from './MutationResolvers/TableMutations'
import dateScalar from "./CustomScalars/DateScalar";
import EmailScalar from "./CustomScalars/EmailScalar";
import URLScalar from "./CustomScalars/UrlScalar";
import { authenticated, authorized } from "#Auth/Auth";
import { image } from "./TypeResolvers/userTypes";
import { DirResolve } from "./TypeResolvers/DirTypes";
import { addFile, addFolder } from "./MutationResolvers/MyFilesMutations";
import { GetMyFiles } from "./QueryResolvers/MyFilesQuery";

const resolvers = {
    Date: dateScalar,
    Email: EmailScalar,
    Url: URLScalar,

    Query: { 
        getUser: authenticated(authorized('USER', getUser)),
        books: authenticated(authorized('USER', books)),
        gettabledata: gettabledata,
        getmyfiles: GetMyFiles
    },

    Mutation: {
        login: login,
        signup: signup,
        relogin: authenticated(relogin),
        logout: authenticated(logout),
        reassign: authenticated(reassign),
        deleteprofile: authenticated(deleteprofile),
        addtabledata: addtabledata,
        addfolder: addFolder,
        addfile: addFile
    },

    User: {
        avatar: image
    },

    Auth: {
        avatar: image
    },

    Dir: {
        __resolveType: DirResolve
    }
};
export default resolvers;