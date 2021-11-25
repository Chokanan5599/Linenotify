/**
 * @author Pamontep Panya
 * @email pamontep.p@gmail.com
 * @create date 2018-06-03 03:45:02
 * @modify date 2018-06-03 03:45:02
 * @desc A sample project of Node.js and Line API
 */
// const API_KEY = "YOUR_API_KEY_HERE";
// module.exports = API_KEY;
// const express = require("express");
// const bodyParser = require("body-parser");
// const https = require("https");
// const API_KEY = require("./apiKey");

// const server = express();
// server.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// server.use(bodyParser.json());

// server.post("/webhook", (req, res) => {
//   const movieToSearch =
//     req.body.result &&
//     req.body.result.parameters &&
//     req.body.result.parameters.movie
//       ? req.body.result.parameters.movie
//       : "The Godfather";
//   const reqUrl = encodeURI(
//     `https://nodenotify-1.herokuapp.com/?t=${movieToSearch}&apikey=${API_KEY}`
//   );
//   https.get(
//     reqUrl,
//     (responseFromAPI) => {
//       let completeResponse = "";
//       responseFromAPI.on("data", (chunk) => {
//         completeResponse += chunk;
//       });
//       responseFromAPI.on("end", () => {
//         const movie = JSON.parse(completeResponse);
//         let dataToSend =
//           movieToSearch === "The Godfather"
//             ? `I don't have the required info on that. Here's some info on 'The Godfather' instead.\n`
//             : "";
//         dataToSend += `${movie.Title} is a ${movie.Actors} starer ${movie.Genre} movie, released in ${movie.Year}. It was directed by ${movie.Director}`;

//         return res.json({
//           speech: dataToSend,
//           displayText: dataToSend,
//           source: "webhook",
//         });
//       });
//     },
//     (error) => {
//       return res.json({
//         speech: "Something went wrong!",
//         displayText: "Something went wrong!",
//         source: "get-movie-details",
//       });
//     }
//   );
// });

const expreess = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const server = require("express");
const PORT = process.env.PORT || 9999;
const request = require("request");
const bodyParser = require("body-parser");
const { Client, Config, hmacValidator } = require("@adyen/api-library");
const { post } = require("request");
// const functions = require("firebase-functions");

// exports.Webhook = functions.https.onRequest((res, res) => {
//   res.status(200).send("OK");
// });

server()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .get("/", (req, res) =>
    res.send(`Hi there! This is a nodejs-line-api running on PORT: ${PORT}`)
  )
  // เพิ่มส่วนของ Webhook เข้าไป
  .post("/webhook", function (req, res) {
    let replyToken = req.body.events[0].replyToken;
    let msg = req.body.events[0].message.text;

    console.log(`Message token : ${replyToken}`);
    console.log(`Message from chat : ${msg}`);

    res.json({
      status: 200,
      message: `Webhook is working!`,
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
