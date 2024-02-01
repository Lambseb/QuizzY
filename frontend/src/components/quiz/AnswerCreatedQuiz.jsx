/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";

export default function AnswerCreatedQuiz({ auth }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/quiz`,
        data
      );
      const answerUserId = response.data.id;
      const valueAnswer = data.name;
      setTimeout(() => {
        navigate("/manage/responsecreated", {
          state: { answerUserId, valueAnswer },
        });
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("La question n'a pas était envoyé");
    }
  };

  return (
    <section>
      <form
        className="mt-20 flex flex-col items-center "
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className=" text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Votre question...
          <input
            placeholder="Pose une question"
            type="text"
            name="question"
            {...register("name", {
              required: "Champ obligatoire",
              minLength: {
                value: 5,
                message: " 5 caractères minimum",
              },
            })}
            className=" mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.question?.message && (
            <p role="alert" className="text-lg font-light">
              {errors.question.message}
            </p>
          )}
        </label>
        <input
          className="hidden"
          name="user_id"
          value={auth.user.id}
          {...register("user_id")}
        />
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
