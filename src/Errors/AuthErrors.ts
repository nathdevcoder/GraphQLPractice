import { GraphQLError } from 'graphql';

export const AuthenticationError = new GraphQLError('Not Authenticated', {
  extensions: { code: 'NOT_AUHTENTICATED' },
});

export const AuthorizationError = new GraphQLError('Not Authorized', {
    extensions: { code: 'NOT_AUTHORIZED' },
});