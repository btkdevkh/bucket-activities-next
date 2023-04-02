import { initializeApp } from "firebase/app"
import { collection, getFirestore } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
}

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()
const storage = getStorage()
const colBuckets = collection(db, "buckets")

export { db, auth, colBuckets, storage, ref, uploadBytes, getDownloadURL }
