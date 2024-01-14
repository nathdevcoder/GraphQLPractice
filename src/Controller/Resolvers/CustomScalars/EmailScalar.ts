import { GraphQLScalarType, Kind } from 'graphql';
import { isEmail } from 'validator'



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

export default EmailScalar