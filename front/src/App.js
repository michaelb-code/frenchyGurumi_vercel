import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/home"; 
import Detail from "./pages/Detail/detail";
import AddArticle from "./pages/Add/add";
import Update from "./pages/Update/update";
import RegisterUser from "./pages/Register/registerUser";
import Sign from "./pages/Sign/sign";
import FormulaireContact from "./components/Formulaire/FormulaireContact";
import Panier from "./pages/Panier/panier";

import NavBar from "./components/NavBar/NaveBar";




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
        </Routes>
      </main>
      
</>
  );
}

export default App;
