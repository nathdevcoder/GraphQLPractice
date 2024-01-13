import BookQuery from "./QueryResolvers/bookQuery";
import UserQuery from "./QueryResolvers/UserQuery";
import UserMutation from './MutationResolvers/UserMutations';
import CustomScalar from './CustomScalars'

const resolvers = {
    ...CustomScalar,

    Query: {
        ...BookQuery, 
        ...UserQuery
    },

    Mutation: {
        ...UserMutation
    }
};
export default resolvers;