const express = require('express');

const Screen = require("../models/screen.model");

const theater = require("../models/theater.model");

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
        const screen = await Screen.find().populate({path:"theater_id", select:"name location"}).lean().exec()
        return res.status(200).send(screen);
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