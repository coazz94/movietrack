import React from "react"
import { useMovies, useShows } from "../components/dataProvider"
import "../../static/css/mediaOverview.css"
import Sidebar from "../components/Sidebar"
import { useLocation } from "react-router"

export default function MediaOverview() {
    const location = useLocation().pathname.split("/")
    const apiData = location[1] === "movies" ? useMovies() : useShows()
    const mediaData = makeCards(apiData)

    console.log(location)

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
