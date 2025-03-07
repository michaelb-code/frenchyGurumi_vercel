import {Routes, Route} from 'react-router-dom'

import './App.css';
import Home from './pages/home';
import Detail from './pages/detail';
import AddArticle from './pages/add';
import Update from './pages/update';
import RegisterUser from './pages/registerUser';
import Sign from './pages/sign';


function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/add" element={<AddArticle />} />
      <Route path="/update/:id" element={<Update />} />
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/login" element={<Sign />} />
    </Routes>
  );
}

export default App;
