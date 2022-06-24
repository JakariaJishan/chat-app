const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const { notFoundHandler, errorHandler } = require("./middlewares/common/errors");
const cookieParser = require("cookie-parser");
const logInRoute =  require("./routes/logInRoute")
const usersRoute =  require("./routes/usersRoute")
const inboxRoute =  require("./routes/inboxRoute")

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

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

//cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET))

//routing setup
app.use('/', logInRoute);
app.use('/users', usersRoute);
app.use('/inbox', inboxRoute);

//error handling
app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`app listening to port ${PORT}`)
})