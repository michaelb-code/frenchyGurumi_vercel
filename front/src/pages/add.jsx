import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const AddArticle = () => {

    const imgInput = ['img', 'img1', 'img2', 'img3', 'img4'];

    const [article, setArticle] = useState({
        nom: '',
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

        const { name, value } = e.target;
        if (name.startsWith('img')) {
            setArticle(prev => ({ ...prev, photo: { ...prev.photo, [name]: value } }))
            // console.log(article);
        } else {

            setArticle(prev => ({ ...prev, [name]: value }))
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/article/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(article)
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
            <div className="row justyfy-content-center">
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
                                <input type="text" name="marque" onChange={handleChange}
                                    placeholder="Marque de l'article"
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
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                {imgInput.map((imgName, index) => (
                                    <div key={imgName} className="mb-3">
                                        <label className="form-label text-muted small">
                                            {index === 0 ? "Image principale(URL)" : `Image ${index}(URL)`}
                                        </label>
                                        <input type="text" name={imgName} onChange={handleChange} placeholder={`Image ${imgName.slice(-1)}`} className="form-control" />
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

                            <button type="submit" className="btn btn-primary w-100">Ajouter l'article</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddArticle;