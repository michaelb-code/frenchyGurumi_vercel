export const RGXR = {
  // UTILISATEUR
  nom: /^[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$/,
  prenom:
    /^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  motDePasse:
    /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[,;.?!*\(\)]))[\w\d,;.?!*\(\)]{8,40}$/,
  telephone: /^\d{10}$/,
  adresse: /^[a-zA-Z0-9\s\-'^¨èéàù]{8,70}$/,
  code_postal: /^\d{5}$/,
  ville: /^[a-zA-Z\s\-'^¨èéàù]{2,50}$/,
  message: /^[a-zA-Z0-9\s,?!()."'éèêàùîôäëïöü -]+$/,

  // ARTICLE
  nom_article: /^[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$/,
  marque: /^[a-zA-Z0-9\s\-'à-ÿ]{2,50}$/,
  categorie: /^[a-zA-Z\s\-'à-ÿ]{2,50}$/,
  description: /^[a-zA-Z0-9\s\-'",.;:!?()à-ÿ]{10,1000}$/,
  prix: /^\d+(\.\d{1,2})?$/,
  stock: /^\d+$/,
  photo: /^https:\/\/.+$/,

  // COMMANDE
  quantite: /^[1-9]\d*$/,
  statut: /^(en attente|traitement|livraison|termine|annule)$/,
  mode_paiement: /^(card)$/,
};

// Fonction utilitaire pour valider un champ avec une regex
export const validateField = (value, regex, fieldName) => {
  if (!regex.test(value)) {
    return {
      isValid: false,
      message: `Le champ ${fieldName} n'est pas valide`,
    };
  }
  return { isValid: true };
};
