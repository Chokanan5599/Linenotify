/**
 * @author Pamontep Panya
 * @email pamontep.p@gmail.com
 * @create date 2018-06-03 03:45:02
 * @modify date 2018-06-03 03:45:02
 * @desc A sample project of Node.js and Line API
 */
const server = require("express");
const PORT = process.env.PORT || 9999;
const request = require("request");
const bodyParser = require("body-parser");

server()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .get("/", (req, res) =>
    res.send(
      `Hi there! This is a nodejs-line-api running on PORT  TEST: ${PORT}`
    )
  )
  .get("/webhook", function (req, res) {
    status.getStatusFromFile().then(function (rs) {
      if (typeof rs.result === "boolean" && rs.result === true) {
        res.json({
          result: true,
          status: 200,
          message: `Successful! Latest status is ${rs.data}`,
        });
      } else {
        res.json({
          result: false,
          status: 500,
          message: "Error! Internal Server Error",
        });
      }
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
