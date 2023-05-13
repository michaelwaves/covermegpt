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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({
            type: "UPDATE_DATA", payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const handleUpdateProfile = async () => {
        await setDoc(doc(collection(db, "users"), user?.uid), state)
    }

    return (
        <div className='flex flex-col space-y-2 items-center'>
            <input type="text" required className="input-box w-full" placeholder="First Name" value={state.firstName} onChange={(e) => handleChange(e)} name="firstName" />
            <input type="text" required className="input-box w-full" placeholder="First Name" value={state.lastName} onChange={(e) => handleChange(e)} name="lastName" />
            <input type="email" required className="input-box w-full" placeholder="Email" value={state.email} onChange={(e) => handleChange(e)} name="email" />
            <input type="phone" required className="input-box w-full" placeholder="Phone Number" value={state.phoneNumber} onChange={(e) => handleChange(e)} name="phoneNumber" />
            <textarea required className="input-box w-full" placeholder="Enter experiences and education! (Resume)" value={state.experience} onChange={(e) => handleChange(e)} name="experience" />

            <button className="bg-white dark:bg-primary dark:text-white"
                onClick={() => handleUpdateProfile()}
            >Submit Profile</button>
        </div>
    )
}