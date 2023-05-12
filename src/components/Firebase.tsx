// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore, getDoc, setDoc, addDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth"
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
const auth = getAuth(app);
const db = getFirestore(app)

const userCollecionRef = collection(db, "users")

export const getUserData = async (uid: string) => {
    const data = (await getDoc(doc(userCollecionRef, uid))).data()
    return data
}

export const updateUserData = async (uid: string, field: string, newData: string) => {
    const previousData = (await getDoc(doc(userCollecionRef, uid))).data()
    const data = await setDoc(doc(userCollecionRef, uid), {
        ...previousData,
        [field]: newData
    })
}