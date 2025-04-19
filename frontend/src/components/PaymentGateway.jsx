import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import './PaymentGateway.css'; // Import the CSS

function PaymentGateway() {
    const [payment, setPayment] = useState({
        card_number: '',
        expiry_date: '',
        cvv: '',
        amount: '',
        note: ''
    });

    const handleChange = (e) => {
        setPayment({
            ...payment,
            [e.target.name]: e.target.value
        });
    };

    const submitInsecure = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:5000/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payment)
        });
        alert('Payment Done (INSECURE)');
    };

    const submitSecure = async (e) => {
        e.preventDefault();
        const safeNote = DOMPurify.sanitize(payment.note);
        await fetch('https://localhost:5001/secure-pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payment, note: safeNote })
        });
        alert('Payment Done (SECURE)');
    };

    return (
        <div className="payment-container">
            <div className="payment-card">
                <h2>AsurePay</h2>
                <h4>AsurePay is the payment gateway which makes your online payment easy and safe !!!</h4>
                <form>
                    <input name="card_number" placeholder="Card Number" onChange={handleChange} />
                    <input name="expiry_date" placeholder="Expiry Date (MM/YY)" onChange={handleChange} />
                    <input name="cvv" placeholder="CVV" onChange={handleChange} />
                    <input name="amount" placeholder="Amount" onChange={handleChange} />
                    <textarea name="note" placeholder="Note (optional)" onChange={handleChange}></textarea>

                    <div className="button-group">
                        <button className="insecure" onClick={submitInsecure}>Pay (HTTP - INSECURE)</button>
                        <button className="secure" onClick={submitSecure}>Pay (HTTPS - SECURE)</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PaymentGateway;
