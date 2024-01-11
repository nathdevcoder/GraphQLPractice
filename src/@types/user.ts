import { GraphQLFieldResolver } from "graphql";

type ResolverType<T, R, P = undefined> = GraphQLFieldResolver<P, ContextType, T, Promise<R>>
 
export type AuthResolverType =  ResolverType <AuthInputType, UserType>

export type DelUserResolverType =  ResolverType <{email: string}, {message: string}>