import React, { useEffect, useState } from "react"
import "../../static/css/mediaPage.css"
import { useLocation } from "react-router"
import { BASE_URL } from "../components/DataProvider"

export default function MediaPage() {
    const location = useLocation().pathname.split("/")

    const [mediaData, setMediaData] = useState([])

    function getMediaInfo(slug, mediaType) {
        fetch(
            BASE_URL +
                "/trakt/get-media-data" +
                `?type=${mediaType}&slug=${slug}`
        )
            .then((response) => response.json())
            .then((data) => setMediaData(() => data))
    }

    useEffect(() => {
        getMediaInfo(location[2], location[1])
    }, [])

    console.log(mediaData)

    return (
        <>
            <h1>{mediaData.length > 0 ? mediaData.title : "test"}</h1>
        </>
    )
}
