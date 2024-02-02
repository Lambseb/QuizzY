import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
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
            className="font-main rounded-md h-[2rem] px-2 mt-2 text-white text-[1.5rem] bg-primary"
            to="/login"
          >
            se connecter
          </NavLink>
        ) : (
          <p className="font-main  h-[2rem] px-2 mt-2 border shadow-primary rounded-md text-primary font-bold text-[1.2rem] shadow-md">
            {auth.user.username}
          </p>
        )}
      </nav>
    </header>
  );
}
NavBar.defaultProps = {
  auth: undefined,
};
NavBar.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }),
};
