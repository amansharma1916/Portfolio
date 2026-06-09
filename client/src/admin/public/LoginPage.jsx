import "./LoginPage.css";
import { useState } from "react";
import { login } from "../../services/auth.service";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        login(formData.email, formData.password)
            .then((data) => {
                console.log("Login successful:", data);
                setMessage("Login successful!");
                localStorage.setItem("adminToken", data.token);
                localStorage.setItem("adminInfo", JSON.stringify(data.admin));
            })
            .catch((error) => {
                console.error("Login failed:", error);
                setMessage((error.response?.data?.message || ""));
            });
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Admin Login</h1>
                <p>Sign in to access the dashboard</p>
                {message && <p className="message">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;