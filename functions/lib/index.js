"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.fcmSend = functions.firestore.document(`newsList/{newsid}`).onCreate(event => {
    const news = event.data();
    const payload = {
        notification: {
            title: news.title,
            body: news.shortdesc,
        }
    };
    admin.messaging().sendToTopic('news', payload).then((response) => {
        console.log('Successfully sent message:', response);
    }, (err) => {
        console.log('Error sending message:', err);
    });
});
//# sourceMappingURL=index.js.map