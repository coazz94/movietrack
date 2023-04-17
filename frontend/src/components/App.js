import React from "react"
import { BrowserRouter } from "react-router-dom"
import Navbar from "./Navbar"
import RouteManager from "./Routes"
import { APIProvider } from "./DataProvider"
import { NavbarHandler } from "./NavHandler"

export default function App() {
    return (
        <BrowserRouter>
            <APIProvider>
                <NavbarHandler>
                    <Navbar />
                </NavbarHandler>
                <RouteManager />
            </APIProvider>
        </BrowserRouter>
    )
}
