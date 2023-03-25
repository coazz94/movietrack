import React from "react"
import { BrowserRouter } from "react-router-dom"
import RouteManager from "./Routes"

export default function App() {
    return (
        <BrowserRouter>
            <RouteManager />
        </BrowserRouter>
    )
}
