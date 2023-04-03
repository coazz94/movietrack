import React from "react"
import { useMovies } from "../components/dataProvider"
import "../../static/css/mediaOverview.css"

export default function MediaOverview({ title }) {
    const data = useMovies()

    console.log(data)

    return <div className="movie-section">{movies}</div>
}
