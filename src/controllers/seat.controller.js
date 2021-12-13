const express = require('express');

const Seat = require("../models/seat.model");

const theater = require("../models/shows.model");

const router = express.Router();

router.post("", async (req, res) => {
    try{
        const seat = await Seat.create(req.body);
        return res.status(200).send(seat);
    }catch(e){
        return res.status(500).send({status:"failed", message: e.message});
    }
});

router.get("", async (req, res) => {
    try{
        const seat = await Seat.find().populate({path:"show_id", select:"movie_id screen_id"}).lean().exec()
        return res.status(200).send(seat);
    }catch(e){
        return res.status(500).send({status:"failed", message: e.message});
    }
});

// router.delete("/:id", async (req, res) => {
//     try{
//         const theater = await Theater.de().lean().exec();
//         return res.status(200).send(theater);
//     }catch(e){
//         return res.status(500).send({status:"failed", message: e.message});
//     }
// });

module.exports = router;