import { useEffect, useState } from "react";

const FavoriteButton = ({ itemId, type }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    const found = stored.find((fav) => fav.id === itemId && fav.type === type);
    setIsFavorite(!!found);
  }, [itemId, type]);

  const toggleFavorite = (event) => {
    if (event) event.preventDefault();
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    let updated;

    if (isFavorite) {
      updated = stored.filter(
        (fav) => !(fav.id === itemId && fav.type === type)
      );
    } else {
      const cardElement = document.getElementById(`fav-${itemId}`);

      if (!cardElement) {
        console.error(`Élément avec id fav-${itemId} non trouvé dans le DOM`);
        return;
      }

      const name = cardElement.querySelector("p")?.textContent || "Nom inconnu";
      const description =
        cardElement.querySelectorAll("p")[1]?.textContent || "";
      const img = cardElement.querySelector("img")?.src || "";

      if (!img) {
        console.error(`Image non trouvée dans l'élément fav-${itemId}`);
        return;
      }

      const lastDotIndex = img.lastIndexOf(".");
      const path = img.substring(0, lastDotIndex);
      const extension = img.substring(lastDotIndex + 1);

      updated = [
        ...stored,
        {
          id: itemId,
          type,
          name,
          description,
          thumbnail: { path, extension },
        },
      ];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  const styles = {
    button: {
      all: "unset",
      position: "absolute",
      top: "8px",
      right: "8px",
      fontSize: "20px",
      color: isFavorite ? "#ff3f34" : "white",
      backgroundColor: "transparent",
      cursor: "pointer",
      zIndex: 2,
    },
    star: {
      fontSize: "20px",
    },
  };

  return (
    <button
      onClick={toggleFavorite}
      style={styles.button}
      aria-pressed={isFavorite}
    >
      <span style={styles.star}>{isFavorite ? "⭐" : "☆"}</span>
      {/*{isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}*/}
    </button>
  );
};

export default FavoriteButton;
