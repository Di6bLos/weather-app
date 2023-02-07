const express = require("express");
const app = express();
const config = require("dotenv").config();
const https = require("node:https");

const port = process.env.PORT;
const apiKey = process.env.API_KEY;
const urlPrefix = process.env.URL_PREFIX;


app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res)=>{
    const cityName = req.body.cityInput;
   // const tempUnit = req.body.tempUnit;
    const apiUrl = urlPrefix + cityName + apiKey;
    
    https.get(apiUrl, (response)=>{
        console.log("statusCode:", response.statusCode);
        
        response.on("data", (data)=>{
            const weatherApp = JSON.parse(data);
            const currentTemp = weatherApp.main.temp;
            const lowTemp = weatherApp.main.temp_min;
            const highTemp = weatherApp.main.temp_max;
            const weatherDis = weatherApp.weather[0].description;
            const iconCode = weatherApp.weather[0].icon;
            const weatherIcon = `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png">`;

        });

       
    });
});



app.listen(port, ()=>{
    console.log("listening on port " + port);
});
