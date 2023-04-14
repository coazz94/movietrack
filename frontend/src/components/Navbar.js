import React from "react"
import "../../static/css/navbar.css"
import { NavLink, useLocation, useParams } from "react-router-dom"
// import cinema_icon from "../../static/images/cinema_icon.png"

export default function Navbar() {
    function getAuth() {
        fetch("/trakt/auth-user")
            .then((response) => response.json())
            .then((data) => window.location.replace(data.url))
    }

    const pathname = useLocation().pathname === "/" && true
    // const bgColor = pathname ? "transparent" : "rgba(0,0,0,0.8)"

    return (
        <>
            <nav className={pathname ? "nav-home" : ""}>
                <NavLink
                    style={({ isActive }) => ({
                        color: isActive ? "#ed1c24" : "#fff",
                    })}
                    to="movies/"
                    className="element"
                >
                    Movies
                </NavLink>

                <NavLink
                    style={({ isActive }) => ({
                        color: isActive ? "#ed1c24" : "#fff",
                    })}
                    to="/"
                    className="element"
                >
                    Home
                </NavLink>
                {/* <NavLink to="/" className="site-link">
                    <img
                        className="site-icon"
                        src="../../static/images/cinema_icon.png"
                        alt=""
                    ></img>
                </NavLink> */}

                <NavLink
                    style={({ isActive }) => ({
                        color: isActive ? "#ed1c24" : "#fff",
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
