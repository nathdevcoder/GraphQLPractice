import { GraphQLScalarType, Kind } from 'graphql';
import { isURL } from 'validator'


const URLScalar = new GraphQLScalarType({
    name: 'URL',
    description: 'A custom scalar representing a URL',

    serialize(value) {
        if (typeof value === 'string' && isURL(value)) {
            return value;
        }
        throw new Error('Invalid URL format');
    },
    parseValue(value) {
        if (typeof value === 'string' && isURL(value)) {
            return value;
        }
        throw new Error('Invalid URL format');
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING && isURL(ast.value)) {
            return ast.value;
        }
        return null;
    },
});

export default URLScalar