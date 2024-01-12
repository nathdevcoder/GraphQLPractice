import { HashPassword } from "@Auth/UserPassword";
import { EmailAlreadyRegisteredError } from "@ErrorHandlers/UIErrors";
import User from "./schema";
import { Types } from "mongoose";
 

export async function AddUser(args: AuthInputType) {
  const user = await User.findOne({ email: args.email });
  if (user) throw EmailAlreadyRegisteredError
  const hashedPW = await HashPassword(args.password);

  const newuser = new User<Omit<UserSchemaType, 'id' | 'refreshToken'>>({
    userName: 'Hello user',
    email: args.email,
    password: hashedPW, 
    avatar: '', 
    description: '',
    dateCreated: new Date(),
    role: 'USER'
  });
  const data = await newuser.save();
  return data;
}

export async function GetUser(id: string) {
  return await User.findById(id)
} 

export async function LoginUser(id: Types.ObjectId, refreshToken: string) {
  return await User.findByIdAndUpdate(id, {refreshToken})
} 

export async function DeleteUser(args: { userid: string }) {
  await User.findByIdAndDelete(args.userid);
}

 