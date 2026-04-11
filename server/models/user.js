const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Bcrypt Encryption

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },
    securityQuestionAnswer: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    profilePicture: {
        type: String,
        default: ""
    }
}, { timestamps: true })
userSchema.pre("save", async function () {
    try {
        const salt = await bcrypt.genSalt(10);
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, salt);
        }

        if (this.isModified("securityQuestionAnswer")) {
           
            this.securityQuestionAnswer = await bcrypt.hash(this.securityQuestionAnswer, salt);
        }

        if (!this.bio) {
            this.bio = `Hey, I'm ${this.firstName}`;
        }

    } catch (error) {
        console.log("[UserModel] Error:", error);
        throw error;
    }
});
const userModel = mongoose.model("User", userSchema);

module.exports = userModel