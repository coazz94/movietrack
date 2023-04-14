import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import alt_img from "../../static/images/alt_img.png"

export default function MediaCard({ mediaData, watchers, rank }) {
    return (
        <div className={rank === "top" ? "item-top" : "item-low"}>
            <div>
                <LazyLoadImage
                    className="item-img"
                    width={"100%"}
                    height={"100%"}
                    src={mediaData.thumb_url}
                    placeholderSrc={alt_img}
                />
            </div>
            <section>Test</section>
        </div>
    )
}
