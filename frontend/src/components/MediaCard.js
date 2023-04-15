import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import alt_img from "../../static/images/alt_img.png"
import { NavLink } from "react-router-dom"

export default function MediaCard({ mediaData, watchers, rank }) {
    console.log(mediaData)

    return (
        <div className={rank === "top" ? "item-top" : "item-low"}>
            <NavLink to={`/movies/${"test"}`}>
                <LazyLoadImage
                    className="item-img"
                    width={"100%"}
                    height={"100%"}
                    src={mediaData.thumb_url}
                    placeholderSrc={alt_img}
                />
            </NavLink>
            <section>Test</section>
        </div>
    )
}
