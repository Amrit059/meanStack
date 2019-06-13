import * as mongoose from 'mongoose';

/* usermodel for intreation the database */

export interface UserDocument extends mongoose.Document {
    _id: string;
    emailId: string;
    password: string;
    mNo: number;
    dob: Date;
    roles: string[];
    bio: string;
    gender: string;
    maritalStatus: string;
}

export const UserSchema = new mongoose.Schema({
    emailId: { type: String },
    password: { type: String },
    mNo: { type: Number },
    dob: { type: Date },
    bio: { type: String },
    gender: { type: String },
    maritalStatus: { type: String },
    roles: { type: [String] }
});

const User: mongoose.Model<UserDocument> = mongoose.model<UserDocument>('Users', UserSchema, 'User');

export default User;
