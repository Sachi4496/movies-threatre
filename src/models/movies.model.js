const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    name: { type: 'string', required: true },
    actors: [{ type: String, required: true }],
    languages: [{ type: String, required: true }],
    directors:[{ type: String, required: true }],
    poster_url: [{ type: String, required: true }],
},
    {
        versionKey: false,
        timestamp: true,
    }
);

module.exports = model("movie", movieSchema);