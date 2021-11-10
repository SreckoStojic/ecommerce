import styles from './Header.module.css';
import {
  Link
} from "react-router-dom";

function Header({totalCartCount}) {
    return (
        <nav>
            <ul>
                <div className={styles['header-div']}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                </div>
                <li>
                    <Link to="/cart">Cart ({totalCartCount})</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;