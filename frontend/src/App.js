import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/navBar';
import Default from './components/pages/default/default';
import Login from './components/pages/login/login';
import Register from './components/pages/register/register';
import Favorites from './components/pages/favorites/favorites';
import Pagination from './components/pagination/pagination';
import React, { useState } from 'react';



function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeMovie, setTypeMovie] = useState("");
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [disable, setDisable] = useState(0);


  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const type = (Data) => {
    setTypeMovie(Data);
    // console.log(typeMovie, "typeMovie");
  }

  const user = (Data) => {
    setName(Data);
    // console.log(name, "name");
  }

  const total_pages = (Data) => {
    setTotalPages(Data);
    // console.log(Data, "totalpages");
    if (Data <= 1) {
      // console.log('น้อยกว่า');
      setDisable(0);
    }
    else {
      // console.log('มากกว่า');
      setDisable(1);
    }
  }

  const current_page = (Data) => {
    setCurrentPage(Data);
    // console.log(currentPage, "CP");
  }

  return (
    <div>
      <NavBar
        term={searchTerm}
        type={type}
        SearchKeyword={searchHandler}
        repage={current_page}
      />
      <br />
      <br />
      <br />
      <Routes>
        <Route path="/:searchURLword/" element={<Default
          key={searchTerm}
          searchKey={searchTerm}
          SearchKeyword={searchHandler}
          Username={name}
          totalOfPages={total_pages}
          page={currentPage}
          typeMovie={typeMovie}
        // lenghtOfData={lenghtOfData}
        // currentPosts={currentPosts}
        />} />
        <Route path="/:searchURLword/:Page/" element={<Default
          key={searchTerm}
          searchKey={searchTerm}
          SearchKeyword={searchHandler}
          Username={name}
          totalOfPages={total_pages}
          page={currentPage}
          typeMovie={typeMovie}
        // lenghtOfData={lenghtOfData}
        // currentPosts={currentPosts}
        />} />
        <Route path="/" exact element={<Default
          key={searchTerm}
          searchKey={searchTerm}
          SearchKeyword={searchHandler}
          Username={name}
          totalOfPages={total_pages}
          page={currentPage}
          typeMovie={typeMovie}
        // lenghtOfData={lenghtOfData}
        // currentPosts={currentPosts}
        />} />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/favorites" element={<Favorites Username={name} totalOfPages={total_pages} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <br />
      <br />
      <br />
      <Pagination totalPages={totalPages} page={current_page} currentPage={currentPage} disable={disable}/>
    </div>
  );
}


export default App;
