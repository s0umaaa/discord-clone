
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJLiWC7xHxie4F5acv3-emfp1pEhcejH0",
  authDomain: "discord-clone-e50f4.firebaseapp.com",
  projectId: "discord-clone-e50f4",
  storageBucket: "discord-clone-e50f4.appspot.com",
  messagingSenderId: "241983399642",
  appId: "1:241983399642:web:9ee106e345ee4965dc27e3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider= new GoogleAuthProvider();

export{ auth, provider, db};
