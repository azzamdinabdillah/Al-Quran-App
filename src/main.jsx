import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home';
import Surah from './Pages/Surah';
import App from './App';
import BottomNavbar from './components/BottomNavbar';
import Tafsir from './Pages/Tafsir';
import TafsirDetails from './Pages/TafsirDetails';
import Saved from './Pages/Saved';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home/>
  },
  {
    path:"/surah/:id",
    element:<Surah/>
  },
  {
    path:"/tafsir",
    element:<Tafsir/>
  },
  {
    path:"/tafsir/:id",
    element:<TafsirDetails/>
  },
  {
    path:"/saved",
    element:<Saved/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
