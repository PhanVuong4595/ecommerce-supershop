import { Outlet } from "react-router-dom";
import Header from "../Components/HeaderAdmin/Header";

const LayoutWeb = () => {
  return (
    <div>
      <header style={{ height: "8vh" }}>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default LayoutWeb;
