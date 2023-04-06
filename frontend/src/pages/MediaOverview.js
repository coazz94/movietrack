import React from "react"
import { useMedia } from "../components/dataProvider"
import "../../static/css/mediaOverview.css"
import Sidebar from "../components/Sidebar"
import { useLocation } from "react-router"

export default function MediaOverview({ title }) {
    const apiData = useMedia()
    const mediaData = makeCards(apiData)
    const location = useLocation().pathname.split("/")

    // Change this to a function, critical is that it is now movie, it should be adaptable

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
            <img className="item-img" src={mediaData.thumb_url} />
        </div>
    )
}

function makeCards(apiData) {
    let index = 0
    const mediaData = apiData.map((movie) => {
        if (movie.movie.thumb_url) {
            index += 1
            return (
                <MediaCard
                    mediaData={movie.movie}
                    watchers={movie.watchers}
                    rank={index < 3 ? "top" : "low"}
                />
            )
        }
    })

    return mediaData
}
