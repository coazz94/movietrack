import React from "react"
import "../../static/css/navbar.css"
import { Link } from "react-router-dom"
// import cinema_icon from "../../static/images/cinema_icon.png"

export default function Navbar() {
    function getAuth() {
        fetch("/trakt/auth-user")
            .then((response) => response.json())
            .then((data) => window.location.replace(data.url))
    }

    return (
        <>
            <nav>
                <Link to="movies/" className="element">
                    Movies
                </Link>

                <Link to="/" className="site-link">
                    <img
                        className="site-icon"
                        src="../../static/images/cinema_icon.png"
                        alt=""
                    ></img>
                </Link>

                <Link to="shows/" className="element">
                    Shows
                </Link>
                <button onClick={() => getAuth()} style={{ margin: "50px" }}>
                    Auth
                </button>
            </nav>
        </>
    )
}
