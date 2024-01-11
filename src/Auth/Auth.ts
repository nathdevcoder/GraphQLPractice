import { GraphQLFieldResolver, GraphQLResolveInfo } from "graphql";
import { AuthenticationError, AuthorizationError } from "@ErrorHandlers/ClientErrors";


type authFnArgsType<P, A, R> = (
  root: P,
  args: A,
  context: ContextType,
  info: GraphQLResolveInfo
) => R

export const authenticated = <P, A, R>(
  next: GraphQLFieldResolver<P, ContextType, A, R>
): authFnArgsType<P,  A, R> => (root, args, context, info) => {
  if (!context.user) {
    throw AuthenticationError
  }
  return next(root, args, context, info)
}

export const authorized = <P, C, A, R>(
  role: RoleType,
  next: GraphQLFieldResolver<P, ContextType, A, R>
): authFnArgsType<P,  A, R> => (root, args, context, info) => {
  if (context.user?.role !== role) {
    throw AuthorizationError
  }
  return next(root, args, context, info)
}

