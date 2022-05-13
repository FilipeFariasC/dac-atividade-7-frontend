import React from 'react';
import {useState} from "react";

import 'bootstrap';
import 'bootswatch/dist/minty/bootstrap.css'

import Navbar from './components/Navbar'

import AuthorRegister, {AuthorModel} from './components/AuthorRegister';
import BookRegister, { BookModel } from './components/BookRegister';

const authorList: AuthorModel[] = [];
const bookList: BookModel[] = [];

function App() {
  const [page, setPage] = useState(true);
  const [userListChanged, setUserListChanged] = useState(false);

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
          <BookRegister
          bookList={bookList}
          authorList={authorList}
          userListChanged={[userListChanged, setUserListChanged]}
          />
        }
      </main>
      <footer></footer>
    </>
  );
}

export default App;