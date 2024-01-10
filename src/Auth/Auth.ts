import { GraphQLFieldResolver, GraphQLResolveInfo } from "graphql";
import { AuthenticationError, AuthorizationError } from "@ErrorHandlers/ClientErrors";


type authFnArgsType<P, C, A, R> = (
  root: P,
  args: A,
  context: C & { user: UserType },
  info: GraphQLResolveInfo
) => R

export const authenticated = <P, C, A, R>(
  next: GraphQLFieldResolver<P, C, A, R>
): authFnArgsType<P, C, A, R> => (root, args, context, info) => {
  if (!context.user) {
    throw AuthenticationError
  }
  return next(root, args, context, info)
}

export const authorized = <P, C, A, R>(
  role: RoleType,
  next: GraphQLFieldResolver<P, C, A, R>
): authFnArgsType<P, C, A, R> => (root, args, context, info) => {
  if (context.user.role !== role) {
    throw AuthorizationError
  }
  return next(root, args, context, info)
}

