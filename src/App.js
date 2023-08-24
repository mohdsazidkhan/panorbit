import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Profile from './pages/Profile/Profile';
import Posts from './pages/Posts/Posts';
import Gallery from './pages/Gallery/Gallery';
import Todo from './pages/ToDo/Todo';
import NoPage from "./pages/NoPage/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/posts/:id' element={<Posts />} />
          <Route path='/gallery/:id' element={<Gallery />} />
          <Route path='/todo/:id' element={<Todo />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
