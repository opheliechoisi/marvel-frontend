import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // <-- ajoute useNavigate ici
import FavoriteButton from "../components/FavoritesButton";

const Characters = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const API_URL = "https://site--marvel-backend--zn4bx7lhq62j.code.run";
  const limit = 100;

  const navigate = useNavigate(); // <-- initialise useNavigate

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
        console.log("Erreur lors de la récupération des personnages :", error);
      }
    };

    fetchData();
  }, [search, page]);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <main>
      <h1>Personnages Marvel</h1>

      {/* Bouton retour */}
      <button
        onClick={() => navigate("/")} // retourne à la page home
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        ← Retour à l’accueil
      </button>

      {/**************       BARRE DE RECHERCHE PERSONNAGE      ***************/}
      <input
        type="text"
        placeholder="Recherchez un personnage"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(0);
        }}
      />
      {data.results
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((character) => {
          return (
            <Link key={character._id} to={`/comics/${character._id}`}>
              <article id={`fav-${character._id}`}>
                <p>{character.name}</p>
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                />
                <p>{character.description}</p>
                <FavoriteButton itemId={character._id} type="character" />
              </article>
            </Link>
          );
        })}

      {/************               PAGINATION BUTTONS              ************/}
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

export default Characters;
