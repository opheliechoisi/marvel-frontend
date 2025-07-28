import { useEffect, useState } from "react";
import axios from "axios";
import Favorites from "./Favorites";

const Comics = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");

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
        console.log(response.data);
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
      {/**************       BARRE DE RECHERCHE COMICS      ***************/}
      <input
        type="text"
        placeholder="Recherchez un comics"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {data.results
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title))
        .filter((comics) =>
          comics.title.toLowerCase().includes(search.toLowerCase())
        )

        .map((comics) => {
          return (
            <article key={comics._id}>
              <p>{comics.title}</p>
              <img
                src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                alt={comics.title}
                //style={{ width: "200px", borderRadius: "12px" }}
              />
              <p>{comics.description}</p>
            </article>
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

export default Comics;
