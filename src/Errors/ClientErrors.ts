import { GraphQLError } from 'graphql';

export const AuthenticationError = new GraphQLError('Not Authenticated', {
  extensions: { code: 'UNAUHTENTICATED', type: 'auth', },
});

export const AuthorizationError = new GraphQLError('Not Authorized', {
  extensions: { code: 'UNAUTHORIZED', type: 'auth', },
})

export const ValidationError = new GraphQLError('Validation Error', {
  extensions: { code: 'BAD_USER_INPUT', type: 'client'},
});

export const NotFoundError = new GraphQLError('Not Found', {
  extensions: { code: 'NOT_FOUND', type: 'client' },
});

export const DuplicateError = new GraphQLError('Duplicate Entry', {
  extensions: { code: 'DUPLICATE_ENTRY', type: 'client' },
});

export const UnprocessableEntityError = new GraphQLError('Unprocessable Entity', {
  extensions: { code: 'UNPROCESSABLE_ENTITY', type: 'client'},
});

export const PaymentRequiredError = new GraphQLError('Payment Required', {
  extensions: { code: 'PAYMENT_REQUIRED', type: 'client'},
});

export const ForbiddenError = new GraphQLError('Forbidden', {
  extensions: { code: 'FORBIDDEN', type: 'client' },
});