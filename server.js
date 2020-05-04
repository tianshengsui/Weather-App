require("dotenv").config();

const API_KEY = process.env.WEATHER_API_KEY;
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/weather", (req, res) => {
  const lat = req.body.latitude;
  const lon = req.body.longitude;
  const url = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&key=${API_KEY}`;
  axios({
    url: url,
    responseType: "json",
  }).then((data) => {
    res.json(data.data.data[0]);
    // res.json(data.data[0]);
  });
});
port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
