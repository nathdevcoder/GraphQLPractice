import { GetUser } from "@Root/Model/User";
import { UserResponse } from "@Root/utils/DBHelper";
import jwt from "jsonwebtoken";  

const SECRET = process.env.SECRET || "catpack"
const REFRESH = process.env.REFRESH || "choppper"

export function CreateToken({id, role}: TokenType) { 
  const accessToken =  jwt.sign({id, role}, SECRET, { expiresIn: "20m" }); 
  const refreshToken = jwt.sign({id, role}, REFRESH );
  return {accessToken, refreshToken}
}
 
export async function VerifyRefreshToken(refreshToken: string) {
  const userToken = jwt.verify(refreshToken, REFRESH) as TokenType
  if(!userToken) return null 
  const accessToken = jwt.sign(userToken, SECRET, { expiresIn: "20m" }); 
  if(!accessToken) return null 
  const user = await GetUser(userToken.id)
  if(!user || !user.refreshToken) return  null
  return  UserResponse(user, {
    accessToken: accessToken,
    refreshToken: user.refreshToken
  })
}

export async function VerifyAccessToken(token: string): Promise<UserType | null> {
  try {
    const userToken = jwt.verify(token, SECRET) as TokenType
    if(!userToken) return null 
    const user = await GetUser(userToken.id)
    if(!user || !user.refreshToken) return  null
    return  UserResponse(user, {
      accessToken: token,
      refreshToken: user.refreshToken
    })
  } catch (e) {
    return null
  }  
}


