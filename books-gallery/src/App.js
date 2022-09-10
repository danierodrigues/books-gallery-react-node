import logo from './logo.svg';
//Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Components
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Book from './components/Book';
import CreateBook from './components/CreateBook'; 

//Styles
import {GlobalStyle} from './GlobalStyle';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:bookId' element={<Book/>}/>
      <Route path='/book/create' element={<CreateBook/>}/>
      <Route path='/*' element={<NotFound/>}></Route>
    </Routes>
      <GlobalStyle />
    </Router>
  );
}

export default App;
