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
    const [userLogged, setUserLogged] = userState; 
  return (
    <BrowserRouter>
      <Routes>
        <Route caseSensitive path="/login" element={<Login setUserLogged={setUserLogged} />} />
        <Route caseSensitive path="/" element={(userLogged.username === "monteiro@ifpb.edu.br" && userLogged.password === "123")
          ?
          <Home />
          :
          <Login setUserLogged={setUserLogged} />} />

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
