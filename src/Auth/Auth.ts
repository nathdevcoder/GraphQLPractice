import { AuthenticationError, AuthorizationError } from "../Errors/AuthErrors";
import { VerifyToken } from "./UserToken";
 

const auth = (req: any, res: any, next: () => void) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  let decodeToken: any;
  try {
    decodeToken = VerifyToken(authHeader);
  } catch (err: any) {
    req.isAuth = false;
    return next();
  }
  if (!decodeToken) {
    req.isAuth = false;
    return next();
  }
  req.userId = decodeToken.userId;
  req.isAuth = true;
  next();
};

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


export default auth;
