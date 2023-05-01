import React, { useEffect } from "react"
import "../../static/css/login.css"
import { useState } from "react"
import { BASE_URL } from "../components/DataProvider"
import { getCookie } from "../utils/util"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { checkSession } from "../components/SessionHandler"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        re_password: "",
    })
    const [errMsg, setErrMsg] = useState({
        message: "",
        state: false,
    })
    const navigate = useNavigate()
    const auth = checkSession()

    function handleChange(event) {
        setFormData((prevData) => {
            return { ...prevData, [event.target.name]: event.target.value }
        })
    }

    // add more checks here if desired, current one is just matching
    function CheckPasswordMatch(data) {
        return data.password === data.re_password ? true : false
    }

    function handleSubmit(event) {
        event.preventDefault()
        CheckPasswordMatch(formData) ? registerUser() : console.log("false")
    }

    function registerUser() {
        const csrfToken = getCookie("csrftoken")
        const requestOptions = {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify(formData),
        }

        fetch(BASE_URL + "/auth" + "/register", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setErrMsg((prevData) => {
                        return {
                            ...prevData,
                            state: true,
                        }
                    })
                }
                return response.json()
            })
            .then((data) =>
                setErrMsg((prevData) => {
                    return {
                        ...prevData,
                        message: JSON.stringify(data).replace("{", ""),
                    }
                })
            )
    }

    function loginNewUser() {
        const csrfToken = getCookie("csrftoken")
        const requestOptions = {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify(formData),
        }

        fetch(BASE_URL + "/auth" + "/login", requestOptions)
    }

    useEffect(() => {
        errMsg.state &&
            (console.log("Successful you will be logged in and redirected"),
            loginNewUser(),
            setTimeout(() => {
                navigate("/")
            }, 3000))
    }, [errMsg])

    useEffect(() => {
        if (auth) {
            navigate("/")
        }
    }, [auth])

    return (
        <div className="main-form">
            <form className="register-form" onSubmit={handleSubmit}>
                {errMsg.message !== "" && (
                    <span className={`msg ${errMsg.state && "success"}`}>
                        {errMsg.message}
                    </span>
                )}
                <h3>Welcome to MovieTrack</h3>
                <input
                    type="email"
                    placeholder="E-mail"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm your Password"
                    id="re_password"
                    name="re_password"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                />
                <button className="button-form">Join MovieTrack</button>
                <Link to="/login">
                    <button className="button-form">Login</button>
                </Link>
            </form>
        </div>
    )
}
