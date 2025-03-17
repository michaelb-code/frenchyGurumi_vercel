import React, { useState } from 'react';
import styles from './FormulaireContact.module.css';

function FormulaireContact() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    
    alert('Message envoyé avec succès!');
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      message: ''
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
                className={styles.formInput}
                required
              />
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
                className={styles.formInput}
                required
              />
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
                className={styles.formInput}
                required
              />
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
                className={styles.formTextarea}
                required
              />
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