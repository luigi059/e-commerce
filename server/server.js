require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileUpload");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const imageRouter = require("./routes/uploadRouter");
const productRouter = require("./routes/productRouter");
const paymentRouter = require("./routes/paymentRouter");

const app = express();

// Connect to MongoDB   
const DB = process.env.DATABASE;
mongoose.connect(DB,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true 
})
.then(()=> console.log("DB connection successful"));

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles:true
}));

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/user",userRouter);
app.use("/api",categoryRouter);
app.use("/api",imageRouter);
app.use("/api",productRouter);
app.use("/api",paymentRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));