const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    },
    workoutsArr: {
        type: Array,
        default: [],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    signUpDate: {
        type: Date,
        default: Date.now(),
    },
});

UserSchema.methods.matchPassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("user", UserSchema)



module.exports = { User }
