import { Link } from "react-router-dom"
import { useIsDarkMode } from "./Welcome"
import { useAuth } from "../components/Firebase"

export default function LandingPage() {
    const { isDarkMode } = useIsDarkMode()
    const { user } = useAuth()
    return (
        <div className={isDarkMode}>
            <div className="dark:text-white mb-4">
                <h1>Welcome to CoverMeGPT</h1>
            </div>
            {user ? <Link className="Link dark:text-white mt-2" to="/generate">Generate Cover Letter!</Link> :

                <div className="flex flex-col space-y-2 mt-2 w-[clamp(400px,50vw,800px)] m-auto">
                    <Link className="Link dark:text-white" to="/signin">SignUp/SignIn!</Link>
                    <Link className="Link dark:text-white" to="/guest_generate">Proceed as Guest</Link>
                </div>
            }
        </div>
    )
}