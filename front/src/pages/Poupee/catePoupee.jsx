import React from 'react'
import Slider from '../../components/Slider/Slider'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './CatePoupee.module.css' // Assurez-vous de créer ce fichier CSS module

const CatePoupee = () => {
  // Récupérer les articles du store Redux
  const store = useSelector((state) => state.article.data)
  const loading = useSelector((state) => state.article.loading)

  // je filtre uniquement les articles de catégorie poupee
  const poupeeArticles = Array.isArray(store)
    ? store.filter(article => article.categorie === 'Poupée')
    : []

  if (loading) return <div className={styles.loading}>Chargement...</div>

  return (
    <>
      <Slider />
      <div className={styles.headerContainer}>
        <h1>Poupée</h1>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.blockTitre}>
          <h3 className={styles.h3}>Poupée...</h3>
          <div className={styles.blockIcon}>
            <img style={{ width: '30px', height: '30px' }} src="/photoIcon/logoId.png" alt="" />
          </div>
        </div>
      </div>

      {/* Affichage des articles poupee */}
      <div className="container py-4">
        {poupeeArticles.length > 0 ? poupeeArticles.map((article) => (
          <div key={article._id} className="row mb-5 position-relative">
            <hr className={styles.separateur} />
            <div className="col-md-5">
              <div className={styles.productImgContainer}>
                {article.photo && article.photo.length > 0 ? (
                  <img src={article.photo[0]} className={styles.productImg} alt={article.nom || 'Image poupée'} />
                ) : (
                  <div className="text-center p-3">Pas d'image disponible</div>
                )}
              </div>
            </div>
            <div className="col-md-7">
              <div className={styles.productDetails}>
                <Link to={`/detail/${article._id}`}><h2 className={styles.productTitle}>{article.nom}</h2></Link>
                <div className={styles.productDescription}>
                  <p>"{article.description}"</p>
                </div>
                <div className={styles.productPriceContainer}>
                  <div className={styles.productPrice}>
                    {article.prix},00€
                  </div>
                  <div className={styles.productAction}>
                    <Link to={`/detail/${article._id}`}>
                      <button className={styles.btn}>En Savoir +</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : <p>Aucun article poupée trouvé</p>}
      </div>
    </>
  )
}

export default CatePoupee