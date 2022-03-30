import { GraphQLScalarType, Kind } from 'graphql';

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Represent a date time object',
  serialize(value: any) {
    return value.toISOString();
  },
  parseValue(value: any) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value));
    }

    return null;
  },
});
