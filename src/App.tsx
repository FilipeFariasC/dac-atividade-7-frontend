import React from 'react';
import {useState} from "react";

import 'bootstrap';
import 'bootswatch/dist/minty/bootstrap.css'

import Navbar from './components/Navbar'

import AuthorRegister, {AuthorModel} from './components/AuthorRegister';

const authorList: AuthorModel[] = [];

function App() {
  const [page, setPage] = useState(true);

  return (
    <>
      <header>
        <Navbar
         page={page}
         goToAuthorRegisterPage={()=>{setPage(true)}}
         goToBookRegisterPage={()=>{setPage(false)}}
         />
      </header>
      <main className="form-center">
        {
          page ? 
          <AuthorRegister 
          authorList={authorList}
          />
          : 
          <h1>Página 2</h1>
        }
      </main>
      <footer></footer>
    </>
  );
}

export default App;