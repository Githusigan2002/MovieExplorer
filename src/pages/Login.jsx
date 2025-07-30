import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mock login logic — replace with real auth later
        if (form.email === "admin@example.com" && form.password === "admin123") {
            alert("Login successful!");
            navigate("/"); // redirect to home page
        } else {
            alert("Invalid credentials.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h4 className="mb-4 text-center">Login to MovieExplorer</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter password"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>

                <p className="text-center mt-3 small">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};
