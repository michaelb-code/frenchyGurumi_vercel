export const RGXR = {
  // UTILISATEUR
  NOM: /^[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$/,
  PRENOM:
    /^(?=[a-zA-ZàèéùÀÈÉÙ'-\s]*[a-zA-ZàèéùÀÈÉÙ]{2})[a-zA-ZàèéùÀÈÉÙ'-\s]{2,30}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD:
    /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[,;.?!\*\(\)]))[\w\d,;.?!\*\(\)]{8,40}$/,
  TELEPHONE: /^\d{10}$/,
  ADRESSE: /^[a-zA-Z0-9\s\-'^¨èéàù]{8,70}$/,
  CODE_POSTAL: /^\d{5}$/,
  VILLE: /^[a-zA-Z\s\-'^¨èéàù]{2,50}$/,
  CONTENT: /^[a-zA-Z0-9\s,?!()."'éèêàùîôäëïöü -]+$/,

  // ARTICLE
  MARQUE: /^[a-zA-Z0-9\s\-'à-ÿ]{2,50}$/,
  CATEGORIE: /^[a-zA-Z\s\-'à-ÿ]{2,50}$/,
  DESCRIPTION: /^[a-zA-Z0-9\s\-'",.;:!?()à-ÿ]{10,1000}$/,
  PRIX: /^\d+(\.\d{1,2})?$/,
  STOCK: /^\d+$/,
  IMAGE: /^https:\/\/.+$/,

  // COMMANDE
  QUANTITE: /^[1-9]\d*$/,
  STATUT: /^(en attente|traitement|livraison|termine)$/,
  MODE_PAIEMENT: /^(card)$/,
}

// Fonction utilitaire pour valider un champ avec une regex
export const validateField = (value, regex, fieldName) => {
    if (!regex.test(value)) {
      return { isValid: false, message: `Le champ ${fieldName} n'est pas valide` };
    }
    return { isValid: true };
  };

 
