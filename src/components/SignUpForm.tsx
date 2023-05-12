import { motion } from "framer-motion"
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, collection, setDoc } from "firebase/firestore";
import { auth, db } from "./Firebase";

export default function SignUpForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            if (user) {
                const userRef = doc(collection(db, 'users'), user.uid);

                await setDoc(userRef, {
                    firstName,
                    lastName,
                    email,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <motion.div className='flex flex-col space-y-2 items-center' animate={{
            scaleY: 1,
            transition: {
                duration: 0.3,
            },

        }} initial={{
            scaleY: 0.8,

        }}>
            <div className="flex flex-row space-x-2 w-full">
                <motion.div className="w-1/2" animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.3,
                    }
                }}
                    initial={{
                        y: 20,
                        opacity: 0.5
                    }}>
                    <input type="text" className="input-box w-full" placeholder="First Name"
                        value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </motion.div>
                <motion.div className="w-1/2"
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                        }
                    }}
                    initial={{
                        y: 20,
                        opacity: 0.5
                    }}>
                    <input type="text" className="input-box w-full" placeholder="Last Name"
                        value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </motion.div>
            </div>
            <input type="text" className="input-box w-full" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" className="input-box w-full" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-white dark:bg-primary dark:text-white"
                onClick={(e) => handleSignUp(e)}
            >Sign Up!</button>
        </motion.div>
    )
}