import { ContextFunction } from "@apollo/server";
import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";


export type ContextFunctionType = ContextFunction<[StandaloneServerContextFunctionArgument], ContextType>