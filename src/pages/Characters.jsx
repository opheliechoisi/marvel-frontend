import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../components/FavoritesButton";

import ironMan2 from "../assets/ironMan2.jpg";

const Characters = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const limit = 100;
  const API_URL = "https://site--marvel-backend--zn4bx7lhq62j.code.run";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/characters?name=${search}&skip=${
            page * limit
          }&limit=${limit}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      }
    };

    fetchData();
  }, [search, page]);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main className="characters-hero">
      {/* Background fixe flouté */}
      <div
        className="background-fixed"
        style={{ backgroundImage: `url(${ironMan2})` }}
      />
      {/* Overlay sombre pour le contraste */}

      <div className="overlay" />
      <div className="characters-content">
        <h1 className="hero-title">Explorez les Personnages Marvel</h1>
        <p className="hero-text">
          Recherchez vos héros préférés et découvrez leurs histoires
          légendaires.
        </p>

        <div className="hero-buttons">
          <Link to="/">
            <button className="hero-button">← Accueil</button>
          </Link>
        </div>

        <input
          type="text"
          placeholder="Recherchez un personnage"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          className="search-bar"
        />

        <div className="characters-grid">
          {data.results
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((character) => (
              <div
                key={character._id}
                id={`fav-${character._id}`}
                className="character-card"
                style={{ position: "relative" }}
              >
                {/* Bouton Favori */}
                <FavoriteButton itemId={character._id} type="character" />

                <Link
                  to={`/comics/${character._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                  <h2>{character.name}</h2>
                  <p>
                    {character.description
                      ? character.description
                      : "Description indisponible"}
                  </p>
                </Link>
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

export default Characters;
