import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { EMAIL_PASS, EMAIL_USER } from "./env.config";
import { EventRegistration } from "../models/event-registration.model";
import moment from 'moment';
import path from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

const sendRegistrationEmail = async (registeredEvent: EventRegistration) => {
  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve("./src/utils"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/utils"),
  };

  transporter.use("compile", hbs(handlebarOptions));
  const mailOptions = {
    from: EMAIL_USER,
    to: registeredEvent.email,
    subject: "Registration Confirmed!",
    template: "event-registration-template",
    context: {
      name: registeredEvent.fullName,
      eventName: registeredEvent.eventName,
      eventDate: moment(registeredEvent.eventDateTime).format('dddd, MMMM Do YYYY, h:mm a'),
      eventLink: registeredEvent.eventLink,
    },
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
});
};

export default sendRegistrationEmail;
