import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { setAuth } = useOutletContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        const auth = await response.data;
        setAuth(auth);
        navigate("/");
        console.info(response);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        "Échec de l'authentification, veuillez vérifier vos identifiants"
      );
    }
  };

  return (
    <main className="max-w-md relative flex flex-col  p-4 rounded-md text-black bg-white">
      <h2 className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
        Bonjour
      </h2>
      <p className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
        Veuillez vous connecter
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="block relative">
          <label
            htmlFor="email"
            className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
          />
        </div>
        <div className="block relative">
          <label
            htmlFor="password"
            className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
        </div>
        <button
          type="submit"
          className="bg-primary w-max m-auto px-6 py-2 rounded text-white text-sm font-bold"
        >
          Valider
        </button>
        <ToastContainer />
      </form>
      <div className="text-sm text-center mt-[1.6rem]">
        déja Quizzyzer ?{" "}
        <NavLink to="/register" className="text-primary font-bold" href="#">
          créer un compte
        </NavLink>
      </div>
    </main>
  );
}
