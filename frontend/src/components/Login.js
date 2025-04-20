import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5002/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                const data = await res.json();
                document.cookie = `sessionId=${Math.random().toString(36).substring(2)}; path=/`;
                document.cookie = `authToken=securetoken123; path=/`;
                document.cookie = `userId=${data.userId}; path=/`;

                setUser(data.username); 

                alert('Login successful!');
                navigate('/');
            } else {
                alert('Invalid username or password');
            }
        } catch (err) {
            console.error(err);
            alert('Error logging in');
        }
    };


    return (
        <div style={{ padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /><br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
