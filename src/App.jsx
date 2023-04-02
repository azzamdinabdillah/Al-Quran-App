import { Route, Routes } from "react-router-dom";
import "./App.css";
import BottomNavbar from "./components/BottomNavbar";
import { AuthContextProvider } from "./context/AuthContext";
import { MainAppProvider } from "./context/MainContext";
import "./index.css";
import Home from "./Pages/Home";
import Saved from "./Pages/Saved/SavedDetails";
import SavedQuran from "./Pages/Saved/SavedQuran";
import Surah from "./Pages/Surah";
import Tafsir from "./Pages/Tafsir";
import TafsirDetails from "./Pages/TafsirDetails";
import SavedQuranDetails from "./Pages/Saved/SavedDetails";
import ListSaved from "./Pages/Saved/ListSaved";
import SavedTafsir from "./Pages/Saved/SavedTafsir";

function App() {
  return (
    <div className="App pb-40 bg-[#EAF2EF] dark:bg-[#2F243A]">
      <AuthContextProvider>
        <MainAppProvider>
          <section className="md:grid lg:grid-cols-7 md:grid-cols-8">
            <div className="col-span-1">
              <BottomNavbar />
            </div>
            <div className="col-span-7 lg:col-span-6">
              <Routes>
                <Route path="/:lastSurat?/:lastAyat?" element={<Home />} />
                <Route
                  path="/alquran/:namaSurat/:id/:ayatSaved"
                  element={<Surah />}
                />
                <Route path="/tafsir" element={<Tafsir />} />
                <Route path="/saved/tafsir" element={<SavedTafsir />} />
                <Route
                  path="/tafsir/:namaSurat/:id/:tafsirSaved"
                  element={<TafsirDetails />}
                />
                <Route path="/saved" element={<ListSaved />} />
                <Route path="/saved/alquran" element={<SavedQuran />} />
                <Route
                  path="/saved/:list/:id"
                  element={<SavedQuranDetails />}
                />
              </Routes>
            </div>
          </section>
        </MainAppProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
