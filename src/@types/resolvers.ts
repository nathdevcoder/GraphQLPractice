import { GraphQLFieldResolver } from "graphql";

type ResolverType<A, R, P = unknown> = GraphQLFieldResolver<P, ContextType, A, Promise<R>>

export default ResolverType