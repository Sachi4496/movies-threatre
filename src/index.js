const express = require('express');

const userController = require('./controllers/user.controller')

// const {register ,login} = require("./controllers/auth")

const moviesController = require('./controllers/movies.controller')

const theaterController = require('./controllers/theater.controller')

const screenController = require('./controllers/screen.controller')

const showController = require('./controllers/show.controller')

const seatController = require('./controllers/seat.controller')

const app = express();

app.use(express.json());

app.use("/users", userController);
// const upload = require("./middlewares/upload")

// app.post("/user/register",upload.single("profile_pic"),  register)

// app.post("/user/login", login)

app.use("/movies", moviesController);

app.use("/theaters", theaterController);

app.use("/screens", screenController);

app.use("/shows", showController);

app.use("/seats", seatController);

module.exports = app;
