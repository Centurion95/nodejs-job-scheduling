//rc95 26/07/2022 19:44
// https://www.section.io/engineering-education/job-scheduling-in-nodejs/
// https://www.npmjs.com/package/node-cron
// npm install express node-cron nodemailer

const express = require('express')
const app = express()
const cron = require('node-cron')
const mailer = require('nodemailer')

const port = process.env.PORT || 3000

// Aqui todas las tareas programadas...
cron.schedule('* * * * *', () => {
    console.log('running a task every minute - ' + new Date())
    //20:21, 20:22, 20:23, 20:24, ...
})

cron.schedule('*/2 * * * *', () => {
    console.log('running a task every two minutes - ' + new Date())
    //20:22, 20:24, 20:26, 20:28, ...
})

cron.schedule('*/10 * * * *', () => {
    console.log('running a task every ten minutes - ' + new Date())
    //20:20, 20:30, 20:40, 20:50, ...
    //sendEmail('Hey there, this email was sent to you automatically every 10 minutes')
})

cron.schedule('0 */1 * * *', () => {
    console.log('running a task every ONE_HOUR - ' + new Date())
    //20:00, 21:00, 22:00, 23:00, ...
})

cron.schedule('0 11 * * *', () => {
    console.log('running task at 11:00 - ' + new Date())
    //11:00, 11:00, 11:00, 11:00, ...
})

cron.schedule('30 16 * * *', () => {
    console.log('running task at 16:30 - ' + new Date())
    //16:30, 16:30, 16:30, 16:30, ...
})

cron.schedule('15 20 * * *', () => {
    console.log('running task at 20:15 - ' + new Date())
    //20:15, 20:15, 20:15, 20:15, ...
})

cron.schedule('20 20 * * *', () => {
    console.log('running task at 20:20 - ' + new Date())
    //20:20, 20:20, 20:20, 20:20, ...
})

cron.schedule('0 1 * * *', () => {
    console.log('running task at 01:00 - ' + new Date())
    //01:00, 01:00, 01:00, 01:00, ...
})

//https://docs.aws.amazon.com/es_es/systems-manager/latest/userguide/reference-cron-and-rate-expressions.html
cron.schedule('0 18 * * monday-friday', () => {
    console.log('running task at 18:00, from monday to friday - ' + new Date())
    //lunes 18:00, martes 18:00, miercoles 18:00, jueves 18:00 y viernes 18:00
})

cron.schedule('0 13 * * sunday', () => {
    console.log('running task at 13:00 on sunday - ' + new Date())
    //domingo 13:00
})


//function that sends email
function sendEmail(message) {
    // Creating a transporter
    const transporter = mailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'your-username',
            pass: 'your-password'
        }
    })
    //sending the email
    transporter.sendMail(
        {
            from: '"Peter" <peter@kayere.com>',
            to: '"You there" <you@there.com>',
            subject: 'Scheduled Email',
            text: message
        })
        .then(_ => { console.log('Email has been sent') })
        .catch(error => { console.log(error) })
}



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/`)
})
