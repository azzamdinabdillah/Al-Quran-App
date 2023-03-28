import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  BrowserRouter,
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      {/* <RouterProvider router={router}/> */}
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
