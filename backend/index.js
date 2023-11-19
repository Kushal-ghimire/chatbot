const express = require("express");
require("dotenv/config");
const bodyParser = require("body-parser");
require("./db");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) =>{
    res.send("Welcome to ChatBot API");
})

// import routes
const userRoutes = require("./routes/userRoute");
app.use(userRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, function (err, done) {
    if (err) {
      console.log("Server launch failed");
      return;
    }
    console.log("Server listening at port", PORT);
});