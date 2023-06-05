import { Routes, Route } from "react-router-dom";
import "./App.css";

import LayoutWeb from "./Layout/LayoutWeb";
import HomePage from "./Page/Web/HomePage";
import Login from "./Page/Auth/Login";
import Registration from "./Page/Auth/Registration";

import LayoutAdmin from "./Layout/LayoutAdmin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWeb />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route />
        </Route>
      </Routes>
    </>
  );
}

export default App;
