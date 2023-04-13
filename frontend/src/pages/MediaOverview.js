import React, { useEffect, useState } from "react"
import { useTraktData } from "../components/dataProvider"
import "../../static/css/mediaOverview.css"
import Sidebar from "../components/Sidebar"
import { useLocation } from "react-router"
import alt_img from "../../static/images/alt_img.png"

export default function MediaOverview() {
    const location = useLocation().pathname.split("/")
    const apiData = useTraktData()
    const [mediaData, setMediaData] = useState([])

    // use display and block for showing the img over the normal img

    useEffect(() => {
        if (apiData.length > 0) {
            setMediaData(() => {
                return makeCards(apiData)
            })
        }
    }, [apiData])

    return (
        <>
            <Sidebar title={location[1]} />
            <div className="media-overview">
                <div className="movie-section">
                    {apiData.length > 0 ? (
                        mediaData
                    ) : (
                        <>
                            <MediaCard rank="top" />
                            <MediaCard rank="top" />
                            <MediaCard />
                            <MediaCard />
                            <MediaCard />
                            <MediaCard />
                            <MediaCard />
                            <MediaCard />
                        </>
                    )}
                </div>
                {/* <div className="movie-section">{mediaData}</div> */}
                {/* {mediaData} */}
            </div>
        </>
    )
}

function MediaCard({ mediaData, watchers, rank }) {
    return (
        <div className={rank === "top" ? "item-top" : "item-low"}>
            <img
                className="item-img"
                src={mediaData ? mediaData.thumb_url : alt_img}
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

    // return <div className="movie-section">{mediaData}</div>
    return mediaData
}
