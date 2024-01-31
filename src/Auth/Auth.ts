import { GraphQLFieldResolver, GraphQLResolveInfo } from "graphql";
import { AuthenticationError, AuthorizationError, ForbiddenError } from "#ErrorHandlers/ClientErrors";


type authFnArgsType<A, R, P = undefined> = (
  root: P,
  args: A,
  context: ContextType,
  info: GraphQLResolveInfo
) => R

export const authenticated = <A, R, P>(
  next: GraphQLFieldResolver<P, ContextType, A, R>
): authFnArgsType<A, R, P> => (root, args, context, info) => {
  if (!context.user) {
    throw AuthenticationError
  }
  return next(root, args, context, info)
}

export const authorized = <A, R, P>(
  role: RoleType,
  next: GraphQLFieldResolver<P, ContextType, A, R>
): authFnArgsType<A, R, P> => (root, args, context, info) => {
  if (context.user?.role !== role) {
    throw AuthorizationError
  }
  return next(root, args, context, info)
}

export const verified = <A, R, P>(
  next: GraphQLFieldResolver<P, ContextType, A, R>
): authFnArgsType<A, R, P> => (root, args, context, info) => {
  const {user, token:{csrfToken}} = context
  if(!user || !user.csrfToken || csrfToken) throw ForbiddenError
  if (user.csrfToken !==  csrfToken) {
    throw ForbiddenError
  }
  return next(root, args, context, info)
}

