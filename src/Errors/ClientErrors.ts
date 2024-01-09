import { GraphQLError } from 'graphql';

export const AuthenticationError = new GraphQLError('Not Authenticated', {
  extensions: { code: 'UNAUHTENTICATED', type: 'auth', status: 401 },
});

export const AuthorizationError = new GraphQLError('Not Authorized', {
  extensions: { code: 'UNAUTHORIZED', type: 'auth', status: 401 },
})

export const ValidationError = new GraphQLError('Validation Error', {
  extensions: { code: 'BAD_USER_INPUT', type: 'client', status: 400 },
});

export const NotFoundError = new GraphQLError('Not Found', {
  extensions: { code: 'NOT_FOUND', type: 'client', status: 404 },
});

export const DuplicateError = new GraphQLError('Duplicate Entry', {
  extensions: { code: 'DUPLICATE_ENTRY', type: 'client', status: 409 },
});

export const RateLimitError = new GraphQLError('Rate Limit Exceeded', {
  extensions: { code: 'RATE_LIMIT', type: 'client', status: 429 },
});

export const UnprocessableEntityError = new GraphQLError('Unprocessable Entity', {
  extensions: { code: 'UNPROCESSABLE_ENTITY', type: 'client', status: 422 },
});

export const PaymentRequiredError = new GraphQLError('Payment Required', {
  extensions: { code: 'PAYMENT_REQUIRED', type: 'client', status: 402 },
});

export const ForbiddenError = new GraphQLError('Forbidden', {
  extensions: { code: 'FORBIDDEN', type: 'client', status: 403 },
});