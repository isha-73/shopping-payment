    import React from "react";

    const OrderSummary = ({ cartItems }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div style={styles.container}>
        <h2>Order Summary</h2>
        <ul style={styles.list}>
            {cartItems.map((item, i) => (
            <li key={i}>{item.name} - ${item.price.toFixed(2)}</li>
            ))}
        </ul>
        <h3>Total: ${total.toFixed(2)}</h3>
        <p style={styles.note}>🧾 This is a mock checkout – no real payment is processed.</p>
        </div>
    );
    };

    const styles = {
    container: {
        padding: "30px",
        textAlign: "center",
    },
    list: {
        listStyle: "none",
        padding: 0,
        marginBottom: "20px",
    },
    note: {
        marginTop: "20px",
        fontStyle: "italic",
        color: "#777",
    },
    };

    export default OrderSummary;
