import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    user_name: {type: String, required: true},
    email: {type: String, required: true},
    user_image: {type: String, required: true},
},
    {
        collection: "int_User",
    }
);

const User = mongoose.model('User', UserSchema)

export default User;