import {Route, BrowserRouter, Routes} from 'react-router-dom';
import AuthorRegister, { AuthorModel } from '../components/AuthorRegister';
import BookRegister, { BookModel } from '../components/BookRegister';

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