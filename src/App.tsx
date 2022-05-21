import {useState} from "react";

import 'bootstrap';
import 'bootswatch/dist/minty/bootstrap.css'
/*
import 'bootswatch/dist/sandstone/bootstrap.css'
import 'bootswatch/dist/litera/bootstrap.css'
import 'bootswatch/dist/zephyr/bootstrap.css'
*/

import AuthorModel from './model/AuthorDto';
import WorkModel from './model/WorkDto';
import AppRoutes from './main/AppRoutes';
import UserModel from "./model/UserModel";
import Navbar from "./components/Navbar";

function defaultUser(): UserModel {
  return {
    username:"",
    password: ""
  }
}

export default function App() {
  const [userLogged, setUserLogged] = useState(defaultUser());

  return (
    <>
      <AppRoutes userState={[userLogged, setUserLogged]} />
    </>
  );
}

