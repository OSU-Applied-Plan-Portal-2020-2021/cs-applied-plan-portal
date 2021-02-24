// File: email.js
// Description: data functions that handle email notifications
const userModel = require("./user");
var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // testing on mailtrap
    //host: "smtp.mailtrap.io",
    port: 465,
    auth: {
        //using personal credentials for testing purposes right now
        user: 'escotom@oregonstate.edu',
        pass: 'Thegreenduke!!'
        // test credentials for mailtrap
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

// create Email based on text from createNotification
async function createEmail(text, userId){

    const user = await userModel.getUserById(userId);

    var formatMail = {
        from: 'escotom@oregonstate.edu',
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