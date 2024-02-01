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
      <h1 className="font-main text-xl flex align-middle text-center">
        Vous devez être connecté pour accéder à cette page
      </h1>
    </div>
  ) : (
    <main className="flex flex-col mt-32 items-center">
      {ButtonQuizManagement &&
        ButtonQuizManagement.map((e) => (
          <NavLink
            to={e.path}
            key={e.name}
            className="bg-primary w-[10rem] shadow-black
                 text-center rounded-md text-main m-1 text-white py-2 px-4"
          >
            {e.name}
          </NavLink>
        ))}
    </main>
  );
}
