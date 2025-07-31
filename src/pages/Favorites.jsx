import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate(); // <-- Initialise navigate

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
    <div>
      <h2>⭐ Vos Favoris</h2>

      {/* Bouton retour */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        ← Retour à l’accueil
      </button>

      {favorites.length === 0 ? (
        <p>Aucun favori enregistré.</p>
      ) : (
        favorites.map((fav) => (
          <article
            key={fav.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "1rem",
            }}
          >
            <h3>{fav.name}</h3>
            {fav.thumbnail && fav.thumbnail.path ? (
              <img
                src={`${fav.thumbnail.path}.${fav.thumbnail.extension}`}
                alt={fav.name}
              />
            ) : (
              <p>Pas d’image disponible</p>
            )}

            <p>{fav.description || "Pas de description disponible."}</p>
            <button onClick={() => handleRemoveFavorite(fav.id)}>
              🗑 Supprimer des favoris
            </button>
          </article>
        ))
      )}
    </div>
  );
};

export default Favorites;
