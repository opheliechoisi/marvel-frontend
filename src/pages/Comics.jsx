import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../components/FavoritesButton";

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
    <main>
      <h1>Liste des comics</h1>

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

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Recherchez un comics"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {data.results
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title))
        .filter((comic) =>
          comic.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((comic) => (
          <article
            id={`fav-${comic._id}`}
            key={comic._id}
            style={{ marginBottom: "1rem" }}
          >
            <p>{comic.title}</p>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <p>{comic.description}</p>

            {/* Bouton Favoris */}
            <FavoriteButton itemId={comic._id} type="comic" />
          </article>
        ))}

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        {page > 0 && (
          <button onClick={() => setPage(page - 1)}>← Page précédente</button>
        )}
        {data.results.length === limit && (
          <button onClick={() => setPage(page + 1)}>Page suivante →</button>
        )}
      </div>
    </main>
  );
};

export default Comics;
