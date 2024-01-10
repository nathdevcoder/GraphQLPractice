import { HashPassword } from "@Auth/UserPassword";
import { EmailAlreadyRegisteredError } from "@ErrorHandlers/UIErrors";
import User from "./schema";
 

export async function AddUser(args: AuthInputType) {
  const user = await User.findOne({ email: args.email });
  if (user) throw EmailAlreadyRegisteredError
  const hashedPW = await HashPassword(args.password);

  const newuser = new User<Omit<UserSchemaType, 'id'>>({
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

export async function GetUser(email: string) {
  return await User.findOne({ email: email });
} 

export async function DeleteUser(args: { userid: string }) {
  await User.findByIdAndDelete(args.userid);
}

 