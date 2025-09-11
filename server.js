require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const cors=require("cors")
app.use(cors())
// app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// billerCode
const statusRoutes = require('./billerRoutes/statusRoutes')
app.use('/api/bills', require('./billerRoutes/bills'));
app.use('/api/status', statusRoutes);  // Section 3 actions






const authRoutes = require('./routes/authRoutes');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));
app.use('/api/auth', authRoutes);

app.use('/api/admin', require('./routes/adminRoutes'));
app.get('/api/health', (req, res) => {
  res.status(200).send('OKkk running');
});

setInterval(async () => {
  try {
    await fetch("https://todoworkertasks-current.onrender.com/api/health");
    console.log("Pinged App todo");
  } catch (err) {
       console.error("Failed to ping App toDo:", err.message);
      const nodemailer = require('nodemailer');
      const transporterr = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD
    }
});
      async function sendSalesReportEmaill(subject, html) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject,
        html
    };

    await transporterr.sendMail(mailOptions);
}
async function archiveTodayBillsAndSendReportt() {
    try{

    await sendSalesReportEmaill({message:"didnt rang"}, "html");
    
    console.log('Cron job completed: Bills archived and email sent.');
        
    }catch(err){
        console.log(err)
    }
 
}
      archiveTodayBillsAndSendReportt()


}, 10 * 60 * 1000); // every 10 minutes


app.get('/', (req, res) => {
    res.redirect('/admin.html');
});

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Load Cron Job (automatically schedules itself)
// for replit
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));





//  function showToast(message) {
//         const toast = document.getElementById("toast");
//         toast.textContent = message;
//         toast.style.display = "block";
//         setTimeout(() => (toast.style.display = "none"), 3000);

//       }




