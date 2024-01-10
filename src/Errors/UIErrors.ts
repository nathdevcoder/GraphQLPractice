import { GraphQLError } from "graphql";

export const EmailNotFoundError = new GraphQLError('Email Not Registered', {
    extensions: { code: 'NOT_FOUND', type: 'client' },
});

export const WrongPasswordError = new GraphQLError('Wrong Password', {
    extensions: { code: 'UNAUTHORIZED', type: 'client' },
});

export const EmailAlreadyRegisteredError = new GraphQLError('Email Already Registered', {
    extensions: { code: 'DUPLICATE_ENTRY', type: 'client' },
});