const { Schema, model } = require('mongoose');

const theaterSchema = new Schema({
    name: { type: 'string', required: true },
    location: { type: 'string', required: true },
},
    {
        versionKey: false,
        timestamp: true,
    }
);

module.exports = model("theater", theaterSchema);