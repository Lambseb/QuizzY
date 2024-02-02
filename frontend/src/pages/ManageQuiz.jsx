import { useOutletContext, NavLink } from "react-router-dom";

export default function CreateQuiz() {
  const { auth } = useOutletContext();

  const ButtonQuizManagement = [
    {
      name: "CREER UN QUIZ",
      path: "/manage/create",
    },
    {
      name: "MODIFIER UN QUIZ",
      path: "/manage/modify",
    },
    {
      name: "SUPPRIMER UN QUIZ",
      path: "/manage/delete",
    },
  ];

  return !auth ? (
    <div className="mt-20">
      <p className="font-main font-primary text-xl flex align-middle text-center lg:justify-center">
        Vous devez être connecté pour accéder a QuizzY
      </p>
    </div>
  ) : (
    <main className="flex flex-col mt-32 items-center">
      {ButtonQuizManagement &&
        ButtonQuizManagement.map((e) => (
          <NavLink
            to={e.path}
            key={e.name}
            className="bg-primary  shadow-neutral-50 w-[80%]
            text-center rounded-md text-main m-1 text-white py-6 lg:w-[40%]"
          >
            {e.name}
          </NavLink>
        ))}
    </main>
  );
}
