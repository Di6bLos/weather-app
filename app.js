const express = require("express");
const app = express();
const config = require("dotenv").config();

const port = process.env.PORT;
const apiKey = process.env.API_KEY;

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})





app.listen(port, ()=>{
    console.log("listening on port " + port);
})