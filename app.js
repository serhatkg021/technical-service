const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const userRoute = require('./routes/userRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use("/api/user", userRoute);

app.use(express.static(path.join(__dirname, "./client/build/")));

app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

module.exports = app;
