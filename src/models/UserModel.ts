import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    {
        collection: "allUsers"
    })

const User = mongoose.models.allUsers || mongoose.model("allUsers", userSchema)

export default User;