require('dotenv').config();
const express = require("express");
const session = require("express-session");
const { passport } = require("./auth/passport-config");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(session({
    secret: "dattebayo!",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());



app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app is listening on port: ${PORT}`));