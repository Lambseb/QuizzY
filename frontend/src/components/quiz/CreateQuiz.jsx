/* eslint-disable react/jsx-props-no-spreading */

import { useOutletContext } from "react-router-dom";

import AnswerCreatedQuiz from "./AnswerCreatedQuiz";

function CreateQuiz() {
  const { auth } = useOutletContext();
  return (
    <main>
      {auth === undefined ? (
        <div className="mt-20">
          <p className="font-main font-primary text-xl flex align-middle text-center lg:justify-center">
            Vous devez être connecté pour accéder a QuizzY
          </p>
        </div>
      ) : (
        <AnswerCreatedQuiz auth={auth} />
      )}
    </main>
  );
}
export default CreateQuiz;
