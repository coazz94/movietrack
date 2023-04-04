import React from "react"
import "../../static/css/navbar.css"
import { Link, useLocation, useParams } from "react-router-dom"
// import cinema_icon from "../../static/images/cinema_icon.png"

export default function Navbar() {
    function getAuth() {
        fetch("/trakt/auth-user")
            .then((response) => response.json())
            .then((data) => window.location.replace(data.url))
    }

    // depening on the path use diffrent classes to adjust the navbar
    // for first its okay so
    const pathname = useLocation().pathname === "/" && true
    const bgColor = pathname ? "transparent" : "black"

    return (
        <>
            <nav style={{ backgroundColor: bgColor }}>
                <Link to="movies/" className="element">
                    Movies
                </Link>

                <Link to="/" className="element">
                    Home
                </Link>
                {/* <Link to="/" className="site-link">
                    <img
                        className="site-icon"
                        src="../../static/images/cinema_icon.png"
                        alt=""
                    ></img>
                </Link> */}

                <Link to="shows/" className="element">
                    Shows
                </Link>
                {/* <button onClick={() => getAuth()} style={{ margin: "50px" }}>
                    Auth
                </button> */}
            </nav>
        </>
    )
}
