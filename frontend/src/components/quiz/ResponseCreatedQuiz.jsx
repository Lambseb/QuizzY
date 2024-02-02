/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
// todo USENAVIGTE TO MENU DEMAIN

export default function ResponseCreatedQuiz() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const data = useLocation();
  const { state } = data;
  const { auth } = useOutletContext();
  const { answerUserId, valueAnswer } = state;
  const onSubmit = async (formData) => {
    reset({ response: "autre réponse?" });
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/responses`,
        formData
      );

      toast.success("Réponse rajouté!");
    } catch (error) {
      console.error(error);
      toast.error("La question n'a pas était envoyé et ou invalide");
    }
  };
  const HandleValidate = () => {
    toast.success("Le QuizzY est validé retour à la page d'acceuil...");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  return !auth ? (
    <div className="mt-20">
      <h1 className="font-main text-xl flex align-middle text-center">
        Vous devez être connecté pour accéder à cette page
      </h1>
    </div>
  ) : (
    <section>
      <h5 className="text-center font-main mt-20 lg:mt-6">question: {valueAnswer} </h5>
      <form
        className="mt-10  mx-20 flex flex-col items-center  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className=" text-primary  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Réponse:
          <div className="flex">
            <input
              placeholder="réponse à la question"
              type="text"
              name="response"
              {...register("response", {
                required: "Champ obligatoire",
              })}
              className="mt-2 flex h-10  rounded-md border border-input bg-background px-14 py-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="flex items-center mt-2">
            <select
              className="border  my-1 rounded-md h-16 w-20 "
              name="value"
              {...register("value")}
            >
              <option value={1}>Vrai</option>
              <option value={0}>Faux</option>
            </select>
            <input
              type="text"
              className="hidden"
              name="quiz_id"
              value={answerUserId}
              {...register("quiz_id")}
            />
            <button
              type="submit"
              className="bg-primary  rounded-md w-[80%]
          text-centerrounded-md text-main m-auto ml-2  text-white py-6  "
            >
              Valider le question
            </button>
          </div>
        </label>
        <button
          onClick={HandleValidate}
          type="button"
          className="bg-primary mt-16 rounded-3xl h-[12rem] w-[12rem]
          text-centerrounded-md text-main   text-white py-2"
        >
          GENERER LE QUIZZY!
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
}
