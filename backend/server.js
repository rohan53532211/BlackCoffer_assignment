const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require("./config/db");
const dataRoutes = require("./routers/dataRoutes");
const chartRoutes = require("./routers/chartRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", dataRoutes);
app.use("/api/charts", chartRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
