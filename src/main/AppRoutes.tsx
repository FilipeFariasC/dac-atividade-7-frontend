import {Route, BrowserRouter, Routes} from 'react-router-dom';
import BookModel from '../model/BookModel';
import AuthorModel from '../model/AuthorModel';
import AuthorRegister from '../components/AuthorRegister';
import BookRegister from '../components/BookRegister';

export interface AppRoutesProps{
  authorList: AuthorModel[];
  bookList: BookModel[];
  userListChanged: [boolean, (value: boolean) => void];
}

export default function AppRoutes(
  {
    authorList,
    bookList,
    userListChanged,

  } : AppRoutesProps){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthorRegister authorList={authorList}/>}/>
        <Route path="/registerAuthor" element={<AuthorRegister authorList={authorList}/>}/>

        <Route path="/registerBook" element={<BookRegister authorList={authorList} bookList={bookList} userListChanged={userListChanged}/>}/>
      </Routes>
    </BrowserRouter>
  )
}