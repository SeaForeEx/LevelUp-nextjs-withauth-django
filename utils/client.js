import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// looking at env files, setting up tacos to be accessed

// firebase's only purpose is authentication (grabbing the uid)

const firebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
};

const clientCredentials = {
  ...firebaseCredentials,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
};

if (!firebase.apps.length) {
  firebase?.initializeApp(firebaseCredentials);
}

export { firebase, clientCredentials };
