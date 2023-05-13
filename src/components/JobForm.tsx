import { useReducer } from "react"

import { jobForm, action } from "../interfaces/JobFormInterfaces"
import { Profile } from "../interfaces/ProfileInterface"
import OpenAI from "./OpenAI"

const JobReducer = (state: jobForm, action: action) => {
    switch (action.type) {
        case "UPDATE_DATA":
            return ({
                ...state,
                [action.payload.name]: action.payload.value
            })
        default:
            return (state)
    }
}
const initialState = {
    jobTitle: "",
    jobCompany: "",
    jobDescription: "",
}

export default function JobForm({ firstName, lastName, email, phoneNumber, experience }: Profile) {
    const [jobState, dispatch] = useReducer(JobReducer, initialState)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({
            type: "UPDATE_DATA",
            payload: {
                name: e.target.name,
                value: e.target.value,
            }
        })
        //console.log(firstName, lastName, experience)
    }
    return (
        <>
            <div className="flex flex-col md:flex-row w-full h-full dark:text-white">
                <div className="flex flex-col space-y-2 p-2 input-box bg-secondary-light dark:bg-gray-900 transition-75 w-full md:w-1/2">
                    <div className="flex flex-row space-x-2 p-2">
                        <input type="text" value={jobState.jobTitle} name="jobTitle" placeholder="Position"
                            onChange={(e) => handleChange(e)} className="input-box dark:bg-primary dark:placeholder-white w-1/2" />
                        <input type="text" value={jobState.jobCompany} name="jobCompany" placeholder="Company"
                            onChange={(e) => handleChange(e)} className="input-box dark:bg-primary dark:placeholder-white w-1/2" />
                    </div>
                    <textarea value={jobState.jobDescription} name="jobDescription" placeholder="Job Requirements"
                        onChange={(e) => handleChange(e)} className="input-box text-area dark:text-white" />
                </div>
                <OpenAI jobCompany={jobState.jobCompany} jobTitle={jobState.jobTitle} jobDescription={jobState.jobCompany}
                    firstName={firstName} lastName={lastName} experience={experience} />

            </div>


        </>
    )
}