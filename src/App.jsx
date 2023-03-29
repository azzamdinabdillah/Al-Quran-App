import { Route, Routes } from "react-router-dom";
import "./App.css";
import BottomNavbar from "./components/BottomNavbar";
import { AuthContextProvider } from "./context/AuthContext";
import { MainAppProvider } from "./context/SuratContext";
import "./index.css";
import Home from "./Pages/Home";
import Saved from "./Pages/Saved/SavedQuranDetails";
import SavedQuran from "./Pages/Saved/SavedQuran";
import Surah from "./Pages/Surah";
import Tafsir from "./Pages/Tafsir";
import TafsirDetails from "./Pages/TafsirDetails";
import SavedQuranDetails from "./Pages/Saved/SavedQuranDetails";

function App() {
  return (
    <div className="App pb-40 bg-[#EAF2EF] dark:bg-[#2F243A]">
      <AuthContextProvider>
        <MainAppProvider>
          <section className="md:grid grid-cols-8">
            <div className="col-span-1">
              <BottomNavbar />
            </div>
            <div className="col-span-7">
              <Routes>
                <Route path="/:lastSurat?/:lastAyat?" element={<Home />} />
                <Route
                  path="/surah/:namaSurat/:id/:ayatSaved"
                  element={<Surah />}
                />
                <Route path="/tafsir" element={<Tafsir />} />
                <Route path="/tafsir/:id" element={<TafsirDetails />} />
                <Route path="/saved/alquran" element={<SavedQuran />} />
                <Route path="/saved/alquran/:folderName" element={<SavedQuranDetails />} />
              </Routes>
            </div>
          </section>
        </MainAppProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
