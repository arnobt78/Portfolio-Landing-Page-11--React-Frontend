import "dotenv/config";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const router = express.Router();

// Express app: used to send contact form emails via Gmail (Nodemailer).
const app = express();
app.use(cors()); // Allow frontend (e.g. localhost:5173) to call this API.
app.use(express.json()); // Parse JSON request bodies.
app.use("/", router);

const PORT = process.env.PORT || 5000;
const EMAIL_USER = process.env.EMAIL_USER; // Gmail address; use App Password in EMAIL_PASS.
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER; // Where contact submissions are sent.

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

// Nodemailer transport: Gmail SMTP. Requires EMAIL_USER and EMAIL_PASS in .env.
const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Optional: verify SMTP connection on startup (logs error or "Ready to Send").
contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

// POST /contact — receives JSON from frontend contact form and sends one email.
router.post("/contact", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: EMAIL_TO,
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  // Send email; respond with error object or success payload (frontend checks result.code === 200).
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});
