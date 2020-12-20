require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const stripeRoutes = require("./routes/stripePayment")
// const paypalRoute = require("./routes/paypalRoute")

// DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  }).catch(err => console.log("DB not connected"))

// const uri = "mongodb+srv://rcn:<password>.acs4v.mongodb.net/mern?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true});
// client.connect().then(()=>console.log("DB CONNECTED")).catch(err=>console.log("DB NOT CONNECTED"));


//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
app.use("/api",stripeRoutes)
// app.use("/api",paypalRoute)

//PORT

const port = process.env.PORT || 6000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

