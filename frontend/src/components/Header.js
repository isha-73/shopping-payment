import React from "react";
import { Link } from "react-router-dom";

const Header = ({ cartCount, user }) => {
    return (
        <header style={styles.header}>
            <Link to="/" style={styles.logo}>🛍️ <span style={styles.logoText}>ShopEasy</span></Link>
            <nav style={styles.nav}>
                <Link to="/cart" style={styles.navLink}>🛒 Cart ({cartCount})</Link>

                {/* {user ? (
                    <span style={styles.navLink}>👤 {user}</span> // show username
                ) : (
                    <Link to="/login" style={styles.navLink}>👤 Sign In</Link> // show Sign In if no user
                )} */}
            </nav>
        </header>
    );
};

const styles = {
    header: {
        background: "#232f3e",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
    },
    logo: {
        textDecoration: "none",
        color: "white",
        fontSize: "1.8rem",
        fontWeight: "bold",
    },
    logoText: {
        fontSize: "1.8rem",
    },
    nav: {
        display: "flex",
        gap: "20px",
    },
    navLink: {
        color: "white",
        textDecoration: "none",
        fontSize: "1rem",
        transition: "opacity 0.3s",
    },
};

export default Header;
