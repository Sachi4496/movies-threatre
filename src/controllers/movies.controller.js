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



router.patch("/:id", upload.single("profile_image"), async (req, res) => {
    try {
        const movieone = await Movie.findById(req.params.id).lean().exec();
        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            actors: req.body.actors,
            languages: req.body.languages,
            directors: req.body.directors,
            poster_url: req.file.path,
        }, { new: true }).lean().exec();
        res.status(200).send(movie);
        if (req.file?.path) {
            fs.unlinkSync(movieone.profile_image)
        }
    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec();
        res.send(user);
        fs.unlinkSync(movie.poster_url);
    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})


module.exports = router;