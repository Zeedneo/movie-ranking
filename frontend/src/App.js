import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/navBar';
import Default from './components/pages/default/default';
import Home from './components/pages/home/home';
import Link from './components/pages/link/link';
import Login from './components/pages/login/login';
import Register from './components/pages/register/register';
import React, { useState } from 'react';


function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

 

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
        <Route path="/:searchURLword" element={<Default key={searchTerm} searchKey={searchTerm} SearchKeyword={searchHandler} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/link" element={<Link />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" exact element={<Default key={searchTerm} searchKey={searchTerm} SearchKeyword={searchHandler} />} />

      </Routes>
    </div>
  );
}


export default App;
