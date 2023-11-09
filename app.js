const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const userRoute = require('./routes/userRoutes');
const customerRoute = require('./routes/customerRoutes');
const productTypeRoute = require('./routes/productTypeRoutes');
const productBrandRoute = require('./routes/productBrandRoutes');
const productRoute = require('./routes/productRoutes');
const serviceRoute = require('./routes/serviceRoutes');

const app = express();

app.set('trust proxy', true);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/customer", customerRoute);
app.use("/api/product-type", productTypeRoute);
app.use("/api/product-brand", productBrandRoute);
app.use("/api/product", productRoute);
app.use("/api/service", serviceRoute);

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
