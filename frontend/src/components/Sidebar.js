import React from "react"
import { Link } from "react-router-dom"
import "../../static/css/sidebar.css"
import { firstLetterCapital } from "../utils/util"

export default function Sidebar({ title }) {
    return (
        <div className="sidebar">
            <h2 className="nav-title">{firstLetterCapital(title)}</h2>
            <ul>
                <li class="has-subnav">
                    <Link to="/" className="nav-link">
                        Trending
                    </Link>
                </li>
                <li class="has-subnav">
                    <Link to="/" className="nav-link">
                        Popular
                    </Link>
                </li>
                <li class="has-subnav">
                    <Link to="/" className="nav-link">
                        Recommended
                    </Link>
                </li>
                <li class="has-subnav">
                    <Link to="/" className="nav-link">
                        Watched
                    </Link>
                </li>
            </ul>
        </div>
    )
}
