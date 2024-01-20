import { GraphQLFieldResolver } from "graphql";

type ResolverType<A, R, P = unknown> = GraphQLFieldResolver<P, ContextType, A, Promise<R>>

type TableArgumentType<T> =
  T extends 'get' ? TableStateType :
  T extends 'add' ? Omit<TableDataType, 'id'> :
  undefined 

export type TableResolverType<T> =  ResolverType<{input: TableArgumentType<T>}, TableResponseType>

export default ResolverType