import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CharacterComics = () => {
  const { characterId } = useParams();
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const API_URL = "https://site--marvel-backend--zn4bx7lhq62j.code.run";

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(`${API_URL}/comics/${characterId}`);
        console.log(response.data);
        setComics(response.data.comics || []);
      } catch (err) {
        console.error("Erreur API:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComics();
  }, [characterId]);

  if (isLoading) return <p>Chargement des comics...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Retour</button>
      {comics.length > 0 ? (
        comics.map((comic) => (
          <article key={comic._id || comic.id || comic.title}>
            <h3>{comic.title}</h3>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              //style={{ width: "200px", borderRadius: "12px" }}
            />
            <p>{comic.description || "Pas de description disponible."}</p>
          </article>
        ))
      ) : (
        <p>Aucun comics trouvé pour ce personnage.</p>
      )}
    </div>
  );
};

export default CharacterComics;
