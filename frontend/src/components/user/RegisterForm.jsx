/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, data)
      .then(navigate("/login"));
  };
  const passwordRef = useRef({});
  passwordRef.current = watch("password", "");

  const regexForm = /^(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^wds:])([^s]){4,16}$/;

  return (
    <div className="w-full max-w-md bg-white  rounded-lg p-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Créer un compte</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          type="text"
          {...register("username", {
            required: "Champ obligatoire",
            minLength: {
              value: 3,
              message: "doit contenir au moins 3 caractères",
            },
          })}
          placeholder="username"
          className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:primartransition ease-in-out duration-150"
        />
        <input
          placeholder="email"
          type="email"
          name="email"
          {...register("email", {
            required: "champ obligatoire",
            pattern: {
              value: /\./,
              message: "votre e-mail n'est pas valide",
            },
          })}
          className="bg-gray-100 text-primary border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:primartransition ease-in-out duration-150"
        />{" "}
        {errors.email?.message && (
          <p role="alert" className="text-lg font-light">
            {" "}
            {errors.email.message || "Champ obligatoire"}
          </p>
        )}
        <input
          type="password"
          {...register("password", {
            required: "champ obligatoire",
            pattern: {
              value: { regexForm },
              message:
                "doit contenir au moins 4 caractères dont au moins une majuscule, une miniscule, un chiffre et un caractère spécial ",
            },
          })}
          placeholder="password"
          className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:primartransition ease-in-out duration-150"
        />
        <input
          placeholder="confirmer password"
          type="password"
          {...register("confirmpassword", {
            required: "champ obligatoire",
            validate: (value) =>
              value === passwordRef.current || "mots de passe non similaires",
          })}
          className="bg-gray-100 text-gray-900 border-0 rounded-md
          p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1
          focus:primartransition ease-in-out duration-150"
        />
        {errors.confirmpassword && (
          <p role="alert" className="text-lg font-light">
            {errors.confirmpassword.message}
          </p>
        )}
        <p className="text-gray-900 mt-4">
          Déja un compte?{" "}
          <NavLink
            to="/login"
            className="text-sm text-primary font-bold hover:underline mt-4"
            href="#"
          >
            Connection
          </NavLink>
        </p>
        <button
          className="bg-primary text-white font-bold py-2 px-4 rounded-md mt-4"
          type="submit"
        >
          S'enregistrer
        </button>
      </form>
    </div>
  );
}
