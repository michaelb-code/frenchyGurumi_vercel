import { Routes, Route } from "react-router-dom";

// import pages
import "./App.css";
import Home from "./pages/Home/home"; 
import Detail from "./pages/Detail/detail";
import AddArticle from "./pages/Add/add";
import Update from "./pages/Update/update";
import RegisterUser from "./pages/Register/registerUser";
import Sign from "./pages/Sign/sign";
import Panier from "./pages/Panier/panier";
import UserProfil from "./pages/UserProfil/userProfil";
import UpdateProfil from "./pages/UpdateProfil/updateProfil";

// import components
import NavBar from "./components/NavBar/NaveBar";
import FormulaireContact from "./components/Formulaire/FormulaireContact";



function App() {
  return (
  
    <>
    
      <NavBar />
      
      <main className="container py-4"> 
        <Routes>
          <Route index element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/add" element={<AddArticle />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Sign />} />
          <Route path="/contact" element={<FormulaireContact />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/profil" element={<UserProfil />} />
          <Route path="/update-profil/:id" element={<UpdateProfil />} />
        </Routes>
      </main>
      
</>
  );
}

export default App;
