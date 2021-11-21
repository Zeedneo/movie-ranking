import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/navBar';
import Default from './components/pages/default/default';
import Home from './components/pages/home/home';
import Link from './components/pages/link/link';
import Login from './components/pages/login/login';
import Register from './components/pages/register/register';
import Favorites from './components/pages/favorites/favorites';
import React, { useState } from 'react';


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [idFav, setIdFav] = useState("");

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const user = (Data) => {
    setName(Data);
    console.log(name,"name");
  }

  const Favorite = (ID) => {
    setIdFav(ID);
    console.log(idFav,"ID");
  }

  return (
    <div>
      <NavBar
        term={searchTerm}
        SearchKeyword={searchHandler}
      />
      <br />
      <br />
      <br />
      <Routes>
        <Route path="/:searchURLword" element={<Default key={searchTerm} searchKey={searchTerm} SearchKeyword={searchHandler} Username={name} Fav_id={Favorite}/>} />
        <Route path="/login" element={<Login user={user}/>} />
        <Route path="/favorites" element={<Favorites Username={name}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/" exact element={<Default key={searchTerm} searchKey={searchTerm} SearchKeyword={searchHandler} Username={name} Fav_id={Favorite}/>} />
        {/* <Route path="/home" element={<Home />} />
        <Route path="/link" element={<Link />} /> */}

      </Routes>
    </div>
  );
}


export default App;
