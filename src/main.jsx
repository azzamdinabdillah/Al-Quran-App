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
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId='873913203336-a9n0kpb9o122oldrcmns3dh1s96veijo.apps.googleusercontent.com'>
  <BrowserRouter>
    <React.StrictMode>
      {/* <RouterProvider router={router}/> */}
      <App />
    </React.StrictMode>
  </BrowserRouter>
  </GoogleOAuthProvider>
);
