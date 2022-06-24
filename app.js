const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");


const app = express();
dotenv.config();

//database connection
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.error(err));

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set('view engine', 'ejs');

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//routing setup

//error handling

app.listen(process.env.PORT, () => {
    console.log(`app listening to port ${process.env.PORT}`)
})