/**
 * @author Pamontep Panya
 * @email pamontep.p@gmail.com
 * @create date 2018-06-03 08:55:40
 * @modify date 2018-06-03 08:55:40
 * @desc A service for Get/Post data from Firebase Realtime Database.
 */
const firebase = require("firebase-admin");
const serviceAccount = require("../../linenotify-35853-firebase-adminsdk-kmouk-d0637543cc.json");
var db, ref;

class FirebaseService {
  constructor() {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL:
        "https://linenotify-35853-default-rtdb.asia-southeast1.firebasedatabase.app/",
    });

    db = firebase.database();

    ref = db.ref("hogwarts");
  }

  getHogwartHouses() {
    return new Promise(function (resolve, reject) {
      try {
        return ref.once("value", function (snapshot) {
          let _hogwarts = snapshot.val();

          return resolve(JSON.stringify(_hogwarts));
        });
      } catch (e) {
        return reject(e);
      }
    });
  }
}
module.exports = new FirebaseService();
