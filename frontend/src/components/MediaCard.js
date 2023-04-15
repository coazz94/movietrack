import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import alt_img from "../../static/images/alt_img.png"
import { Link, useLocation } from "react-router-dom"

export default function MediaCard({ mediaData, watchers, rank }) {
    const mediaType = useLocation().pathname.split("/")[1]
    return (
        <div className={rank === "top" ? "item-top" : "item-low"}>
            <Link to={`/${mediaType}/${mediaData.slug}`}>
                <LazyLoadImage
                    className="item-img"
                    width={"100%"}
                    height={"100%"}
                    src={mediaData.thumb_url}
                    placeholderSrc={alt_img}
                />
            </Link>
            <section>Test</section>
        </div>
    )
}
