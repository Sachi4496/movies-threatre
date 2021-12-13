const express = require('express');

const Screen = require("../models/shows.model");

const movies = require("../models/movies.model");

const screen = require("../models/screen.model")

const router = express.Router();

router.post("", async (req, res) => {
    try{
        const screen = await Screen.create(req.body);
        return res.status(200).send(screen);
    }catch(e){
        return res.status(500).send({status:"failed", message: e.message});
    }
});

router.get("", async (req, res) => {
    try{
        const screen = await Screen.find().populate({path:"movie_id", select:"name actors languages directors poster_url"})
        .populate({path:"screen_id", select:"name"}).lean().exec()
        return res.status(200).send(screen);
    }catch(e){
        return res.status(500).send({status:"failed", message: e.message});
    }
});

// router.get("/nearest", async (req, res) => {
//     try{
//         const screen = await Screen.find().populate({path:"movie_id", select:"name actors languages directors poster_url"})
//         .populate({path:"screen_id", select:"name"}).lean().exec()
//         return res.status(200).send(screen);
//     }catch(e){
//         return res.status(500).send({status:"failed", message: e.message});
//     }
// });

// router.delete("/:id", async (req, res) => {
//     try{
//         const theater = await Theater.de().lean().exec();
//         return res.status(200).send(theater);
//     }catch(e){
//         return res.status(500).send({status:"failed", message: e.message});
//     }
// });

module.exports = router;

// , populate({path:"theater_id", select:"name location"})