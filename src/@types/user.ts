import { GraphQLFieldResolver } from "graphql";

type ResolverType<T, R, P = undefined> = GraphQLFieldResolver<P, ContextType, T, Promise<R>>
 
export type AuthResolverType<T='auth'> =  ResolverType <T extends 'refresh' ? Pick<UserType, 'refreshToken'> : AuthInputType, UserType>

export type DelUserResolverType =  ResolverType <{email: string}, {message: string}>