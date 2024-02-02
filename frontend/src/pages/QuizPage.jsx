import { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function QuizPage() {
  const { data } = useLoaderData();
  const { auth } = useOutletContext();
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
      <p className="font-main font-primary text-xl flex align-middle text-center lg:justify-center">
        Vous devez être connecté pour accéder a QuizzY
      </p>
    </div>
  ) : (
    <main>
      {data &&
        data.map((e) => (
          <section
            className="flex  flex-col font-main justify-center items-center my-4 
             lg:mx-80"
            key={e.id}
          >
            <p
              className="bg-primary  shadow-neutral-50 w-[80%]
               text-center rounded-md text-main m-1 text-white py-6"
            >
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
                      className="mt- bg-whiteborder bg-primary bg-opacity-50 text-white rounded-md w-[80%] border py-6 duration-150 hover:bg-sky-700 hover:text-white hover:duration-150"
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
