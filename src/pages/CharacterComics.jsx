import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import backgroundImage from "../assets/ironMan2Faces.jpg";

const CharacterComics = () => {
  const { characterId } = useParams();
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = "https://site--marvel-backend--zn4bx7lhq62j.code.run";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/comics/${characterId}`);
        setComics(response.data.comics || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [characterId]);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Arrière-plan flouté */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px)",
          zIndex: -2,
        }}
      />
      {/* Overlay noir transparent */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: -1,
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 20px",
          color: "white",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "transparent",
            border: "1px solid white",
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            marginBottom: "2rem",
          }}
        >
          ← Retour
        </button>

        {isLoading ? (
          <p>Chargement des comics...</p>
        ) : error ? (
          <p>Erreur : {error}</p>
        ) : comics.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {comics.map((comic) => (
              <article
                key={comic._id || comic.id || comic.title}
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: "15px",
                  padding: "1rem",
                  boxShadow: "0 0 12px rgba(0,0,0,0.5)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h3 style={{ color: "#ff3f34" }}>{comic.title}</h3>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "1rem",
                  }}
                />
                <p style={{ fontSize: "0.95rem" }}>
                  {comic.description || "Pas de description disponible."}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p>Aucun comics trouvé pour ce personnage.</p>
        )}
      </div>
    </div>
  );
};

export default CharacterComics;
