import React, { useEffect } from "react"
import "../../static/css/navbar.css"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { BASE_URL } from "./DataProvider"
import { checkSession } from "./SessionHandler"
import { getCookie } from "../utils/util"

export default function Navbar() {
    function getAuth() {
        fetch("/trakt/auth-user")
            .then((response) => response.json())
            .then((data) => window.location.replace(data.url))
    }

    const pathname = useLocation().pathname === "/" && true
    const navigate = useNavigate()
    const auth = checkSession()

    function logOut() {
        const csrfToken = getCookie("csrftoken")
        const requestOptions = {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
        }
        fetch(BASE_URL + "/auth" + "/logout", requestOptions)
        navigate(0)
    }

    return (
        <>
            <nav className={pathname ? "nav-home" : ""}>
                <div className="navbar-elements">
                    <NavLink
                        style={({ isActive }) => ({
                            color: isActive && "#ed1c24",
                            fontWeight: isActive ? "bold" : "",
                        })}
                        to="movies/"
                        className="element"
                    >
                        Movies
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => ({
                            color: isActive && "#ed1c24",
                            fontWeight: isActive ? "bold" : "",
                        })}
                        to="/"
                        className="element"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => ({
                            color: isActive && "#ed1c24",
                        })}
                        to="shows/"
                        className="element"
                    >
                        Shows
                    </NavLink>
                </div>
                <div className="nav-user">
                    {!auth && (
                        <button className="xz" onClick={logOut}>
                            Logout
                        </button>
                    )}
                </div>
                {/* <button onClick={() => getAuth()} style={{ margin: "50px" }}>
                    Auth
                </button> */}
            </nav>
        </>
    )
}
