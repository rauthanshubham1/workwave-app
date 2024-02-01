const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" })

require("./db/conn");
const corsOptions = {
    origin: process.env.FRONTEND,
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;

app.use(require("./router/routes"));

app.listen(PORT, () => {
    console.log("Running on port", PORT)
})