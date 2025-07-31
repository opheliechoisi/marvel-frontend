import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//IMPORT COMPONENTS
import Header from "./components/Header";

//IMPORT PAGES
import Home from "./pages/Home";
//import Signup from "./pages/Signup";
//import Login from "./pages/Login";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import CharacterComics from "./pages/CharacterComics";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comics/:characterId" element={<CharacterComics />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
