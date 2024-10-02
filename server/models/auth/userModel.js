const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
 {
    name: {
        type: String,
        required: [true, "Please enter your name!"]
    },
    email: {
        type: String,
        required: [true, "Please an email!"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please add passwprd"]
    },
    photo: {
        type: String,
        default: "https://avatars.githubusercontent.com/u/19819005?v=4",
    },
    bio:{
        tyepe: String,
        default: "I ama new user!"
    },
    role: {
        type: String,
        enum: ["user","admin","creator"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
},
{ timestamps: true, minimize: true }
);

//Hashing the password before saving
userSchema.pre("save", async (next) => {
    //Check if the password is not modified
    if(!this.isModified("password")){
        return next();
    }

    //generate salt
    const salt = await bcrypt.genSalt(10);
    //Hash password with salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;