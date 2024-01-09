import { AuthenticationError, AuthorizationError } from "../Errors/ClientErrors";
 

export const authenticated = (next: (root:any, args:any, context:any, info:any)=>void) => (root:any, args:any, context:any, info:any) => {
  if (!context.user) {
    throw AuthenticationError
  } 
  return next(root, args, context, info)
}

export const authorized = (role:RoleType, next: (root:any, args:any, context:any, info:any)=>void) => (root:any, args:any, context:any, info:any)  => {
  if (context.user.role !== role) {
    throw AuthorizationError
  } 
  return next(root, args, context, info)
}

 