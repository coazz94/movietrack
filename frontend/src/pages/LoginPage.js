import React from "react"
import "../../static/css/login.css"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { BASE_URL } from "../components/DataProvider"
import { getCookie } from "../utils/util"
import { ReactSession } from "react-client-session"

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: "testuser",
        password: "Test123!",
    })

    const [errMsg, setErrMsg] = useState({
        message: "",
        state: false,
    })

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        loginUser()
    }

    function handleChange(event) {
        setFormData((prevData) => {
            return { ...prevData, [event.target.name]: event.target.value }
        })
    }

    function loginUser() {
        const csrfToken = getCookie("csrftoken")
        const requestOptions = {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify(formData),
        }

        fetch(BASE_URL + "/auth" + "/login", requestOptions).then(
            (response) => {
                if (response.ok) {
                    response
                        .json()
                        .then((data) => ReactSession.set("session_id", data)),
                        setErrMsg(() => {
                            return {
                                message: "Successfully logged in",
                                state: true,
                            }
                        })
                } else {
                    setErrMsg(() => {
                        return {
                            message: "User not found",
                            state: false,
                        }
                    })
                }
            }
        )
    }

    useEffect(() => {
        errMsg.state &&
            (console.log("Successfully logged in"),
            setTimeout(() => {
                navigate("/")
            }, 2000))
    }, [errMsg, setErrMsg])

    return (
        <div className="main-form">
            <form className="login-form" onSubmit={handleSubmit}>
                {errMsg.message !== "" && (
                    <span className={`msg ${errMsg.state && "success"}`}>
                        {errMsg.message}
                    </span>
                )}
                <h3>Login</h3>
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    // required
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    autoComplete="off"
                    // required
                />
                <button className="button-form">Login</button>
                <Link to="/register">
                    <button className="button-form">Register</button>
                </Link>
            </form>
        </div>
    )
}
