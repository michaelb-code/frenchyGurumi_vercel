import React, { useState } from 'react';
import styles from './FormulaireContact.module.css';
import { RGXR, validateField } from '../../Utils/regexx';
import { ToastContainer, toast } from 'react-toastify';


function FormulaireContact() {
  const notify = () => toast.success('Message envoyé avec succès!', { autoClose: 2500, position: "top-center" });
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    nom: { isValid: true, message: '' },
    prenom: { isValid: true, message: '' },
    email: { isValid: true, message: '' },
    message: { isValid: true, message: '' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = RGXR[name];
    
    if (regex) {
      const result = validateField(value, regex, name);
      setFormErrors(prev => ({ ...prev, [name]: result }));
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Vérifier si les champs sont vides
    const emptyFields = Object.entries(formData).filter(([key, value]) => !value.trim());
    if (emptyFields.length > 0) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    // Vérifier si tous les champs sont valides
    const isFormValid = Object.values(formErrors).every(field => field.isValid);
    
    if (!isFormValid) {
      toast.error('Veuillez corriger les erreurs dans le formulaire.', { autoClose: 2500, position: "top-center" });
      return;
    }
    
    console.log('Formulaire soumis:', formData);
    notify();
    
    // Réinitialiser le formulaire
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      message: ''
    });
    
    // Réinitialiser les erreurs
    setFormErrors({
      nom: { isValid: true, message: '' },
      prenom: { isValid: true, message: '' },
      email: { isValid: true, message: '' },
      message: { isValid: true, message: '' }
    });
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactCard}>
        <div className={styles.imageContainer}>
          <img src="/photosSlide/photoSlide2.jpg" alt="Matériel de tricot" />
        </div>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Contactez Nous...</h2>
          <p className={styles.formSubtitle}>À l'écoute pour vous offrir un service de qualité</p>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="nom">
                Nom<span>*</span>:
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom..."
                className={`${styles.formInput} ${!formErrors.nom.isValid && formData.nom ? styles.inputError : ''}`}
                required
              />
              {!formErrors.nom.isValid && formData.nom && (
                <div className={styles.errorText}>{formErrors.nom.message}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="prenom">
                Prénom<span>*</span>:
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Prénom..."
                className={`${styles.formInput} ${!formErrors.prenom.isValid && formData.prenom ? styles.inputError : ''}`}
                required
              />
              {!formErrors.prenom.isValid && formData.prenom && (
                <div className={styles.errorText}>{formErrors.prenom.message}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="email">
                Email<span>*</span>:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email..."
                className={`${styles.formInput} ${!formErrors.email.isValid && formData.email ? styles.inputError : ''}`}
                required
              />
              {!formErrors.email.isValid && formData.email && (
                <div className={styles.errorText}>{formErrors.email.message}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="message">
                Message<span>*</span>:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message..."
                className={`${styles.formTextarea} ${!formErrors.message.isValid && formData.message ? styles.inputError : ''}`}
                required
              />
              {!formErrors.message.isValid && formData.message && (
                <div className={styles.errorText}>{formErrors.message.message}</div>
              )}
            </div>

            <p className={styles.formNote}>*Champs Obligatoires</p>

            <button type="submit" className={styles.submitButton}>
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormulaireContact;