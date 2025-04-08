import React from 'react';
import styles from './QuiSommesNous.module.css';

const QuiSommesNous = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h3 className={styles.welcome}>Bienvenue mes FRENCHYZ.</h3>
                    
                    <div className={styles.imageTextBlock}>
                        <div className={styles.imageWrapper}>
                            <img style={{ width: '200px', height: '300px' }} src="/photosSlide/photoSlide7.jpg" alt="Mains qui crochetent" className={styles.image} />
                        </div>
                        <div className={styles.textContent}>
                            <p className={styles.paragraph}>
                                Passionnée par l'art du crochet, et je crois des pièces uniques alliant douceur, qualité et savoir-faire.
                            </p>
                            <p className={styles.paragraph}>
                                Chaque création, qu'il s'agisse de poupees, de jouets ou d'accessoires, est réalisé à la main avec une attention particulière portée aux détails.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.textContent}>
                        <p className={styles.paragraph}>
                            Je choisis avec soin des matières premières de haute qualité : des laines douces, des fils résistants et un rembourrage hypoallergénique pour garantir à la fois confort, sécurité et durabilité.
                        </p>
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.imageTextBlock}>
                        <div className={styles.textContent}>
                            <p className={styles.paragraph}>
                                Mon objectif est de vous offrir des objets faits pour durer, empreints de tendresse et de caractère, qui accompagneront les moments précieux de votre quotidien.
                            </p>
                        </div>
                        <div className={styles.imageWrapper}>
                            <img src="/photosSlide/photoSlide5.jpg" alt="Pelotes de laine" className={styles.image} />
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.textContent}>
                        <p className={styles.paragraph}>
                            En choisissant mes créations, vous soutenez <span className={styles.highlight}>un artisanat authentique</span> et une production respectueuse de l'environnement.
                        </p>
                        <p className={styles.paragraph}>
                            Merci de faire partie de cette aventure, et j'espère que mes créations apporteront joie et confort à vous et à vos proches.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuiSommesNous;