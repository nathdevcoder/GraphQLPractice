import { makeExecutableSchema } from "@graphql-tools/schema";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { GraphQLSchema, defaultFieldResolver } from "graphql";
import typeDefs from "./TypeDefs";
import resolvers from "./Resolvers";
import { camelToSnake, snakeToCamel } from "#Utils/Formater";

function CustomDirective<T>(
  schema: GraphQLSchema,
  directiveName: string,
  checker: (result: unknown, directive: Record<string, any>) => T
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          return checker(result, directive);
        };
        return fieldConfig;
      }
    },
  });
}

let schema = makeExecutableSchema({ typeDefs, resolvers });

schema = CustomDirective(schema, "camelcase", (result) => {
  if (typeof result === "string") {
    return snakeToCamel(result);
  }
  return result;
});

schema = CustomDirective(schema, "snakecase", (result) => {
  if (typeof result === "string") {
    return camelToSnake(result);
  }
  return result;
});

schema = CustomDirective(schema, "uppercase", (result) => {
  if (typeof result === "string") {
    return result.toUpperCase();
  }
  return result;
});

schema = CustomDirective(schema, "lowercase", (result) => {
  if (typeof result === "string") {
    return result.toLowerCase();
  }
  return result;
});

schema = CustomDirective(schema, "money", (result, directive) => {
  if (typeof result === "number") {
    const moneyFormater = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: directive?.currency || "USD",
    }); 
    return moneyFormater.format(result)
  }
  return result;
});

schema = CustomDirective(schema, "log", (result) => {
  console.log(result);
  return result;
});

export default schema;
