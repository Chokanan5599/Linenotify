/**
 * @author Pamontep Panya
 * @email pamontep.p@gmail.com
 * @create date 2018-06-03 03:45:02
 * @modify date 2018-06-03 03:45:02
 * @desc A sample project of Node.js and Line API
 */
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
  //   .post("/webhook", function (req, res) {
  //     let replyToken = req.body.events[0].replyToken;
  //     let msg = req.body.events[0].message.text;

  //     console.log(`Message token : ${replyToken}`);
  //     console.log(`Message from chat : ${msg}`);

  //     res.json({
  //       status: 200,
  //       message: `Webhook is working!`,
  //     });
  //   })
  .app.post("/webhook", function (req, res) {
    try {
      const validator = new hmacValidator();
      const notificationRequestItems = req.body.notificationRequestItems;
      console.log("notification Request");
      console.log(notificationRequestItems);

      notificationRequestItems.forEach((item) => {
        if (
          validator.hmacValidator(
            Item.notificationRequestItems,
            process.env.HMAC_KEY
          )
        ) {
          const eventCode = item.notificationRequestItems.eventCode;
          if (eventCode === "AUTHORISED") {
            if (item.notificationRequestItems.success === "true") {
            } else {
            }
          } else {
            console.log("Non-Valid NotificationRequestItems");
          }
        }
      });
      req.send("[accepted!]");
    } catch (error) {
      console.error(error);
    }
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`));
