import React from "react"
import "../../static/css/navbar.css"
import { NavLink, useLocation, useParams } from "react-router-dom"

export default function Navbar() {
    const disabled = false

    function getAuth() {
        fetch("/trakt/auth-user")
            .then((response) => response.json())
            .then((data) => window.location.replace(data.url))
    }

    const pathname = useLocation().pathname === "/" && true

    if (disabled) {
        return <></>
    }

    return (
        <>
            <nav className={pathname ? "nav-home" : ""}>
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
                {/* <button onClick={() => getAuth()} style={{ margin: "50px" }}>
                    Auth
                </button> */}
            </nav>
        </>
    )
}
