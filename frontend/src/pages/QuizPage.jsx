import { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function QuizPage() {
  const { data } = useLoaderData();
  const { auth } = useOutletContext();
  console.log("l'authentification", auth);
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

  const HandleAnswer = (response) => {
    if (response.value === 1) {
      toast.success("Bonne réponse");
    } else {
      toast.error("Mauvaise réponse");
    }
  };

  return !auth ? (
    <div className="mt-20">
      <h1 className="font-main text-xl flex align-middle text-center">
        Vous devez être connecté pour accéder à cette page
      </h1>
    </div>
  ) : (
    <main>
      {data &&
        data.map((e) => (
          <section
            className="flex  flex-col font-main justify-center items-center my-4 
            mx-20 lg:mx-80"
            key={e.id}
          >
            <p className="rounded-sm  bg-primary w-full py-2 text-center text-white">
              n:°{e.id}: {e.name}
            </p>
            <article className="rounded-sm container flex flex-col items-center text-primary">
              {quiz &&
                quiz
                  .filter((element) => element.quiz_id === e.id)
                  .map((element) => (
                    <button
                      onClick={() => HandleAnswer(element)}
                      key={element.id}
                      type="button"
                      className="mt-1 bg-whiteborder rounded-sm w-full border py-2  duration-150 hover:bg-primary hover:text-white hover:duration-150"
                    >
                      {element.response}
                    </button>
                  ))}
            </article>
          </section>
        ))}
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </main>
  );
}

export default QuizPage;
