import BookQuery from "./QueryResolvers/bookQuery";

const resolvers = {
    Query: {
        ...BookQuery, 
    }
};
export default resolvers;