import { useReducer, useState, useEffect } from "react"
import { db, useAuth } from "./Firebase"
import { DocumentData, collection, doc } from "firebase/firestore"
import { getUserData } from "./Firebase"
import { userSchema } from "../interfaces/UserSchema"
import { setDoc } from "firebase/firestore"


export default function EditProfile() {
    const { user } = useAuth()
    const [userData, setUserData] = useState<DocumentData | null>()
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const data = await getUserData(user.uid)
                // Transform the data to match the userSchema interface
                const transformedData: userSchema = {
                    firstName: data?.firstName || '',
                    lastName: data?.lastName || '',
                    phoneNumber: data?.phoneNumber || '',
                    email: data?.email || '',
                    experience: data?.experience || '',
                };

                setUserData(transformedData)
                dispatch({ type: "SET_INITIAL_DATA", payload: transformedData })
            } else {
                setUserData(null)
            }

        }
        fetchData()

    }, [user])


    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: "",
        experience: "",
    }

    const profileReducer = (state: userSchema, action: any) => {
        switch (action.type) {
            case "SET_INITIAL_DATA":
                return action.payload
            case "UPDATE_DATA":
                return {
                    ...state,
                    [action.payload.name]: action.payload.value
                }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(profileReducer, initialState)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const check = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({
            type: "UPDATE_DATA", payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
        if (updateSuccess) {
            setUpdateSuccess(false)
        }
    }



    const handleUpdateProfile = async () => {
        try {
            await setDoc(doc(collection(db, "users"), user?.uid), state)
            setUpdateSuccess(true)
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <div className='flex flex-col space-y-2 items-center w-[clamp(400px,50vw,800px)] m-auto p-2 border-[1px] bg-secondary-light dark:bg-gray-900 border-gray-400 rounded-xl'>
            <input type="text" required className="input-box w-full dark-text" placeholder="First Name" value={state.firstName} onChange={(e) => handleChange(e)} name="firstName" />
            <input type="text" required className="input-box w-full dark-text" placeholder="Last Name" value={state.lastName} onChange={(e) => handleChange(e)} name="lastName" />
            <input type="email" required className="input-box w-full dark-text" placeholder="Email" value={state.email} onChange={(e) => handleChange(e)} name="email" />
            <input type="phone" required className="input-box w-full dark-text" placeholder="Phone Number" value={state.phoneNumber} onChange={(e) => handleChange(e)} name="phoneNumber" />
            <textarea required className="input-box w-full h-40 dark-text" placeholder="Enter experiences and education! (Resume)" value={state.experience} onChange={(e) => handleChange(e)} name="experience" />

            <button className="bg-white dark:bg-primary dark:text-white"
                onClick={() => handleUpdateProfile()}
            >Update Profile</button>
            {updateSuccess &&
                <div className="flex flex-row space-x-2 justify-center items-center dark:text-white">
                    {check}
                    <h2>Update success!</h2>

                </div>
            }
        </div>
    )
}