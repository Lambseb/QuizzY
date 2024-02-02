import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function DeleteQuiz() {
  const [quiz, setQuiz] = useState();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/name_quiz`)
      .then((response) => {
        setQuiz(response.data);
      });
  }, [quiz]);

  const handleDelete = (id) => {
    try {
      axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/${id}`);
      toast.success("Quizzy supprimé");
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };
  return (
    <section className="mt-20">
      {quiz &&
        quiz.map((element) => (
          <article
            key={element.id}
            className="my-2 w-full flex flex-col mt-6  font-main justify-center items-center
          lg:mx-80"
          >
            <p
              className="bg-primary  shadow-neutral-50 w-[80%]
               text-center rounded-md text-main m-1 text-white py-6"
            >
              quizzy n°:{element.id} {element.name}
            </p>
            <button
              onClick={() => handleDelete(element.id)}
              className="border text-xl mx-20 w-[80%]  py-2 rounded-md duration-150 bg-red-800 text-white hover:duration-150"
              type="button"
            >
              supprimer
            </button>
          </article>
        ))}
      <ToastContainer />
    </section>
  );
}
