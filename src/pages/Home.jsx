import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenue dans l'univers Marvel</h1>

      <Link to="/characters">
        <button>Personnages</button>
      </Link>

      <Link to="/comics">
        <button>Comics</button>
      </Link>

      <Link to="/favorites">
        <button>Favoris</button>
      </Link>
    </div>
  );
};
export default Home;
