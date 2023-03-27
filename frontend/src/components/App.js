import React from "react"
import { BrowserRouter } from "react-router-dom"
import Navbar from "./Navbar"
import RouteManager from "./Routes"

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <RouteManager />
        </BrowserRouter>
    )
}
