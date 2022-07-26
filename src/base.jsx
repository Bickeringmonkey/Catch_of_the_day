import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBZcfs5HtjqQYgg8QCaZz1Uf85Hg8xrZgA",
    authDomain: "catch-of-the-day-e99fb.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-e99fb-default-rtdb.firebaseio.com"
  });

  const base = Rebase.createClass(firebaseApp.database());

  // this is a named export
  export { firebaseApp };
// this is a default export
export default base;

