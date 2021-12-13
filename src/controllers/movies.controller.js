const express = require('express');

const User = require('../models/movies.model');

const upload = require("../midlewares/upload");

const router = express.Router();

const fs = require('fs');

router.post("", upload.single("poster_url"), async (req, res) => {
    try{
        const user = await User.create({
            name: req.body.name,
            actors: req.body.actors,
            languages: req.body.languages,
            directors: req.body.directors,
            poster_url: req.file.path,
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

router.get("/actor", async (req, res) => {
    try{
        const user = await User.find().lean().exec();

        res.status(200).send(user);
    }catch(e){
        return res.status(500).send({status:"failed", message: e.message});
    }
})

module.exports = router;