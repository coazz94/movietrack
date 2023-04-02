import React, { useEffect, useState } from "react"
import "../../static/css/homepage.css"
import { useMovies } from "../components/dataProvider"

export default function Homepage() {
    // maybe a fixed one if no response
    const [bannerImg, setBanner] = useState(
        "https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg"
    )

    // function setBannerImg() {}

    // useEffect(() => {}, [])

    console.log(useMovies())

    return (
        <div
            class="background"
            style={{
                backgroundImage: `url(${bannerImg})`,
                backgroundSize: "cover",
            }}
        >
            <div class="banner">
                <div class="banner-section">
                    {/* <img alt="Not Found" src="img.url"></img> */}
                    <h2>MovieTrack. Manage your Favorites</h2>
                    <p class="site-info">
                        MovieTrack what you watch and when. Discover what's hot
                        and where you can watch it. Share comments, ratings and
                        recommendations.
                    </p>
                    <button>JOIN MovieTrack For Free</button>
                    <footer>
                        <p class="foot-text">
                            Copyright © 2023 coazz
                            <a href="https://github.com/coazz94">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                                    class="foot-img"
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
