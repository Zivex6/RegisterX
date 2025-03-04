import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import '../styles/register.css';
import '../styles/globals.css';

export default function Register() {
    const [formData, setFormData] = useState({ name: "", surname: "", email: "", password: "" });
    const [errors, setErrors] = useState({ name: "", surname: "", email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setErrors({ name: "", surname: "", email: "", password: "" });
    
        let newErrors = {};
        if (!formData.name) newErrors.name = "Please enter your name.";
        if (!formData.surname) newErrors.surname = "Please enter your surname.";
        if (!formData.email) newErrors.email = "Please enter your email.";
        if (!formData.password) newErrors.password = "Please enter a password.";
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("Registration successful!");
                setFormData({ name: "", surname: "", email: "", password: "" });
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };
    

    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="description" content="Create an account on the register." />
            </Head>

            <main className="register-main">
                <div className="register-container">
                    <div className="corner-bottom-left"></div>
                    <div className="corner-bottom-right"></div>

                    <div className="title">
                        <h1>Register</h1>
                    </div>

                    <div className="inputs">
                        <form onSubmit={handleSubmit}>
                            <div className="inputs-row">
                                <div className="name-input">
                                    <label htmlFor="name">Name</label>
                                    <div className="input-icons">
                                        <i className="fas fa-user"></i>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Joe"
                                            autoComplete="off"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.name && <p className="error-message">{errors.name}</p>}
                                </div>

                                <div className="surname-input">
                                    <label htmlFor="surname">Surname</label>
                                    <div className="input-icons">
                                        <i className="fas fa-user-tag"></i>
                                        <input
                                            type="text"
                                            name="surname"
                                            placeholder="Doe"
                                            autoComplete="off"
                                            value={formData.surname}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.surname && <p className="error-message">{errors.surname}</p>}
                                </div>
                            </div>

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
                                    {errors.email && <p className="error-message">{errors.email}</p>}
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
                                    {errors.password && <p className="error-message">{errors.password}</p>}
                                </div>

                                <div className="account-create">
                                    <p>You have account?</p>
                                    <Link href="/login">Login Now</Link>
                                </div>

                                <div className="submit-button">
                                    <button type="submit">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}