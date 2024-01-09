import { GraphQLError } from 'graphql';

export const InternalServerError = new GraphQLError('Internal Server Error', {
  extensions: { code: 'INTERNAL_SERVER_ERROR', type: 'server', status: 500 },
});

export const NotImplemented = new GraphQLError('Not Implemented', {
  extensions: { code: 'NOT_IMPLEMENTED', type: 'server', status: 501 },
});

export const BadGateway = new GraphQLError('Bad Gateway', {
  extensions: { code: 'BAD_GATEWAY', type: 'server', status: 502 },
});

export const ServiceUnavailable = new GraphQLError('Service Unavailable', {
  extensions: { code: 'SERVICE_UNAVAILABLE', type: 'server', status: 503 },
});

export const GatewayTimeout = new GraphQLError('Gateway Timeout', {
  extensions: { code: 'GATEWAY_TIMEOUT', type: 'server', status: 504 },
});

export const HTTPVersionNotSupported = new GraphQLError('HTTP Version Not Supported', {
  extensions: { code: 'HTTP_VERSION_NOT_SUPPORTED', type: 'server', status: 505 },
});
