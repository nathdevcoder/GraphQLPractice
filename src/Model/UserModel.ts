import mongoose, { Types } from "mongoose"; 
import { HashPassword } from "#Auth/UserPassword";
import { EmailAlreadyRegisteredError } from "#ErrorHandlers/UIErrors"; 

const Schema = mongoose.Schema;

const userSchema = new Schema<UserSchemaType>({
  name: String,
  description: String, 
  avatar: String,
  dateCreated: { 
    type: Date, 
    default: Date.now 
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  roles: {
    type: [{
      type: String,
      enum: ['USER', 'ADMIN', 'MEMBER', 'STAFF'],
    }],
    default: ['USER'],
  },
  refreshToken:{
    type: String,
    require: false
  },
} );

const User = mongoose.model<UserSchemaType>("User", userSchema);

export async function AddUser(input: RegisterInputType) {
  const user = await User.findOne({ email: input.email });
  if (user) throw EmailAlreadyRegisteredError
  const hashedPW = await HashPassword(input.password);

  const newuser = new User<Omit<UserSchemaType, 'id' | 'refreshToken'>>({
    name: input.name,
    email: input.email,
    password: hashedPW, 
    avatar: input.avatar, 
    description: input.description,
    dateCreated: new Date(),
    roles: ['USER'],
    role: 'USER'
  });
  const data = await newuser.save();
  return data;
}

export async function GetUser(id: string) {
  return await User.findById(id)
} 

export async function GetUserByEmail(email: string) {
  return await User.findOne({email})
} 

export async function LoginUser(id: Types.ObjectId, refreshToken: string) {
  return await User.findByIdAndUpdate(id, {refreshToken})
} 

export async function LogoutUser(id: string) {
  return await User.findByIdAndUpdate(id, {refreshToken: ''})
} 

export async function DeleteUser(input: { userid: string }) {
  return await User.findByIdAndDelete(input.userid);
}

export async function AssignRole( role: RoleType , id: string, refreshToken: string) { 
  const _id = new mongoose.Types.ObjectId(id)
  return await User.findOneAndUpdate(
    { _id, roles: { $in: role } },
    { role, refreshToken },
    { new: true } 
  )
}
 