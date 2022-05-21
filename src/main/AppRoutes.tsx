import {Route, BrowserRouter, Routes} from 'react-router-dom';
import AuthorRegisterPage from '../pages/AuthorRegisterPage';
import WorkRegisterPage from '../pages/WorkRegisterPage';
import Login from '../pages/LoginPage';
import UserModel from '../model/UserModel';
import Home from '../components/Home';
import AuthorListPage from '../pages/AuthorListPage';
import WorkListPage from '../pages/WorkListPage';
import AuthorUpdatePage from '../pages/AuthorUpdatePage';
import WorkUpdatePage from '../pages/WorkUpdatePage';
export interface AppRoutesProps{
  userState: [UserModel, (user: UserModel)=>void];
}


export default function AppRoutes(
  {
    userState
  } : AppRoutesProps){
  return (
    <BrowserRouter>
      <Routes>
        <Route caseSensitive path="/login" element={<Login setUserLogged={userState[1]} />} />
        <Route caseSensitive path="/" element={(userState[0].username === "monteiro@ifpb.edu.br" && userState[0].password === "123")
          ?
          <Home />
          :
          <Login setUserLogged={userState[1]} />} />

        <Route caseSensitive path="/registerAuthor/" element={<AuthorRegisterPage />} />
        <Route caseSensitive path="/listAuthors/" element={<AuthorListPage />} />
        <Route caseSensitive path="/updateAuthor/:id" element={<AuthorUpdatePage/>} />

        <Route caseSensitive path="/registerWork/" element={<WorkRegisterPage/>} />
        <Route caseSensitive path="/listWorks/" element={<WorkListPage/>} />
        <Route caseSensitive path="/updateWork/:id" element={<WorkUpdatePage/>} />
      </Routes>
    </BrowserRouter>
  )
}
