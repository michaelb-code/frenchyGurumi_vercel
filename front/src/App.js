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
import CatePoupee from "./pages/Poupee/catePoupee";
import Creation from "./pages/Creations/creation";
import PremiersSouvenirs from "./pages/PremiersSouvenirs/PremiersSouvenirs";
import Anigurumi from "./pages/Anigurumi/anigurumi";
import Dashboard from "./pages/Dashboard/dashboard";

// import components
import NavBar from "./components/NavBar/NaveBar";
import FormulaireContact from "./components/Formulaire/FormulaireContact";
import BestSeller from "./components/BestSeller/bestSeller";
import { CartProvider } from "./context/CartContext";
import QuiSommesNous from "./components/aPropos/QuiSommesNous";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/ProtectedRoute/AdminRoute";

function App() {
  return (
    <>
    <CartProvider>
      <NavBar />
      <main className="container py-4"> 
        <Routes>
          {/* Routes publiques */}
          <Route index element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Sign />} />
          <Route path="/contact" element={<FormulaireContact />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/poupees" element={<CatePoupee />} />
          <Route path="/creations" element={<Creation />} />
          <Route path="/premiers_souvenirs" element={<PremiersSouvenirs />} />
          <Route path="/anigurumi" element={<Anigurumi />} />
          <Route path="/best-sellers" element={<BestSeller />} />
          <Route path="/a-propos" element={<QuiSommesNous />} />
          
          {/* Routes protégées pour utilisateurs connectés */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profil" element={<UserProfil />} />
            <Route path="/update-profil/:id" element={<UpdateProfil />} />
          </Route>
          
          {/* Routes protégées pour administrateurs uniquement */}
          <Route element={<AdminRoute />}>
            <Route path="/add" element={<AddArticle />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
      </CartProvider>
    </>
  );
}

export default App;