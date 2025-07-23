//imports 
// const express = require('express')
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

// DOT ENV config
dotenv.config();

//rest object
const app = express()

//routes
app.get('/',(req, res)=>{
    res.send("<h1>Welcome to JOB PORTAL</h1>")
})
//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, ()=>{
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode On Port No ${PORT}`.bgCyan.white)
})