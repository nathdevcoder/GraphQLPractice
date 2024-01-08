import jwt from "jsonwebtoken";  

const SECRET = process.env.SECRET || "catpack"

export function CreateToken({id, role}: TokenType) {
  return jwt.sign({id, role}, SECRET, { expiresIn: "1h" });
}

export function VerifyToken(token: string) {
  try {
    const user = jwt.verify(token, SECRET)
    console.log(user);
    // return models.User.findOne({id: user.id})
    return {
      id: 'sampleID',
      role: 'ADMIN',
      email: 'a@a.com',
      name: 'nathnath',
      dateCreated: 'jan 2, 2022'
    } satisfies UserType
  } catch (e) {
    return null
  }  
}


