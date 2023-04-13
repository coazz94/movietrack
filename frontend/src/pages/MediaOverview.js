import React, { useEffect, useState } from "react"
import "../../static/css/mediaOverview.css"
import alt_img from "../../static/images/alt_img.png"
import { useTraktData } from "../components/dataProvider"
import Sidebar from "../components/Sidebar"
import { useLocation } from "react-router"
import { LazyLoadImage } from "react-lazy-load-image-component"

export default function MediaOverview() {
    const location = useLocation().pathname.split("/")
    const apiData = useTraktData()
    const [mediaData, setMediaData] = useState([])

    useEffect(() => {
        if (apiData.length > 0) {
            setMediaData(() => {
                return makeCards(apiData)
            })
        }
    }, [apiData])

    useEffect(() => {
        setMediaData(() => [])
    }, [location[1]])

    return (
        <>
            <Sidebar title={location[1]} />
            <div className="media-overview">
                <div className="movie-section">{mediaData}</div>
            </div>
        </>
    )
}

function MediaCard({ mediaData, watchers, rank }) {
    return (
        <div className={rank === "top" ? "item-top" : "item-low"}>
            <LazyLoadImage
                className="item-img"
                width={"100%"}
                height={"100%"}
                src={mediaData.thumb_url}
                placeholderSrc={alt_img}
            />
        </div>
    )
}

function makeCards(apiData) {
    let index = 0

    const mediaData = apiData.map((data) => {
        if (data.thumb_url) {
            index += 1
            return (
                <MediaCard
                    mediaData={data}
                    watchers={data.watchers}
                    rank={index < 3 ? "top" : "low"}
                />
            )
        }
    })

    return mediaData
}
