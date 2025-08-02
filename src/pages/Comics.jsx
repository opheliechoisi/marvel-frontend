import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../components/FavoritesButton";
import ironMan2 from "../assets/ironMan2.jpg";

const Comics = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const navigate = useNavigate();
  const API_URL = "https://site--marvel-backend--zn4bx7lhq62j.code.run";
  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/comics?title=${search}&skip=${
            page * limit
          }&limit=${limit}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Erreur lors de la récupération des comics :", error);
      }
    };
    fetchData();
  }, [search, page]);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <main className="characters-hero">
      {/* Fond flou */}
      <div
        className="background-fixed"
        style={{ backgroundImage: `url(${ironMan2})` }}
      />
      <div className="overlay" />

      <div className="characters-content">
        <h1 className="hero-title">Explorez les Comics Marvel</h1>
        <p className="hero-text">
          Plongez dans les aventures iconiques de vos super-héros préférés.
        </p>

        <div className="hero-buttons">
          <button className="hero-button" onClick={() => navigate("/")}>
            ← Accueil
          </button>
        </div>

        <input
          type="text"
          placeholder="Recherchez un comics"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          className="search-bar"
        />

        <div className="characters-grid">
          {data.results
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((comic) => (
              <div
                key={comic._id}
                id={`fav-${comic._id}`}
                className="character-card"
              >
                <FavoriteButton itemId={comic._id} type="comic" />

                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
                <h2>{comic.title}</h2>
                <p>
                  {comic.description
                    ? comic.description
                    : "Description indisponible"}
                </p>
              </div>
            ))}
        </div>

        <div className="pagination">
          {page > 0 && (
            <button onClick={() => setPage(page - 1)}>← Précédent</button>
          )}
          {data.results.length === limit && (
            <button onClick={() => setPage(page + 1)}>Suivant →</button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Comics;
