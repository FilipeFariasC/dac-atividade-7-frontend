import {Route, BrowserRouter, Routes} from 'react-router-dom';
import BookModel from '../model/BookModel';
import AuthorModel from '../model/AuthorModel';
import AuthorRegister from '../components/AuthorRegister';
import BookRegister from '../components/BookRegister';
import Login from '../components/Login';
import UserModel from '../model/UserModel';
import Home from '../components/Home';

export interface AppRoutesProps{
  authorList: AuthorModel[];
  bookList: BookModel[];
  userListChanged: [boolean, (value: boolean) => void];
  userState: [UserModel, (user: UserModel)=>void];
}

export default function AppRoutes(
  {
    authorList,
    bookList,
    userListChanged,
    userState
  } : AppRoutesProps){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUserLogged={userState[1]}/>}/>
        <Route path="/" element={
          (userState[0].username=="monteiro@ifpb.edu.br" && userState[0].password=="123")
          ? 
          <Home/> 
          : 
          <Login setUserLogged={userState[1]}/>
          }
          />

        <Route path="/registerAuthor" element={<AuthorRegister authorList={authorList}/>}/>

        <Route path="/registerBook" element={<BookRegister authorList={authorList} bookList={bookList} userListChanged={userListChanged}/>}/>
      </Routes>
    </BrowserRouter>
  )
}