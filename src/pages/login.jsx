import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import '../styles/login.css';
import '../styles/globals.css';

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");

        if (!formData.email || !formData.password) {
            setErrorMessage("Please enter both email and password.");
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <Head>
                <title>RegisterX</title>
            </Head>

            <main className="login-main">
                <div className="login-container">
                    <div className="corner-bottom-left"></div>
                    <div className="corner-bottom-right"></div>

                    <div className="title">
                        <h1>Login</h1>
                    </div>

                    <div className="inputs">
                        <form onSubmit={handleSubmit}>
                            <div className="inputs-col">
                                <div className="email-input">
                                    <label htmlFor="email">E-mail</label>
                                    <div className="input-icons">
                                        <i className="fas fa-envelope"></i>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="joe.doe@example.com"
                                            autoComplete="off"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="password-input">
                                    <label htmlFor="password">Password</label>
                                    <div className="input-icons">
                                        <i className="fas fa-lock"></i>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="********"
                                            autoComplete="off"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="account-create">
                                    <p>You don't have an account?</p>
                                    <Link href="/register">Create now!</Link>
                                </div>

                                <div className="submit-button">
                                    <button type="submit">Send</button>
                                </div>

                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}