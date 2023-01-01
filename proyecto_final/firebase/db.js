const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://proyecto-final-cc1a6.firebaseapp.com",
});

const db = admin.firestore();

module.exports = db;
