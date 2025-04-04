import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
    console.log("Requête reçue:", req.body);
    
    const { nom, prenom, email, message } = req.body;
    
    if (!nom || !prenom || !email || !message) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
    
    try {
    console.log("Envoi de l'email avec:", {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD ? 'Défini' : 'Non défini'
    });
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Configuration de l'email
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Nouveau message de ${prenom} ${nom}`,
      text: `
        Nom: ${nom}
        Prénom: ${prenom}
        Email: ${email}
        Message: ${message}
      `
    };console.log("MailOptions:", mailOptions);
    

    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Message envoyé avec succès' });

  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    res.status(500).json({ message: "Erreur lors de l'envoi du message" });
  }
});

export default router;