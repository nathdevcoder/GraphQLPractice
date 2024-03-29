import { GraphQLFieldResolver } from "graphql";

type ResolverType<A, R, P = undefined> = GraphQLFieldResolver<P, ContextType, {input:A}, Promise<R>>

type AuthArgumentType<T> =
  T extends 'refresh' ? RefreshTokenInputType :
  T extends 'register' ? RegisterInputType :
  AuthInputType 

export type AuthResolverType<T='auth'> =  ResolverType <AuthArgumentType<T>, UserType>

export type InvalidateResolverType =  ResolverType <undefined, {message: string, id?: string}>

export type RevalidateResolverType =  ResolverType <{role: RoleType}, UserType>

export type DelUserResolverType =  ResolverType <{id: string}, {message: string}>

export type GetUserResolverType =  ResolverType <{id: string}, Omit<UserSchemaType, 'refreshToken' | 'password'>>