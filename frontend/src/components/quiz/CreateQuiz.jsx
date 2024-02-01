/* eslint-disable react/jsx-props-no-spreading */

import { useOutletContext } from "react-router-dom";

import AnswerCreatedQuiz from "./AnswerCreatedQuiz";

function CreateQuiz() {
  const { auth } = useOutletContext();
  return (
    <main>
      {auth === undefined ? (
        <div className="mt-20">
          <h1 className="font-main text-xl flex align-middle text-center">
            Vous devez être connecté pour accéder à cette page
          </h1>
        </div>
      ) : (
        <AnswerCreatedQuiz auth={auth} />
      )}
    </main>
  );
}
export default CreateQuiz;
