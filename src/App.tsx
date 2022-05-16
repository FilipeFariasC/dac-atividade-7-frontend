import {useState} from "react";

import 'bootstrap';
import 'bootswatch/dist/minty/bootstrap.css'
/*
import 'bootswatch/dist/sandstone/bootstrap.css'
import 'bootswatch/dist/litera/bootstrap.css'
import 'bootswatch/dist/zephyr/bootstrap.css'
*/

import AuthorModel from './model/AuthorModel';
import BookModel from './model/BookModel';
import AppRoutes from './main/AppRoutes';
import UserModel from "./model/UserModel";

const authorList: AuthorModel[] = [];
const bookList: BookModel[] = [];

function defaultUser(): UserModel {
  return {
    username:"",
    password: ""
  }
}

function App() {
  const [userLogged, setUserLogged] = useState(defaultUser());
  const [userListChanged, setUserListChanged] = useState(false);

  return (
    <>
      <AppRoutes userState={[userLogged, setUserLogged]} 
      authorList={authorList} 
      bookList={bookList} 
      userListChanged={[userListChanged, setUserListChanged]} />
    </>
  );
}

export default App;