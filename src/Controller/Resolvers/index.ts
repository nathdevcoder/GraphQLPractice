import BookQuery from "./QueryResolvers/bookQuery";
import UserMutation from './MutationResolvers/UserMutations'

const resolvers = {
    Query: {
        ...BookQuery, 
    },
    Mutation: {
        ...UserMutation
    }
};
export default resolvers;