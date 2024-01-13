import { GraphQLScalarType, Kind } from 'graphql';
import validator from 'validator'

 

const EmailScalar = new GraphQLScalarType({
  name: 'Email',
  description: 'A custom scalar representing an email address',

  serialize(value) { 
    if (typeof value === 'string' && validator.isEmail(value)) {
      return value.toLowerCase(); 
    }
    throw new Error('Invalid email format');
  },

  parseValue(value) { 
    if (typeof value === 'string' && validator.isEmail(value)) {
      return value.toLowerCase();
    }
    throw new Error('Invalid email format');
  },

  parseLiteral(ast) { 
    if (ast.kind === Kind.STRING && validator.isEmail(ast.value)) {
      return ast.value.toLowerCase();
    }
    throw new Error('Invalid email format');
  },
});