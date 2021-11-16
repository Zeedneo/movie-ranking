import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/navBar';
import Default from './components/pages/default/default';
import Home from './components/pages/home/home';
import Link from './components/pages/link/link';
import React , { useState } from 'react';


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
        <Route path="/" element={<Default searchKey={searchTerm}/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/link" element={<Link />} />
      </Routes>
    </div>
  );
}


export default App;
