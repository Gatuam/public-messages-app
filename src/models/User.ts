import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content : string,
    createAt : Date,
}

const MessageSchema: Schema <Message> = new Schema({
    content: {
        type : String,
        required : true
    },
    createAt : {
        type : Date,
        required: true,
        default : Date.now
    }
});
export interface User extends Document{
    username : string,
    email : string,
    password : string,
    verifyCode : string,
    isVerify : boolean,
    verifyCodeExp : Date,
    isAccpectingMessage : boolean,
    message : Message[],
}
const UserSchema: Schema <User> = new Schema({
    username : {
        type : String,
        required : [true, 'Username is required'],
        trim : true,
        unique : [true, 'Username should be unique'],
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : [true, 'Email should be unique'],
    },
    password : {
        type : String,
        required : [true, 'Password is required'],
    },
     verifyCode : {
        type : String,
        required : [true, 'Email is required'],
    },
    isVerify : {
        type : Boolean,
        default : false
    },
    verifyCodeExp : {
        type : Date,
    },
    isAccpectingMessage : {
        type : Boolean,
        default : true
    },
    message : {
        type : [MessageSchema]
    }
});

const UserModel =  mongoose.models.User as mongoose.Model <User> || mongoose.model<User>('User', UserSchema)

export default UserModel