import { Outlet, Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <nav>
        <ul className={"flex"}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/create-product">Create a product</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
