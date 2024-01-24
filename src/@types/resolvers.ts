import { GraphQLFieldResolver } from "graphql";
import { PubSub } from "graphql-subscriptions";

type ResolverType<A, R, P = unknown> = GraphQLFieldResolver<P, ContextType, A, Promise<R>>


export type TableResolverType<T> = 
T extends 'get' ? ResolverType<{ input: TableStateType }, TableResponseType> : 
T extends 'add' ? ResolverType<{ input: Omit<TableDataType, 'id'> }, TableDataType> : 
undefined

export type SubcriptionResolver<A,R> = (pubsub: PubSub, key: string) => ResolverType<A, R>

export default ResolverType