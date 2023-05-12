import NavBar from "../components/Navbar"
import DarkModeButton from "../components/DarkModeButton"

import { useState } from "react"
import { Outlet, useOutletContext } from "react-router-dom"

type ContextType = {
    isDarkMode: string,
    setIsDarkMode: () => void,
}

export default function Welcome(): JSX.Element {
    const [isDarkMode, setIsDarkMode] = useState<string>("")


    return (
        <div className="">
            <NavBar isDarkMode={isDarkMode}></NavBar>
            <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <Outlet context={{ isDarkMode, setIsDarkMode }} />
        </div >
    )
}

export function useIsDarkMode() {
    return useOutletContext<ContextType>();
}