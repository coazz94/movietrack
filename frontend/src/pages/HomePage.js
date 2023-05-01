import React, { useEffect, useState } from "react"
import "../../static/css/homepage.css"
import { Link, useNavigate } from "react-router-dom"
import { checkSession } from "../components/SessionHandler"

export default function Homepage() {
    // maybe a fixed one if no response
    const [bannerImg, setBanner] = useState(
        "http://assets.fanart.tv/fanart/movies/76600/movieposter/avatar-the-way-of-water-641f6bfe818e6.jpg"
    )

    useEffect(() => {
        console.log("here")
    }, [])

    return (
        <div
            className="background"
            style={{
                backgroundImage: `url(${bannerImg})`,
                backgroundSize: "cover",
            }}
        >
            <div className="banner">
                <div className="banner-section">
                    {/* <img alt="Not Found" src="img.url"></img> */}
                    <h2>MovieTrack. Manage your Favorites</h2>
                    <p className="site-info">
                        MovieTrack what you watch and when. Discover what's hot
                        and where you can watch it. Share comments, ratings and
                        recommendations.
                    </p>
                    <Link to="/register">
                        <button>JOIN MovieTrack For Free</button>
                    </Link>
                    <footer>
                        <p className="foot-text">
                            Copyright © 2023 coazz
                            <a href="https://github.com/coazz94">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                                    className="foot-img"
                                    alt="no_img"
                                    id="git_img"
                                ></img>
                            </a>
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    )
}
