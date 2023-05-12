import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <div>
            <h1>Welcome to CoverMeGPT</h1>
            <div className="flex flex-col space-y-2 mt-2">
                <Link className="Link" to="/signin">SignUp/SignIn! Good for repeat users</Link>
                <Link className="Link" to="/generate">Proceed as Guest</Link>
            </div>
        </div>
    )
}