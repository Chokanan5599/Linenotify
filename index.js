/**
 * @author Pamontep Panya
 * @email pamontep.p@gmail.com
 * @create date 2018-06-03 03:45:02
 * @modify date 2018-06-03 03:45:02
 * @desc A sample project of Node.js and Line API
 */
const server = require("express");
const express = server();
const PORT = process.env.PORT || 9999;
const request = require("request");
const bodyParser = require("body-parser");
express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .get("/", (req, res) =>
    res.send(`Hi there! This is a nodejs-line-api running on PORT: ${PORT}`)
  )
  // เพิ่มส่วนของ Webhook เข้าไป
  .post("/webhook", function (req, res) {
    res.send({
      status: 200,
      message: `Webhook is working!`,
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
