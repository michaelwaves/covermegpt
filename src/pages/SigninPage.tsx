import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';

import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

import { useIsDarkMode } from './Welcome';
import { auth, useAuth } from '../components/Firebase';
import { useNavigate } from 'react-router-dom';

export default function SigninPage() {
    const [isSignIn, setIsSignIn] = useState(true);
    const { isDarkMode } = useIsDarkMode()
    const { user } = useAuth()
    const navigate = useNavigate()

    if (user != null) {

        isSignIn ? navigate("/generate") : navigate("/setup_profile")
    }


    const toggleSignIn = () => {
        setIsSignIn(!isSignIn);
    };

    const handleSignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider).then((result) => {
                if (!result) {
                    throw new Error("Signin Failed")
                }
                const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
                if (isNewUser) {
                    navigate('/setup_profile');
                } else {
                    navigate('/generate');
                }
            })
            // Handle successful sign-in
        } catch (error) {
            // Handle sign-in error
            console.error('Error signing in with Google:', error);
        }
    };
    return (
        <div className={isDarkMode}>
            <div className='flex flex-col w-[clamp(300px,50vw,800px)] mx-auto space-y-4 border-2 border-gray-400 p-4 rounded-lg dark:bg-gray-900 bg-secondary-light'>
                <div className='w-full flex flex-col items-center'>
                    <div className='flex flex-row space-x-2 mx-auto mb-4 dark:text-white'>
                        <div className={`transition-all duration-75 cursor-pointer ${isSignIn ? "scale-110" : "scale-100"}`}
                            onClick={() => setIsSignIn(true)}
                        >
                            <h2>Sign In</h2>
                        </div>
                        <div className='w-1 bg-gray-400'></div>
                        <div className={`transition-all duration-75 cursor-pointer ${!isSignIn ? "scale-110" : "scale-100"}`}
                            onClick={() => setIsSignIn(false)}
                        >
                            <h2>Sign Up</h2>
                        </div>

                    </div>
                    <motion.div
                        className="toggle mx-auto bg-white dark:bg-primary"
                        onClick={toggleSignIn}
                        style={{
                            display: 'flex',
                            justifyContent: isSignIn ? 'flex-start' : 'flex-end',
                            transition: 'justify-content 50ms ease-in',
                        }}
                    >
                        <motion.div
                            className="handle bg-gray-400"
                            style={{
                                width: '50px',
                                height: '30px',
                                borderRadius: '15px',
                            }}
                            layout
                        />
                    </motion.div>
                </div>

                {isSignIn ? <SignInForm /> : <SignUpForm />}

                <div className='flex flex-col items-center'>
                    <h3 className='dark:text-white'>Or</h3>
                    <GoogleButton
                        onClick={() => handleSignInWithGoogle()}
                    />
                </div>
            </div>
        </div>
    )
}