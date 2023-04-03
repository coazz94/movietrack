import React from "react"
import { useMovies } from "../components/dataProvider"
import "../../static/css/mediaOverview.css"

export default function SourceView({ title }) {
    return (
        <>
            <div class="grid-section">
                <div class="grid">
                    <div class="grid-first">TOP MOVIE</div>
                    <div class="grid-second">TOP MOVIE</div>
                </div>
                <div class="grid-2">
                    <div class="grid-element">TOP MOVIE</div>
                    <div class="grid-element">TOP MOVIE</div>
                    <div class="grid-element">TOP MOVIE</div>
                    <div class="grid-element">TOP MOVIE</div>
                    <div class="grid-element">TOP MOVIE</div>
                    <div class="grid-element">TOP MOVIE</div>
                </div>
            </div>
        </>
    )
}
