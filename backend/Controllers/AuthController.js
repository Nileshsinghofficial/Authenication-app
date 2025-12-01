const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')
const UserModel = require("../Models/User")

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await UserModel.findOne({email})

        if(user){
            return res.status(409).json({
                success: false,
                message: "User is already exist, you can login"
            })
        }

        // const hashPass = await bcrypt.hash(password, 10)

        // const User = await UserModel.create({
        //     name,
        //     email,
        //     password : hashPass
        // })

        const userModel = new UserModel({name, email, password})
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        return res.status(201).json({
            success: true,
            message: "Signup Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(403).json({
                success: false,
                message: "Auth failed email or password is wrong"
            })
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403).json({
                success: false,
                message: "Auth failed password is wrong"
            })
        }

        const jwtToken = await Jwt.sign({email: user.email, _id: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'})

        res.status(200).json({
            success: true,
            message: "Login Successfully",
            jwtToken,
            email,
            name: user.name
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    signup,
    login
}