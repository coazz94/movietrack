import React from "react"
import "../../static/css/login.css"

export default function LoginPage() {
    return (
        <div className="login-main disabled">
            <form className="login-form">
                <h3>Login Here</h3>

                <input type="email" placeholder="Email" id="email" />

                <input type="password" placeholder="Password" id="password" />

                <button className="button-register">Login</button>
                <button className="button-register">Register</button>
            </form>
            <form className="register-form">
                <h3>Welcome to MovieTrack</h3>

                <input type="text" placeholder="Email" id="email" />

                <input type="text" placeholder="Username" id="username" />

                <input type="password" placeholder="Password" id="password" />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirm_password"
                />

                <button className="button-register">Join MovieTrack</button>
            </form>
        </div>
    )
}
