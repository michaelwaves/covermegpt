// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore, getDoc, setDoc, addDoc, doc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage"
import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDJIcZeJNMyEUPZdO_mrVgSruvODN4NhfM",
    authDomain: "covermegpt.firebaseapp.com",
    projectId: "covermegpt",
    storageBucket: "covermegpt.appspot.com",
    messagingSenderId: "172441643529",
    appId: "1:172441643529:web:53150c9a68f2f4128326d8",
    measurementId: "G-4JDJPST0G8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage()

//firstore functions
const userCollecionRef = collection(db, "users")

export const getUserData = async (uid: string) => {
    try {
        const data = (await getDoc(doc(userCollecionRef, uid))).data()
        return data
    } catch (e) {
        console.error(e)
    }
    return null
}

export const updateUserData = async (uid: string, field: string, newData: string) => {
    const previousData = (await getDoc(doc(userCollecionRef, uid))).data()
    const data = await setDoc(doc(userCollecionRef, uid), {
        ...previousData,
        [field]: newData
    })
}

export const useAuth = () => {
    //const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                // Optionally, you can fetch additional user data from Firestore here
                fetchUserData(user.uid);
            } else {
                setUser(null);
                //navigate(redirectPath);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchUserData = async (userId: string) => {
        try {
            const userRef = doc(collection(db, 'users'), userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                //console.log(userData)
                // Do something with the user data, such as setting it in state
                // Example: setUser((prevUser) => ({ ...prevUser, ...userData }));
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return { user };
};


export const useRequireAuth = async (redirectPath = '/signin') => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate(redirectPath);
            }
        });

        return () => unsubscribe();
    }, [navigate, redirectPath]);

    return navigate;
};
