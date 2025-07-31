import { Link } from "react-router-dom";
import "./Css/Home.css";
import HeroSection from "../components/HeroSection";
import ironMan2 from "../assets/ironMan2.jpg";
import logoMarvel from "../assets/logoMarvel.png";

const Home = () => {
  return (
    <main
      className="home-container"
      style={{
        backgroundImage: `url(${ironMan2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="logo-marvel">
        <img src={logoMarvel} alt="Logo Marvel" />
      </div>

      {/* 👇 HeroSection en-dessous */}
      <HeroSection />
    </main>
  );
};

export default Home;
