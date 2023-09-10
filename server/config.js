const firebase = require("firebase");
var admin = require("firebase-admin");
const serviceAccount = require("./authentication-2c701-firebase-adminsdk-tomdt-016c8bbb26.json"); // Replace with the path to your service account key JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://authentication-2c701-default-rtdb.firebaseio.com/", // Replace with your Firebase project's database URL
});
const firebaseConfig = {
  apiKey: "AIzaSyDgUGp5FIGmZdP37xie31eTbKgQSuuWduQ",
  authDomain: "authentication-2c701.firebaseapp.com",
  databaseURL: "https://authentication-2c701-default-rtdb.firebaseio.com",
  projectId: "authentication-2c701",
  storageBucket: "authentication-2c701.appspot.com",
  messagingSenderId: "229995530695",
  appId: "1:229995530695:web:469668f3b1b4a3256ef1e2",
  measurementId: "G-T71LP3GJ85",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
const UpdatedUser = db.collection("UpdatedUsers");
const Userdata = db.collection("UserData");
module.exports = { User };
