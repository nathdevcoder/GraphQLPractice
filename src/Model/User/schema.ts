import mongoose from "mongoose"; 
const Schema = mongoose.Schema;

export const userSchema = new Schema<UserSchemaType>({
  userName: String,
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
  }
} );

export default mongoose.model<UserSchemaType>("User", userSchema);
