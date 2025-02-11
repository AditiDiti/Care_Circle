const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/conn");
const userRouter = require("./routes/userRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const appointRouter = require("./routes/appointRoutes");
const path = require("path");
const notificationRouter = require("./routes/notificationRouter");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());


app.use(
  cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE","PATCH","OPTIONS"],
    credentials: true
  })
);
app.options('*', cors())

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Hello endpoint
app.get('/api/v1/hello', (req, res) => {
    res.status(200).json({
      success: true,
      message: "Hello, the backend is working!",
    });
  });

  
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);
app.use('/api/doctors', doctorRouter);



app.listen(port, () => {});
