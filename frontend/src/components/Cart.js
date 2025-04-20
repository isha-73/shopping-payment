import React from "react";
import { useNavigate } from "react-router-dom"; // import navigation hook

const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {
    const navigate = useNavigate(); // for redirecting
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleProceedToPayment = () => {
        // Navigate to /payment with subtotal as state
        navigate('/payment', { state: { totalAmount: subtotal } });
    };

    return (
        <div style={styles.wrapper}>
            <h2 style={styles.heading}>Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id} style={styles.item}>
                        <img src={item.image} alt={item.name} style={styles.image} />
                        <div style={styles.details}>
                            <h3 style={styles.title}>{item.name}</h3>
                            <p style={styles.inStock}>In stock</p>
                            <p><strong>Colour:</strong> {item.color || "Pep Blue"}</p>

                            <div style={styles.actions}>
                                <div style={styles.quantityControl}>
                                    <button onClick={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>−</button>
                                    <span style={styles.qty}>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>+</button>
                                </div>
                            </div>
                        </div>

                        <div style={styles.priceBlock}>
                            <p style={styles.discount}>29% off <span style={styles.limited}>Limited time deal</span></p>
                            <p style={styles.finalPrice}>${item.price.toLocaleString()}</p>
                            <p style={styles.oldPrice}>M.R.P: <s>$17,500.00</s></p>
                        </div>
                    </div>
                ))
            )}

            {cartItems.length > 0 && (
                <>
                    <div style={styles.subtotal}>
                        Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} item{cartItems.length > 1 ? "s" : ""}): <strong>${subtotal.toLocaleString()}</strong>
                    </div>

                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        <button onClick={handleProceedToPayment} style={styles.paymentButton}>
                            Proceed to Payment
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    // ... your existing styles
    wrapper: { padding: "30px", maxWidth: "1000px", margin: "auto" },
    heading: { fontSize: "28px", marginBottom: "20px" },
    item: { display: "flex", alignItems: "flex-start", borderBottom: "1px solid #ddd", paddingBottom: "20px", marginBottom: "20px" },
    image: { width: "180px", height: "180px", objectFit: "contain", marginRight: "20px" },
    details: { flex: 1 },
    title: { fontSize: "18px", marginBottom: "5px" },
    inStock: { color: "green", marginBottom: "5px" },
    actions: { marginTop: "10px", display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" },
    quantityControl: { display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "20px", padding: "5px 10px", gap: "10px" },
    qtyBtn: { border: "none", background: "transparent", fontSize: "18px", cursor: "pointer", fontWeight: "bold" },
    qty: { fontSize: "16px" },
    priceBlock: { minWidth: "140px", textAlign: "right" },
    discount: { color: "#B12704", fontWeight: "bold" },
    limited: { display: "inline-block", backgroundColor: "#fad4d4", color: "#B12704", padding: "2px 6px", fontSize: "12px", marginLeft: "5px", borderRadius: "4px" },
    finalPrice: { fontSize: "20px", fontWeight: "bold" },
    oldPrice: { fontSize: "14px", color: "#555" },
    subtotal: { fontSize: "18px", textAlign: "right", marginTop: "20px" },

    paymentButton: {
        backgroundColor: "#FF9900",
        color: "#fff",
        border: "none",
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    }
};

export default Cart;
