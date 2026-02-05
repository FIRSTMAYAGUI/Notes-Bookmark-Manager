import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const APP_PORT = process.env.APP_PORT || 5000;

app.listen(APP_PORT, ()=>{
    console.log("Server running at http://localhost:" + APP_PORT);
});