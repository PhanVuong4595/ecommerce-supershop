import { Outlet } from "react-router";

const LayoutAdmin = () => {
  return (
    <div>
      <header>Header Admin</header>
      <main>
        <Outlet />
      </main>
      <footer>footer Admin</footer>
    </div>
  );
};

export default LayoutAdmin;
