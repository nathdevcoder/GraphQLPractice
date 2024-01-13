import BookQuery from "./QueryResolvers/bookQuery";
import UserQuery from "./QueryResolvers/UserQuery";
import UserMutation from './MutationResolvers/UserMutations'

const resolvers = {
    Query: {
        ...BookQuery, 
        ...UserQuery
    },
    Mutation: {
        ...UserMutation
    }
};
export default resolvers;