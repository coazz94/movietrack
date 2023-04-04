import React from "react"
import { BrowserRouter } from "react-router-dom"
import Navbar from "./Navbar"
import RouteManager from "./Routes"
import { DataProvider } from "./dataProvider"

export default function App() {
    return (
        <BrowserRouter>
            <DataProvider>
                <Navbar />
                <RouteManager />
            </DataProvider>
        </BrowserRouter>
    )
}
