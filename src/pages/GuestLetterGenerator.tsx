import { useReducer } from "react"
import { useAuth } from "../components/Firebase"
import { getUserData } from "../components/Firebase"
import { useNavigate } from "react-router-dom"

import JobForm from "../components/JobForm"
import { action } from "../interfaces/JobFormInterfaces"
import { userSchema } from "../interfaces/UserSchema"
import { useIsDarkMode } from "./Welcome"
import { DocumentData } from "firebase/firestore"

const initialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    experience: "",
}


const profileReducer = (state: userSchema, action: action) => {
    switch (action.type) {
        case "UPDATE_DATA":
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default:
            return state;
    }
}

export default function GuestLetterGenerator() {
    const { isDarkMode } = useIsDarkMode()
    const { user } = useAuth()
    const [state, dispatch] = useReducer(profileReducer, initialState)

    const navigate = useNavigate()
    if (user !== null) {
        navigate("/generate")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(
            {
                type: "UPDATE_DATA",
                payload: {
                    name: e.target.name,
                    value: e.target.value,
                }
            }
        )
    }
    return (
        <div className={isDarkMode + " w-full"}>
            <div className='flex flex-col space-y-2 items-center w-[clamp(400px,50vw,800px)] m-auto p-2 border-[1px] bg-secondary-light dark:bg-gray-900 border-gray-400 rounded-xl'>
                <input type="text" required className="input-box w-full dark-text" placeholder="First Name" value={state.firstName} onChange={(e) => handleChange(e)} name="firstName" />
                <input type="text" required className="input-box w-full dark-text" placeholder="Last Name" value={state.lastName} onChange={(e) => handleChange(e)} name="lastName" />
                <textarea required className="input-box w-full h-40 dark-text" placeholder="Enter experiences and education! (Resume)" value={state.experience} onChange={(e) => handleChange(e)} name="experience" />
            </div>
            <div className="w-full">
                <JobForm firstName={state.firstName ?? ""} lastName={state.lastName ?? ""} phoneNumber={state.phoneNumber ?? ""}
                    email={state.email ?? ""} experience={state.experience ?? ""} />
            </div>
        </div>
    )
}