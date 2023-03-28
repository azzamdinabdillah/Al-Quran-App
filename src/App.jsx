import { Route, Routes } from "react-router-dom";
import "./App.css";
import BottomNavbar from "./components/BottomNavbar";
import { AuthContextProvider } from "./context/AuthContext";
import { SuratAppProvider } from "./context/SuratContext";
import "./index.css";
import Home from "./Pages/Home";
import Saved from "./Pages/Saved";
import Surah from "./Pages/Surah";
import Tafsir from "./Pages/Tafsir";
import TafsirDetails from "./Pages/TafsirDetails";

function App() {
  return (
    <div className="App pb-40 dark:bg-[#040C23]">
      <AuthContextProvider>
        <SuratAppProvider>
          <Routes>
            <Route path="/:lastSurat?/:lastAyat?" element={<Home />} />
            <Route
              path="/surah/:namaSurat/:id/:ayatSaved"
              element={<Surah />}
            />
            <Route path="/tafsir" element={<Tafsir />} />
            <Route path="/tafsir/:id" element={<TafsirDetails />} />
            <Route path="/saved" element={<Saved />} />
          </Routes>
          <BottomNavbar />
        </SuratAppProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
