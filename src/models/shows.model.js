const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    timing:{ type: 'string', required: true},
    total_seats: { type: 'string', required: true },
    movie_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"movie",
        required: true
    },
    screen_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"screen",
        required: true
    }
},
    {
        versionKey: false,
        timestamp: true,
    }
);

module.exports = mongoose.model("show", showSchema);