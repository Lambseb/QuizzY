/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import axios from "axios";
// todo USENAVIGTE TO MENU DEMAIN

export default function ResponseCreatedQuiz() {
  const { register, handleSubmit, reset } = useForm();
  const data = useLocation();
  const { state } = data;
  const { answerUserId, valueAnswer } = state;
  const onSubmit = async (formData) => {
    console.log(formData);
    reset({ response: "une autre réponse ?" });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/responses`,
        formData
      );
      if (response.status === 200) {
        toast.success("Le Quizy est validé !");
      }
    } catch (error) {
      console.error(error);
      toast.error("La question n'a pas était envoyé et ou invalide");
    }
  };

  return (
    <section>
      <h5 className="text-center font-main mt-20">question: {valueAnswer} </h5>
      <form
        className="mt-10  mx-20 items-center "
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-backgroundfile:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <select
            className="border my-1 h-8 w-20"
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
        </label>
        <button
          type="submit"
          className="bg-primary mt-2 rounded-sm w-[10rem]
                 text-centerrounded-md text-main m-auto  text-white py-2 "
        >
          Valider le question
        </button>
      </form>
    </section>
  );
}
