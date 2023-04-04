import React from "react"
import { useMovies } from "../components/dataProvider"
import "../../static/css/mediaOverview.css"
import Sidebar from "../components/Sidebar"

export default function MediaOverview({ title }) {
    const data = useMovies()

    console.log(data)

    const movies = data.map((movie, index) => {
        if (movie.movie.thumb_url) {
            return (
                <MovieCard
                    movieData={movie.movie}
                    watchers={movie.watchers}
                    rank={index < 3 ? "top" : "low"}
                />
            )
        }
    })

    return (
        <div className="media-overview">
            <div className="sidebar">
                <ul>
                    <li class="has-subnav">
                        <a href="#">
                            <i class="fa fa-globe fa-2x"></i>
                            <span class="nav-text">Global Surveyors</span>
                        </a>
                    </li>
                    <li class="has-subnav">
                        <a href="#">
                            <i class="fa fa-comments fa-2x"></i>
                            <span class="nav-text">Group Hub Forums</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="movie-section">{movies}</div>
        </div>
    )
}

function MovieCard({ movieData, watchers, rank }) {
    return (
        <div className={rank === "top" ? "item-top" : "item-low"}>
            <img className="item-img" src={movieData.thumb_url} />
        </div>
    )
}
