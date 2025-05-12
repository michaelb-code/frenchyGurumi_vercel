import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Créer un transporteur SMTP réutilisable
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === "true", // true pour 465, false pour les autres ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Envoie un email de confirmation de commande
 * @param {Object} options - Les options de l'email
 * @param {string} options.email - L'adresse email du destinataire
 * @param {string} options.nom - Le nom du destinataire
 * @param {string} options.prenom - Le prenom du destinataire
 * @param {string} options.commandeId - L'identifiant de la commande
 * @param {Array} options.articles - Les articles de la commande
 * @param {number} options.total - Le montant total de la commande
 * @returns {Promise} - Une promesse qui se résout lorsque l'email est envoyé
 */
export const envoyerEmailConfirmationCommande = async (options) => {
  const { email, nom, prenom, commandeId, articles, total } = options;

  // Générer le HTML pour les articles
  const articlesHTML = articles
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${
        item.title
      }</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${
        item.quantity
      }</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.price.toFixed(
        2
      )} €</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${(
        item.price * item.quantity
      ).toFixed(2)} €</td>
    </tr>
  `
    )
    .join("");

  // Envoyer l'email
  const info = await transporter.sendMail({
    from: `"Frenchy Gurumi" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Confirmation de votre commande #${commandeId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #f4887e;">Merci pour votre commande !</h1>
        </div>
        
        <p>Bonjour ${nom}${prenom},</p>
        
        <p>Nous vous confirmons que votre commande <strong>#${commandeId}</strong> a bien été enregistrée et est en cours de traitement.</p>
        
        <h2 style="margin-top: 30px; color: #333;">Récapitulatif de votre commande</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <thead>
            <tr style="background-color: #f4887e; color: white;">
              <th style="padding: 10px; text-align: left;">Article</th>
              <th style="padding: 10px; text-align: center;">Quantité</th>
              <th style="padding: 10px; text-align: right;">Prix unitaire</th>
              <th style="padding: 10px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${articlesHTML}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Total</td>
              <td style="padding: 10px; text-align: right; font-weight: bold;">${(
                total / 100
              ).toFixed(2)} €</td>
            </tr>
          </tfoot>
        </table>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
          <h3 style="margin-top: 0; color: #333;">Informations de livraison</h3>
          <p>Votre commande sera préparée avec soin et vous sera envoyée dans les plus brefs délais.</p>
          <p>Vous recevrez un email avec les informations de suivi dès que votre colis sera expédié.</p>
        </div>
        
        <div style="margin-top: 30px; text-align: center;">
          <p>Si vous avez des questions concernant votre commande, n'hésitez pas à nous contacter.</p>
          <p style="color: #f4887e;">L'équipe Frenchy Gurumi</p>
        </div>
      </div>
    `,
  });

  return info;
};

/**
 * Envoie un email de mise à jour du statut de la commande
 * @param {Object} options - Les options de l'email
 * @param {string} options.email - L'adresse email du destinataire
 * @param {string} options.nom - Le nom du destinataire
 * @param {string} options.commandeId - L'identifiant de la commande
 * @param {string} options.statut - Le nouveau statut de la commande
 * @param {string} options.trackingNumber - Le numéro de suivi (optionnel)
 * @returns {Promise} - Une promesse qui se résout lorsque l'email est envoyé
 */
export const envoyerEmailMiseAJourStatut = async (options) => {
  const { email, nom, commandeId, statut, trackingNumber } = options;

  let sujet = "";
  let contenu = "";

  switch (statut) {
    case "Expédiée":
      sujet = `Votre commande #${commandeId} a été expédiée`;
      contenu = `
        <p>Bonjour ${nom},</p>
        <p>Bonne nouvelle ! Votre commande <strong>#${commandeId}</strong> a été expédiée.</p>
        ${
          trackingNumber
            ? `<p>Vous pouvez suivre votre colis avec le numéro de suivi suivant : <strong>${trackingNumber}</strong></p>`
            : ""
        }
        <p>Nous vous remercions pour votre confiance et espérons que vous apprécierez nos produits.</p>
      `;
      break;
    case "Livrée":
      sujet = `Votre commande #${commandeId} a été livrée`;
      contenu = `
        <p>Bonjour ${nom},</p>
        <p>Votre commande <strong>#${commandeId}</strong> a été livrée.</p>
        <p>Nous espérons que vous êtes satisfait(e) de votre achat. N'hésitez pas à nous laisser un avis sur notre site !</p>
        <p>Nous vous remercions pour votre confiance.</p>
      `;
      break;
    default:
      sujet = `Mise à jour de votre commande #${commandeId}`;
      contenu = `
        <p>Bonjour ${nom},</p>
        <p>Le statut de votre commande <strong>#${commandeId}</strong> a été mis à jour : <strong>${statut}</strong>.</p>
        <p>Nous vous remercions pour votre patience et votre confiance.</p>
      `;
  }

  // Envoyer l'email
  const info = await transporter.sendMail({
    from: `"Frenchy Gurumi" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: sujet,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #f4887e;">Mise à jour de votre commande</h1>
        </div>
        
        ${contenu}
        
        <div style="margin-top: 30px; text-align: center;">
          <p>Si vous avez des questions concernant votre commande, n'hésitez pas à nous contacter.</p>
          <p style="color: #f4887e;">L'équipe Frenchy Gurumi</p>
        </div>
      </div>
    `,
  });

  return info;
};
