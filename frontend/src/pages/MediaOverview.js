import React from "react"
import { useMovies } from "../components/dataProvider"
import "../../static/css/mediaOverview.css"

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
                <div>Test</div>
                <div>Test</div>
                <div>Test</div>
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
