import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Welcome from "./pages/Welcome"
import LandingPage from "./pages/LandingPage"
import ProfilePage from "./pages/ProfilePage"
import SigninPage from "./pages/SigninPage"
import LetterGenerator from "./pages/LetterGenerator"
import SetupProfile from "./components/SetupProfile"
import GuestLetterGenerator from "./pages/GuestLetterGenerator"
import ContactPage from "./pages/ContactPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />,
        children: [
            {
                path: "/",
                element: <LandingPage />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path: "/signin",
                element: <SigninPage />
            },
            {
                path: "/generate",
                element: <LetterGenerator />
            },
            {
                path: "/setup_profile",
                element: <SetupProfile />
            },
            {
                path: "/guest_generate",
                element: <GuestLetterGenerator />
            },
            {
                path: "/contact",
                element: <ContactPage />
            }
        ]
    }
]
)

export default function Routes() {
    return (
        <RouterProvider router={router} />
    )
}