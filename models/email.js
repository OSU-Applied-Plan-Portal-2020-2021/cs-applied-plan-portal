// File: email.js
// Description: data functions that handle email notifications

const {pool} = require("../services/db/mysqlPool");
const {planNotification, getNotifications} = require("../models/notification");

const userModel = require("./user");

var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    //host: "smtp.mailtrap.io",
    port: 465,
    auth: {
        user: 'escotom@oregonstate.edu',
        pass: 'Thegreenduke!!'
        //user: "6d39b1a8e327a0",
        //pass: "059f357f9427a4"
    }
});

/*
var formatMail = {
    from: '"OSUAPP" <noreply@oregonstate.edu>',
    to: 'testuser@oregonstate.edu',
    Subject: "New OSU Applied Plan Notification",
    text: "Test notification!",
    html: "stuffff"
};
*/

/*
// get the the text for the email from the notification id
// using userID and notificationId
async function getEmailText(text){

    try {

        

    } catch (err) {
        console.log("Error getting email text");
        throw Error(err);
    }
}
exports.getEmailText = getEmailText;
*/

// create Email based on based on text from createNotification
async function createEmail(text, userId){

    const user = await userModel.getUserById(userId);

    var formatMail = {
        from: 'escotom@oregonstate.edu',
        //from: '"OSUAPP" <noreply@oregonstate.edu>',
        //to: 'escotom@oregonstate.edu',
        //to: `${userId}` + '@oregonstate.edu',
        to: `${user.email}`,
        subject: "New OSU Applied Plan Notification",
        text: `${text}`,
        html: `<h1>${text}</h1>`
    };

    transport.sendMail(formatMail, (err, info) => {
        if(err) {
            return console.log(err);
        }
        console.log('message sent: %s', user.email);
    })
}
exports.createEmail = createEmail;