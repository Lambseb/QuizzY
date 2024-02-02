import { useOutletContext, NavLink } from "react-router-dom";
import quizzy from "../assets/backGroundQuizzy.png";

export default function MainPage() {
  const { auth } = useOutletContext();
  const NavBarLink = [
    {
      name: "GESTION DES QUIZ",
      path: "/manage",
    },
    {
      name: "QUIZZY !",
      path: "/quiz",
    },
    {
      name: "COMPTE",
      path: "/account",
    },
  ];

  return !auth ? (
    <div className=" mt-20">
      <img src={quizzy} className="w-32 flex opacity-80 m-auto" alt="" />
      <h1 className="font-main font-primary text-xl flex align-middle text-center justify-center">
        BIENVENUE SUR QUIZZY...
      </h1>
      <p className="font-main font-primary text-xl flex align-middle text-center justify-center">
        Vous devez être connecté pour accéder a QuizzY
      </p>
      <div className="text-sm text-center mt-[1.6rem]">
        Nouveau Quizzyzer?{" "}
        <NavLink to="/register" className="text-primary font-bold" href="#">
          créer un compte
        </NavLink>
        <p className="text-gray-900 mt-4">
          Déja Quizzyzer?{" "}
          <NavLink
            to="/login"
            className="text-sm text-primary font-bold hover:underline mt-4"
            href="#"
          >
            Connection
          </NavLink>
        </p>
      </div>
    </div>
  ) : (
    <main>
      <section className="flex flex-col mt-32 items-center">
        {NavBarLink &&
          NavBarLink.map((link) => (
            <NavLink
              className="bg-primary  shadow-neutral-50 w-[80%]
               text-center rounded-md text-main m-1 text-white py-6 lg:w-[40%]"
              key={link.name}
              to={link.path}
            >
              {link.name}
            </NavLink>
          ))}
      </section>
    </main>
  );
}
