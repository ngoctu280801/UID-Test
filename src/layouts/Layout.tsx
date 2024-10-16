import { Outlet, NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

const navigators = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/products",
    title: "Products",
  },
  {
    path: "/create-product",
    title: "Create Product",
  },
];

const Layout = () => {
  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <ul className={styles.navigation}>
          {navigators.map((navigator) => (
            <li className={styles.navigation__item} key={navigator.path}>
              <NavLink
                to={navigator.path}
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                {navigator.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-10 py-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
