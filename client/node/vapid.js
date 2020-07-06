require('dotenv').config()
const webpush = require('web-push');
console.log(process.env.public)
console.log(process.env.private)
const vapidKeys = {
    publicKey: process.env.public,
    privateKey: process.env.private
};
  
webpush.setVapidDetails(
    'mailto:timothy.mickiewicz@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);