const API_BASE_URL = process.env.NODE_ENV === 'production' 
? `https://frenchy-gurumi-vercel-oauk.vercel.app`
: 'http://localhost:8000';


const URL = {
    
//ARTICLE
    GETALL_ARTICLES : `${API_BASE_URL}/api/article/get`,
    FETCH_ARTICLE : `${API_BASE_URL}/api/article/get`,
    CREATE_ARTICLE : `${API_BASE_URL}/api/article/create`,
    UPDATE_ARTICLE : `${API_BASE_URL}/api/article/update`,
    DELETE_ARTICLE : `${API_BASE_URL}/api/article/delete`,

//USER
    GET_ALL_USERS : `${API_BASE_URL}/api/user/get`,
    GET_USER_BY_ID : `${API_BASE_URL}/api/user/get`,
    CREATE_USER : `${API_BASE_URL}/api/user/signup`,
    SIGNIN : `${API_BASE_URL}/api/user/signin`,
    UPDATE_USER : `${API_BASE_URL}/api/user/update`,
    DELETE_USER : `${API_BASE_URL}/api/user/delete`,

//AVIS
    GET_ALL_AVIS : `${API_BASE_URL}/api/avis/get`,
    GET_AVIS_BY_ID : `${API_BASE_URL}/api/avis/get`,
    CREATE_AVIS : `${API_BASE_URL}/api/avis/create`,
    UPDATE_AVIS : `${API_BASE_URL}/api/avis/update`,
    DELETE_AVIS : `${API_BASE_URL}/api/avis/delete`,



//CATEGORIE
GET_ALL_CATEGORIES : `${API_BASE_URL}/api/categorie/get`,
GET_CATEGORIES_BY_ID : `${API_BASE_URL}/api/categorie/get`,
CREATE_CATEGORIE : `${API_BASE_URL}/api/categorie/create`,
UPDATE_CATEGORIE : `${API_BASE_URL}/api/categorie/update`,
DELETE_CATEGORIE : `${API_BASE_URL}/api/categorie/delete`,

// COMMANDE
GET_ALL_COMMANDES : `${API_BASE_URL}/api/commande/get`,
GET_COMMANDE_BY_ID : `${API_BASE_URL}/api/commande/get`,
CREATE_COMMANDE : `${API_BASE_URL}/api/commande/create`,
UPDATE_COMMANDE : `${API_BASE_URL}/api/commande/update`,
DELETE_COMMANDE : `${API_BASE_URL}/api/commande/delete`,

}

export default URL