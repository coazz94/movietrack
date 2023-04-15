import React from "react"
import { BrowserRouter } from "react-router-dom"
import Navbar from "./Navbar"
import RouteManager from "./Routes"
import { APIProvider } from "./DataProvider"

export default function App() {
    return (
        <BrowserRouter>
            <APIProvider>
                <Navbar />
                <RouteManager />
            </APIProvider>
        </BrowserRouter>
    )
}
