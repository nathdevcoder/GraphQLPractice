import { GetUser } from "@Root/Model/User";
import jwt from "jsonwebtoken";  

const SECRET = process.env.SECRET || "catpack"

export function CreateToken({id, role}: TokenType) {
  return jwt.sign({id, role}, SECRET, { expiresIn: "1h" });
}

export async function VerifyToken(token: string): Promise<UserType | null> {
  try {
    const userToken = jwt.verify(token, SECRET) as TokenType
    if(!userToken) return null 
    const user = await GetUser(userToken.id)
    if(!user) return  null
    return {
      role: user.role,
      name: user.userName,
      email: user.email,
      id: user._id.toString(),
      dateCreated: user.dateCreated
    } 
  } catch (e) {
    return null
  }  
}


