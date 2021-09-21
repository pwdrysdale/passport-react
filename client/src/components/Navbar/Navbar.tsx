import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.navbarWrapper}>
            <ul className={styles.navbar}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
