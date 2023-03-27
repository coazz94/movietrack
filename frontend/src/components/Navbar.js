import React from "react"
import "../../static/css/navbar.css"
import { Link } from "react-router-dom"
// import cinema_icon from "../../static/images/cinema_icon.png"

export default function Navbar() {
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
            </nav>
        </>
    )
}
