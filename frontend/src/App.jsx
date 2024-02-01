import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import NavBar from "./components/NavBar";

function App() {
  const [auth, setAuth] = useState();
  console.log("App.jsx", auth);
  return (
    <>
      <NavBar auth={auth} setAuth={setAuth} />
      <Outlet context={{ auth, setAuth }} />
    </>
  );
}

export default App;
