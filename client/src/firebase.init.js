// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDz2-R5R1Ham6dOvahWg8aHJaTubmT5OzI",
    authDomain: "onnorokom-pathsala-c038d.firebaseapp.com",
    projectId: "onnorokom-pathsala-c038d",
    storageBucket: "onnorokom-pathsala-c038d.appspot.com",
    messagingSenderId: "1096882404821",
    appId: "1:1096882404821:web:20d637ab5f1605043ed15c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;