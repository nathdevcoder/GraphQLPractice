import { GetUser } from "#Models/UserModel";
import { UserResponse } from "#Utils/DBHelper";
import jwt from "jsonwebtoken";  
import { v4 as uuidv4 } from 'uuid';

const SECRET = process.env.SECRET || "catpack"
const REFRESH = process.env.REFRESH || "choppper"

export function CreateToken({id, role}: TokenType) { 
  const csrfToken = uuidv4()
  const accessToken =  jwt.sign({id, role, csrfToken}, SECRET, { expiresIn: "15m" }); 
  const refreshToken = jwt.sign({id}, REFRESH );
  return {accessToken, refreshToken, csrfToken}
}
 
export async function VerifyRefreshToken(refreshToken: string, role: RoleType) {
  const userToken = jwt.verify(refreshToken, REFRESH) as TokenType
  if(!userToken) return null 
  const csrfToken = uuidv4()
  const accessToken = jwt.sign({...userToken, role, csrfToken}, SECRET, { expiresIn: "15m" }); 
  if(!accessToken) return null 
  const user = await GetUser(userToken.id)
  if(!user || !user.refreshToken) return  null
  return  UserResponse(user, {
    accessToken: accessToken,
    refreshToken: user.refreshToken,
    csrfToken
  })
}

export async function VerifyAccessToken(token: string): UserResponseType {
  try {
    const userToken = jwt.verify(token, SECRET) as TokenType&{csrfToken: string}
    if(!userToken) return null 
    const user = await GetUser(userToken.id)
    if(!user || !user.refreshToken) return  null
    return  UserResponse(user, {
      accessToken: token,
      refreshToken: user.refreshToken,
      csrfToken: userToken.csrfToken
    })
  } catch (e) {
    return null
  }  
}


