import { auth } from "./Firebase"
import { signOut } from "firebase/auth"

export default function SignOutButton() {

    const handleSignOut = () => {
        signOut(auth)
    }
    return (
        <button className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
            onClick={handleSignOut}>Sign Out</button>
    )
}