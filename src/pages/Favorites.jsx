import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoritesButton from "../components/FavoritesButton";
import ironMan2 from "../assets/ironMan2.jpg";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      const parsed = stored ? JSON.parse(stored) : [];

      if (!Array.isArray(parsed)) throw new Error("Favorites is not an array");

      setFavorites(parsed);
    } catch (err) {
      console.error("Erreur de parsing des favoris :", err);
      localStorage.removeItem("favorites");
      setFavorites([]);
    }
  }, []);

  const handleRemoveFavorite = (id) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <main className="characters-hero">
      {/* Background fixe flouté + overlay */}
      <div
        className="background-fixed"
        style={{ backgroundImage: `url(${ironMan2})` }}
      />
      <div className="overlay" />

      <div className="characters-content">
        <h1 className="hero-title">Vos Favoris</h1>

        <div className="hero-buttons">
          <button className="hero-button" onClick={() => navigate("/")}>
            ← Retour à l’accueil
          </button>
        </div>

        {favorites.length === 0 ? (
          <p className="hero-text">Aucun favori enregistré.</p>
        ) : (
          <div className="characters-grid">
            {favorites.map((fav) => (
              <article
                key={fav.id}
                className="character-card"
                id={`fav-${fav.id}`}
              >
                <div className="card-top">
                  {fav.thumbnail?.path ? (
                    <img
                      src={`${fav.thumbnail.path}.${fav.thumbnail.extension}`}
                      alt={fav.name}
                    />
                  ) : (
                    <p>Pas d’image disponible</p>
                  )}

                  <h3>{fav.name || fav.title}</h3>

                  <p>{fav.description || "Pas de description disponible."}</p>

                  <FavoritesButton itemId={fav.id} type={fav.type} />
                </div>

                <div className="card-bottom">
                  <button
                    className="hero-button-remove"
                    onClick={() => handleRemoveFavorite(fav.id)}
                  >
                    🗑 Supprimer
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;
