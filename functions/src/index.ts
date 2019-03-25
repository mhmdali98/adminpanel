import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
admin.initializeApp();

exports.fcmSend = functions.firestore.document(`newsList/{newsid}`).onCreate( event => {
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
    console.log( 'Error sending message:', err);
  });
});
