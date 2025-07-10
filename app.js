require('dotenv').config();
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma/client");
const { passport } = require("./auth/passport-config");
const gatesRouter = require("./routes/gatesRouter");
const groupRouter = require('./routes/groupRouter');
const friendRouter = require("./routes/friendRouter");
const profileRouter = require("./routes/profileRouter");


const app = express();
app.use(cors({
    origin: process.env.ALLOWED_DOMAIN,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(session({
    cookie: { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined,
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    secret: "dattebayo!",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/", gatesRouter);
app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/friends", friendRouter);
app.use("/api/v1/profiles", profileRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app is listening on port: ${PORT}`));