import React, { useEffect, useState } from "react"
import "../../static/css/mediaPage.css"
import { useLocation } from "react-router"
import { BASE_URL } from "../components/DataProvider"
import Loading from "../components/loading"

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

    if (!mediaData) {
        return <Loading />
    }

    console.log(mediaData)

    return (
        <div className="media-site">
            <img
                className="thumb-img"
                src={mediaData["thumb_url"]}
                alt="test"
            />
            <div className="media-basics">
                <div className="media-title">{mediaData.title}</div>
                <div className="media-basic-info">
                    <div>infoa</div>
                    <div>infob</div>
                    <div>infoc</div>
                    <div>infod</div>
                </div>
            </div>
            <div className="media-info">
                <div className="media-side">
                    <img src="https://walter.trakt.tv/images/movies/000/056/580/posters/thumb/ef9d678e06.jpg.webp" />
                </div>
                <div className="media-data">
                    <ul className="media-additional-data">
                        <li>
                            <label>Released</label>
                            <span
                                className="format-date"
                                data-date="2022-12-16"
                                data-format="LL"
                            >
                                December 16, 2022
                            </span>
                        </li>
                        <li>
                            <label>Runtime</label>
                            <span className="runtime" data-full-minutes="192m">
                                <span>3</span>h <span>12</span>m
                            </span>
                        </li>
                        <li>
                            <label>Director</label>
                            <a>James Cameron</a>
                        </li>

                        <li>
                            <label>Language</label>English
                        </li>
                        <li>
                            <label>Genres</label>
                            <span itemprop="genre">Action</span>,
                        </li>
                    </ul>
                    <span>{mediaData.overview}</span>
                </div>
            </div>
        </div>
    )
}
