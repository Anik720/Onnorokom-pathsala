// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZICgeKzd5lD2BCD5iO4dXJps5K-NfQYY",
  authDomain: "onnorokom-pathsala-65fd5.firebaseapp.com",
  projectId: "onnorokom-pathsala-65fd5",
  storageBucket: "onnorokom-pathsala-65fd5.appspot.com",
  messagingSenderId: "119068302879",
  appId: "1:119068302879:web:0901e49de65c292b12bf2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;