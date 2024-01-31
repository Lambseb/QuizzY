import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function MainPage() {
  const NavBarLink = [
    {
      name: "CREER UN QUIZ",
      path: "/created",
    },
    {
      name: "QUIZZY",
      path: "/quiz",
    },
    {
      name: "COMPTE",
      path: "/account",
    },
  ];
  const [quiz, setQuiz] = useState();
  useEffect(() => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/quiz`).then((res) => {
        setQuiz(res.data);
      });
    } catch (error) {
      console.info("not found fetching", error);
    }
  }, []);

  return (
    <main>
      <section className="flex flex-col mt-20 items-center">
        {NavBarLink &&
          NavBarLink.map((link) => (
            <NavLink
              className="bg-primary w-[10rem] shadow-black
               text-center rounded-md text-main m-1 text-white py-2 px-4"
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
