const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ch-ecommerce-7519a.firebaseio.com",
});

const db = admin.firestore();

module.exports = db;
