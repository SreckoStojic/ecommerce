import './Header.css';
import React from "react";
import {
  Link
} from "react-router-dom";

function Header(props) {
    return (
        <nav>
            <ul>
                <div className="css-header-div">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                </div>
                <li>
                    <Link to="/cart">Cart ({props.totalCartCount})</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;