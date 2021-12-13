require("dotenv").config();
const jwt = require("jsonwebtoken");

const {body, validationResult} = require("express-validator")

const express = require('express');

const User = require('../models/user.model');

const upload = require("../midlewares/upload");

const router = express.Router();

const fs = require('fs');

router.post("",upload.single("profile_pic"), async (req, res) => {
    try{
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profile_pic: req.file.path,
        });
        res.status(200).send(user);
    }catch(e){
        return res.status(500).send({status:"failed", message: e.message});
    }
});

router.get("", async (req, res) => {
    try{
        const user = await User.find().lean().exec();

        res.status(200).send(user);
    }catch(e){
        return res.status(500).send({status:"failed", message: e.message});
    }
});

router.patch("/:id", upload.single("profile_image"), async (req, res) => {
    try {
        const userone = await User.findById(req.params.id).lean().exec();
        const user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profile_pic: req.file.path,
        }, { new: true }).lean().exec();
        res.status(200).send(user);
        if (req.file?.path) {
            fs.unlinkSync(userone.profile_image)
        }
    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        res.send(user);
        fs.unlinkSync(user.profile_pic);
    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

module.exports = router;