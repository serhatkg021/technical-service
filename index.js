const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require("./config/database/connect");

dotenv.config();

const port = process.env.PORT || 3001;
const uri = process.env.URI;

const start = () => {
    try {
        app.listen(port, () => {
            connectDB(uri);
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();