import React, { useState } from "react";
import "../Style/Login.scss";
import "../Style/Button.scss";
import "./AuthForm.scss";
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="login">
            <div className="login__container">
                <div className="login__header">
                    <h2>Welcome Back</h2>
                    <p>Please enter your details to sign in</p>
                </div>

                <form onSubmit={handleSubmit} className="login__form">
                    <div className="form__group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form__group">
                        <label>Password</label>
                        <div className="password__wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                required
                            />
                            <span
                                className="toggle__icon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={showPassword ? "ri-eye-off-line toggle__icon" : "ri-eye-line toggle__icon"}></i>
                            </span>
                        </div>
                    </div>

                    <div className="form__options">
                        <label className="remember">
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <a href="/forgot-password" className="forgot">
                            Forgot password?
                        </a>
                    </div>

                    <button type="submit" className="button">
                        Sign In
                    </button>

                    <p className="register__link">
                        Don’t have an account? <a href="/register">Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;