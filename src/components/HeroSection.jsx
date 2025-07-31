import React from "react";
//import logoAvenger1 from "../assets/logoAvenger1.png";
import ironMan2 from "../assets/ironMan2.jpg";
import { Link } from "react-router-dom";
import "../pages/Css/HeroSection.css";

const HeroSection = () => {
  return (
    <section style={{ ...styles.hero, backgroundImage: `url(${ironMan2})` }}>
      <div style={styles.overlay} />
      <div style={styles.content}>
        <h1 style={styles.title}>Bienvenue dans l'univers Marvel</h1>
        <p style={styles.text}>
          Découvrez les héros légendaires et leurs histoires épiques.
        </p>
        <div style={styles.buttonsCategory}>
          <Link to="/characters">
            <button className="hero-button">Personnages</button>
          </Link>
          <Link to="/comics">
            <button className="hero-button">Comics</button>
          </Link>
          <Link to="/favorites">
            <button className="hero-button">Favoris</button>
          </Link>
        </div>
      </div>
      {/*<img src={logoAvenger1} alt="logo avengers" style={styles.image} />*/}
    </section>
  );
};

const styles = {
  //Deuxieme image iron man 2 faces
  hero: {
    position: "relative",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    padding: "50px",
    overflow: "visible",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.64)",
    /*maxWidth: "1200px",*/
    margin: "0 auto",
  },
  //container Titre et texte
  content: {
    maxWidth: "900px",
    /*margin: "0 auto", // 👈 centre horizontalement*/
    zIndex: 2,
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "30px",
    borderRadius: "15px",
  },

  title: {
    fontSize: "3.5rem",
    color: "#ff3f34",
    textShadow: "2px 2px 0 #000",
  },
  text: {
    fontSize: "1.2rem",
    marginTop: "20px",
    textAlign: "center", // <-- centrer le texte
  },
  buttonsCategory: {
    display: "flex",
    gap: "20px",
    marginTop: "30px",
    justifyContent: "center",
  },
  //IMAGE PNG
  /*image: {
    position: "absolute",
    right: "-600px",
    bottom: "-300px",
    height: "70%",
    zIndex: 1,
    pointerEvents: "none",
    filter: "drop-shadow(0 0 10px #ff3f34)",
    animation: "slideFromTop 1.2s ease-out forwards",
  },*/

  //effets sur le background NE PAS TOUCHER
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    animation: "pulse 3s infinite",
    zIndex: 0,
    borderRadius: "20px",
  },
};

export default HeroSection;
