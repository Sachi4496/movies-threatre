require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const newToken = (user) => {
    return jwt.sign({user: user}, process.env.JWT_SECRET_KEY)
}


const register = async(req, res) => {
    try {

        let user = await User.findOne({email : req.body.email})
        if(user) {
            return res.status(400).json({status :"failed", message : "Please Provide Different email"})
        }

        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            profile_pic: req.file.path,
        })

        const token = newToken(user)
        return res.status(201).send({user, token})

    }catch(e) {
        return res.status(500).json({status: "Failed", message: e.message})
    }
}

const login = async(req, res) => {
    try{

        let user = await User.findOne({email : req.body.email})
        if(!user) {
            return res.status(400).json({status :"failed", message : "Please Provide valid email"})
        }

        const match = await user.checkPassword(req.body.password)

        if(!match) {
            return res.status(400).json({status :"failed", message : "Please Provide valid email and password"})
        }

        const token = newToken(user)
        return res.status(201).json({user, token})



    }catch(e) {
        return res.status(500).json({status: "Failed", message: e.message})
    }
}

module.exports = {
    register, login
}