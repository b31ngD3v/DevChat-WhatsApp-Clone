import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1aYYMFgMuwrhcgDJgNwinoZQ-bv9rsVw",
  authDomain: "devchat-wpclone.firebaseapp.com",
  databaseURL: "https://devchat-wpclone.firebaseio.com",
  projectId: "devchat-wpclone",
  storageBucket: "devchat-wpclone.appspot.com",
  messagingSenderId: "170207583765",
  appId: "1:170207583765:web:7efecd58bca87ffcb2b81c",
  measurementId: "G-6B9LT6834R"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

// Implicit imports give access to all visible types in the type (or package) that precedes the ".*"; types imported in this way never shadow other types.
export { auth, provider };
// Explicit imports give access to just the named type; they can shadow other types that would normally be visible through an implicit import, or through the normal package visibility rules
export default db;
