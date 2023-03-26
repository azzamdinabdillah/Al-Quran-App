import './App.css'
import BottomNavbar from "./components/BottomNavbar";
import './index.css';
import Home from './Pages/Home'

function App() {

  return (
    <div className="App pb-40 dark:bg-[#040C23]">
      <Home />
      <BottomNavbar />
    </div>
  );
}

export default App
