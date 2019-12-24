import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDkKG9r-AEkrRX-pIIY5OqNpNiFlwyW0fE",
    authDomain: "crwn-db-eb8fd.firebaseapp.com",
    databaseURL: "https://crwn-db-eb8fd.firebaseio.com",
    projectId: "crwn-db-eb8fd",
    storageBucket: "crwn-db-eb8fd.appspot.com",
    messagingSenderId: "578846226362",
    appId: "1:578846226362:web:8c31802c97e6480e064f83",
    measurementId: "G-WEHG47LQF4"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
