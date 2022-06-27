import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
    name: {
        type: String, required: true
    },
    password: {
        type: String,
        required: [true, 'you must enter a password'],
        minlength: 8,
        // this will make sure that the pass never show any where when we send requset or when we signup {this is for security}

    },
    email: {
        type: String,
        required: [true, 'you must enter an email'],
        unique: true,
        validate: [validator.isEmail, 'please provide a valid email'],
    },
    isAdim: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre('save', async function (next) {
    // we want to make it run only if the password field is changed but not for any change like email
    if (!this.isModified('password')) {
        next()
    }
    // hash password bofore save in db
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model('User', userSchema)


export default User
