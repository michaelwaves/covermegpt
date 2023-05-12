import { Link } from "react-router-dom"
import { useIsDarkMode } from "./Welcome"

export default function LandingPage() {
    const {isDarkMode} = useIsDarkMode()
    return (
        <div className={isDarkMode}>
            <div className="dark:text-white">
            <h1>Welcome to CoverMeGPT</h1>
            </div>
            <div className="flex flex-col space-y-2 mt-2 w-[clamp(400px,50vw,800px)] m-auto">
                <Link className="Link dark:text-white" to="/signin">SignUp/SignIn!</Link>
                <Link className="Link dark:text-white" to="/generate">Proceed as Guest</Link>
            </div>
        </div>
    )
}