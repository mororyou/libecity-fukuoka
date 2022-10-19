import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSEGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
console.log(app)

const messaging = getMessaging(app)
console.log(messaging)

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_PUSH_TOKEN,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken)
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        )
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
    })
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('payload', payload)
      resolve(payload)
    })
  })
