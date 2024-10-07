import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>LOGO</h1>
      <img className="profile" src={assets.profile_image} alt="profile-image" />
    </div>
  );
};

export default Navbar;
