import mongoose, { Document, Model, Schema } from 'mongoose';

export type UserAttributes = {
  name: string;
  email: string;
  password: string;
};

export type UserDocument = Document & UserAttributes;

type UserModel = Model<UserDocument>;

const UserSchema = new Schema<UserAttributes>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<UserDocument, UserModel>('User', UserSchema);
