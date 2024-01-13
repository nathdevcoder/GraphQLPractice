
import { GraphQLScalarType, Kind } from 'graphql';
import { isEmail, isURL, isDate } from 'validator'



const EmailScalar = new GraphQLScalarType({
  name: 'Email',
  description: 'A custom scalar representing an email address',
  serialize(value) {
    if (typeof value === 'string' && isEmail(value)) {
      return value.toLowerCase();
    }
    throw new Error('Invalid email format');
  },
  parseValue(value) {
    if (typeof value === 'string' && isEmail(value)) {
      return value.toLowerCase();
    }
    throw new Error('Invalid email format');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING && isEmail(ast.value)) {
      return ast.value.toLowerCase();
    }
    return null;
  },
});


const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime();
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value);
    } else if (typeof value === 'string' && isDate(value)) {
      return new Date(value)
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    } else if (ast.kind === Kind.STRING && isDate(ast.value)) {
      return new Date(ast.value);
    }
    return null;
  },
});

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

export default {
  Date: dateScalar,
  Email: EmailScalar,
  URL: URLScalar
} 