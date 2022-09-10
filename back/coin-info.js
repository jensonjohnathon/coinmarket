const axios = require("axios");
const filesystem = require("fs");
require("dotenv").config();

const options = {
  method: "GET",
  url: "https://coingecko.p.rapidapi.com/coins/markets",
  params: {
    vs_currency: "usd",
    page: "1",
    per_page: "100",
    order: "market_cap_desc",
  },
  headers: {
    "X-RapidAPI-Key": process.env.API_KEY,
    "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
  },
};

setInterval(updateData, 5000);

function updateData() {
  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      filesystem.writeFile(
        "../front/src/response.json",
        JSON.stringify(response.data),
        function (err) {
          console.log(err);
        }
      );
    })
    .catch(function (error) {
      console.error(error);
    });
}
