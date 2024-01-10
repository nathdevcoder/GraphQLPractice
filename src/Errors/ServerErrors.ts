import { GraphQLError } from 'graphql';

export const InternalServerError = new GraphQLError('Internal Server Error', {
  extensions: { code: 'INTERNAL_SERVER_ERROR', type: 'server' },
});

export const NotImplemented = new GraphQLError('Not Implemented', {
  extensions: { code: 'NOT_IMPLEMENTED', type: 'server' },
});

export const BadGateway = new GraphQLError('Bad Gateway', {
  extensions: { code: 'BAD_GATEWAY', type: 'server' },
});

export const ServiceUnavailable = new GraphQLError('Service Unavailable', {
  extensions: { code: 'SERVICE_UNAVAILABLE', type: 'server' },
});
