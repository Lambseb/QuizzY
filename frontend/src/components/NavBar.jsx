import { NavLink } from "react-router-dom";
import { propTypes } from "prop-types";
import quizzyImage from "../assets/quizzy.png";

export default function NavBar({ auth }) {
  return (
    <header>
      <nav className="flex justify-between mx-2">
        <NavLink to="/" className="w-[4rem]  h-[4rem]">
          <img
            src={quizzyImage}
            className="w-[4rem] h-[4rem] rounded-full"
            alt=""
          />
        </NavLink>
        {auth === undefined ? (
          <NavLink
            className="font-main rounded-sm h-[2rem] px-2 mt-2 text-white text-[1.5rem] bg-primary"
            to="/login"
          >
            Se connecter
          </NavLink>
        ) : (
          <p className="font-main rounded-sm h-[2rem] px-2 mt-2 text-primary text-[1.2rem] shadow-md">
            Bonjour {auth.user.username}
          </p>
        )}
      </nav>
    </header>
  );
}
// propTypes = {
//   auth: propTypes.object.isRequired,
// };
