    import React, { useState } from "react";
    import productsData from "../data/products";

const ProductList = ({ addToCart, cartItems = []}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [popup, setPopup] = useState(null);

    const showPopup = (message) => {
        setPopup(message);
        setTimeout(() => setPopup(null), 2000);
    };
    const handleAddToCart = (product) => {
       
        addToCart(product);
        showPopup(`${product.name} added to cart!`);
    };


    const isInCart = (id) => (cartItems || []).some((item) => item.id === id);

    const filteredProducts = productsData
        .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "name-asc") return a.name.localeCompare(b.name);
        if (sortOption === "name-desc") return b.name.localeCompare(a.name);
        return 0;
        });

    return (
        <div style={styles.wrapper}>
        {popup && <div style={styles.popup}>{popup}</div>}

        <div style={styles.controls}>
            <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.search}
            />
            <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={styles.sort}
            >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            </select>
        </div>

        <div style={styles.container}>
            {filteredProducts.map((product) => {
            const added = isInCart(product.id);
            return (
                <div key={product.id} style={styles.card}>
                <img src={product.image} alt={product.name} style={styles.image} />
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                    ...styles.button,
                    background: added ? "#28a745" : "#ff9900",
                    }}
                    disabled={added}
                >
                    {added ? "Added ✓" : "Add to Cart"}
                </button>
                </div>
            );
            })}
        </div>
        </div>
    );
    };

    const styles = {
    wrapper: {
        padding: "30px",
    },
    popup: {
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "#28a745",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        zIndex: 1000,
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        fontSize: "16px",
    },
    controls: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
        gap: "15px",
        flexWrap: "wrap",
    },
    search: {
        flex: "1",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    sort: {
        width: "200px",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
    },
    card: {
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
    },
    image: {
        width: "100%",
        height: "150px",
        objectFit: "cover",
        marginBottom: "10px",
    },
    button: {
        border: "none",
        color: "white",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    };

    export default ProductList;
