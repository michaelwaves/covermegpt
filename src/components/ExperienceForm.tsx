import { useEffect, useReducer } from "react"
import { experienceForm } from "../interfaces/ExperienceFormInterface"
import { action } from "../interfaces/JobFormInterfaces"

import { getUserData } from "./Firebase"

const initialExperience = {
    firstName: "",
    lastName: "",
    experience: ""
}



const ExperienceReducer = (state: experienceForm, action: action) => {
    switch (action.type) {
        case "UPDATE_DATA":
            return ({
                ...state,
                [action.payload.name]: action.payload.value
            })
        default:
            return state
    }

}

export default function ExperienceForm() {
    useEffect(() => {
        const data = getUserData()
    })
    const [profileState, dispatch] = useReducer(ExperienceReducer, initialExperience)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "UPDATE_DATA",
            payload: {
                name: e.target.name,
                value: e.target.value,
            }
        })
    }

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-row space-x-2 p-2">
                <input type="text" value={profileState.firstName} name="firstName" placeholder="First Name"
                    onChange={(e) => handleChange(e)} />
                <input type="text" value={profileState.lastName} name="lastName" placeholder="Last Name"
                    onChange={(e) => handleChange(e)} />
            </div>
            <input type="text" value={profileState.experience} name="experience" placeholder="Experience"
                onChange={(e) => handleChange(e)} />
        </div>
    )
}