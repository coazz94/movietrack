import React from "react"
import { useMovies } from "../components/dataProvider"
import "../../static/css/mediaOverview.css"

export default function MediaOverview({ title }) {
    const data = useMovies()

    console.log(data)

    const movies = data.map((movie, index) => {
        return (
            <MovieCard
                movieData={movie.movie}
                watchers={movie.watchers}
                rank={index < 2 ? "top" : "low"}
            />
        )
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
        <div className={rank === "top" ? "top-item" : "low-item"}>
            {/* <div>{movieData.title}</div> */}
            {/* <div>{movieData.poster_url}</div> */}
            {/* <div>{watchers}</div> */}
        </div>
    )
}
