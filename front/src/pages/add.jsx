import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import URL from '../constant/api';


const AddArticle = () => {

    const imgInput = ['img', 'img1', 'img2', 'img3', 'img4'];

    // state avec un objet article vide 
    const [article, setArticle] = useState({
        marque: '',
        nom: '',
        categorie: '',
        description: '',
        prix: '',
        photo: {
            img: '',
            img1: '',
            img2: '',
            img3: '',
            img4: '',
        },
        status: '',
        stock: ''

    });

    const handleChange = (e) => {

        const { name, value, files } = e.target;
        if (name.startsWith('img')) {

            setArticle(prev => ({ ...prev, 

                photo: files ? { ...prev.photo, [name]: value } : { ...prev.photo, [name]: '' } }))
            
        } else {

            setArticle(prev => ({ ...prev, [name]: value }))
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("Marque", article.marque)
        formData.append("Nom", article.nom)
        formData.append("Categorie", article.categorie)

        formData.append("Description", article.description)
        formData.append("Prix", parseInt(article.prix))
        formData.append("Stock", parseInt(article.stock))
        formData.append("Status", article.status)

        article.photo.img.foreach((image) => {
            formData.append("Photo", image)
        });

        try {
            const response = await fetch(URL.CREATE_ARTICLE, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de l'ajout de l'article : ${response.status}`);
            }

            const data = await response.json();
            console.log("Article ajouté", data);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-mb-8 col-lg-6">
                    <form onSubmit={handleSubmit} className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Ajouter un article</h2>

                            <div className="mb-3">
                                <input type="text" name="marque" onChange={handleChange}
                                    placeholder="Marque de l'article"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <input type="text" name="nom" onChange={handleChange}
                                    placeholder="Nom de l'article"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <input type="text" name="description" onChange={handleChange}
                                    placeholder="Description de l'article"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <input type="text" name="categorie" onChange={handleChange}
                                    placeholder="Categorie de l'article"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input type="number" name="prix" onChange={handleChange}
                                    placeholder="Prix de l'article"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                {imgInput.map((imgName, index) => (
                                    <div key={imgName} className="mb-3">
                                        <label className="form-label text-muted small">
                                            {index === 0 ? "Image principale(URL)" : `Image ${index}(URL)`}
                                        </label>
                                        <input type="file" name={imgName} onChange={handleChange} placeholder={`Image ${imgName.slice(-1)}`} className="form-control" />
                                    </div>
                                ))}
                            </div>

                            <div className="mb-4">
                                <input type="number" name="stock" onChange={handleChange}
                                    placeholder="Stock"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input type="checkbox" name="status" onChange={e => setArticle(prev => ({ ...prev, status: e.target.checked }))} checked={article.status}
                                />
                            </div>

                            <button onClick={handleSubmit} type="submit" className="btn btn-primary w-100">Ajouter l'article</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddArticle;