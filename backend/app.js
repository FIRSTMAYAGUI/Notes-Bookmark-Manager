import 'dotenv/config.js';
import express from "express";
import { getPgVersion } from "./config/db.js";

const app = express();

const APP_PORT = process.env.APP_PORT || 5000;

app.listen(APP_PORT, ()=>{
    console.log(getPgVersion());
    console.log("Server running at http://localhost:" + APP_PORT);
});