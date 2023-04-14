import React from "react"
import { NavLink } from "react-router-dom"
import "../../static/css/sidebar.css"
import { firstLetterCapital } from "../utils/util"

export default function Sidebar({ section }) {
    return (
        <div className="sidebar">
            <h2 className="nav-title">{firstLetterCapital(section)}</h2>
            <ul>
                <li class="has-subnav">
                    <NavLink
                        style={({ isActive }) => ({
                            color: isActive && "#ed1c24",
                            ":hover": "#ed1c24",
                        })}
                        end
                        to={`/${section}/trending`}
                        className="nav-link"
                    >
                        Trending
                    </NavLink>
                </li>
                <li class="has-subnav">
                    <NavLink
                        style={({ isActive }) => ({
                            color: isActive && "#ed1c24",
                            ":hover": "#ed1c24",
                        })}
                        to={`/${section}/popular`}
                        end
                        className="nav-link"
                    >
                        Popular
                    </NavLink>
                </li>
                <li class="has-subnav">
                    {/* <NavLink to={`/${section}/recommended`} className="nav-link"></NavLink> */}
                    <NavLink to="/" className="nav-link">
                        Recommended
                    </NavLink>
                </li>
                <li class="has-subnav">
                    {/* <NavLink to={`/${section}/watched`} className="nav-link"></NavLink> */}
                    <NavLink to="/" className="nav-link">
                        Watched
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
