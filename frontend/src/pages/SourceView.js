import React from "react"
import { useMovies } from "../components/dataProvider"

export default function SourceView({ title }) {
    console.log(useMovies())

    return (
        <>
            <h1>SourceView : {title}</h1>
        </>
    )
}
