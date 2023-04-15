import React, { useEffect, useState } from "react"
import "../../static/css/mediaOverview.css"
import { useTraktData } from "../components/DataProvider"
import Sidebar from "../components/Sidebar"
import MediaCard from "../components/MediaCard"
import { useLocation } from "react-router"

export default function MediaOverview() {
    const location = useLocation().pathname.split("/")
    const apiData = useTraktData()
    const [mediaData, setMediaData] = useState([])

    // add feature to catch the api only when the Path changes, so reloading trending should not call again the api
    useEffect(() => {
        if (apiData.length > 0) {
            setMediaData(() => {
                return makeCards(apiData)
            })
        }
    }, [apiData])

    useEffect(() => {
        setMediaData(() => [])
    }, [location[0], location[1], location[2]])

    return (
        <>
            <Sidebar section={location[1]} />
            <div className="media-overview">
                <div className="movie-section">{mediaData}</div>
            </div>
        </>
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
