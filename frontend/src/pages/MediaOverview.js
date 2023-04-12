import React, { useEffect, useState } from "react"
import { useTraktData } from "../components/dataProvider"
import "../../static/css/mediaOverview.css"
import Sidebar from "../components/Sidebar"
import { useLocation } from "react-router"

export default function MediaOverview() {
    const location = useLocation().pathname.split("/")
    const apiData = useTraktData()
    const [mediaData, setMediaData] = useState([])

    useEffect(() => {
        setMediaData(() => {
            return makeCards(apiData)
        })
    }, [apiData])

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
            {/* <img className="item-img" src={mediaData.thumb_url} alt="TEST" /> */}
            <img
                className="item-img"
                src={
                    "https://trakt.tv/assets/placeholders/thumb/fanart-9cd40e422405c1b23680f7103ccd7601e8b5dc8c468d1f7f8073a1cdaa951c5b.png"
                }
                alt="TEST"
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
