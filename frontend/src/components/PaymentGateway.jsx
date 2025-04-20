import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './PaymentGateway.css';

function PaymentGateway() {
    const location = useLocation();
    const totalAmount = location.state?.totalAmount || '';

    const [transactions, setTransactions] = useState([]);
    const [payment, setPayment] = useState({
        card_number: '',
        expiry_date: '',
        cvv: '',
        amount: '',
        note: ''
    });

    const [cardDetails, setCardDetails] = useState(null); // 🆕 To store fetched card details
    const [userId, setUserId] = useState(1); // 🆕 Assuming logged-in user is user_id = 1 initially

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await fetch('http://localhost:5000/transactions');
            const data = await response.json();
            setTransactions(data);
        };
        fetchTransactions();
    }, []);

    useEffect(() => {
        setPayment(prev => ({ ...prev, amount: totalAmount }));
    }, [totalAmount]);

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

    const fetchInsecureCardDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/get-card?user_id=${userId}`);
            const data = await response.json();
            setCardDetails(data);
        } catch (error) {
            console.error('Error fetching INSECURE card details:', error);
        }
    };

    const fetchSecureCardDetails = async () => {
        try {
            const response = await fetch(`https://localhost:5001/get-card?user_id=${userId}`);
            const data = await response.json();
            setCardDetails(data);
        } catch (error) {
            console.error('Error fetching SECURE card details:', error);
        }
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
                    <input
                        name="amount"
                        placeholder="Amount"
                        value={payment.amount}
                        onChange={handleChange}
                        readOnly
                    />
                    <textarea name="note" placeholder="Note (optional)" onChange={handleChange}></textarea>

                    <div className="button-group">
                        <button className="insecure" onClick={submitInsecure}>Pay (HTTP - INSECURE)</button>
                        <button className="secure" onClick={submitSecure}>Pay (HTTPS - SECURE)</button>
                    </div>
                </form>

                <div className="transaction-history">
                    <h3>Last Transactions</h3>
                    {transactions.length === 0 ? (
                        <p>No transactions found.</p>
                    ) : (
                        <ul>
                            {transactions.map((txn, index) => (
                                <li key={index}>
                                    <strong>Amount:</strong> {txn.amount} <br />
                                    <strong>Note:</strong> <span dangerouslySetInnerHTML={{ __html: txn.note }} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* 🆕 New section for Card Details */}
                <div className="card-details-section">
                    <h3>View Your Card Details</h3>
                    <div>
                        <input
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="Enter User ID"
                        />
                        <div className="button-group">
                            <button onClick={fetchInsecureCardDetails}>Fetch Card Info (INSECURE)</button>
                            <button onClick={fetchSecureCardDetails}>Fetch Card Info (SECURE)</button>
                        </div>
                    </div>

                    {cardDetails && cardDetails.length > 0 ? (
                        <div className="card-info">
                            {cardDetails.map((card, index) => (
                                <div key={index}>
                                    <p><strong>Card Number:</strong> {card.card_number}</p>
                                    <p><strong>Expiry Date:</strong> {card.expiry_date}</p>
                                    <p><strong>CVV:</strong> {card.cvv}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No card details found for this user.</p>
                    )}
                </div>


            </div>
        </div>
    );
}

export default PaymentGateway;
