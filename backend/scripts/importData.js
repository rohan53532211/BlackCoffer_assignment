require('dotenv').config();
const insight = require('../models/data');
const data = require('../jsondata.json');
const connectDB = require('../config/db');

const importData = async () => {
    try{
        await connectDB();
        console.log("Connected Successfully");
        await insight.deleteMany({});
        console.log("Old data COllection");

        await insight.insertMany(data);
        console.log ("Data imported Successfully");

        process.exit(0);
    } catch (error){
        console.error(error);
        process.exit(1);
    }
};

importData();