import firebaseClient from "firebase/compat/app";
import "firebase/compat/auth";

const firebase_config = {
  apiKey: "AIzaSyB17WlcQDy0xDsLjSl5i1yPZDxoukmKuLI",
  authDomain: "grupr-b9d32.firebaseapp.com",
  projectId: "grupr-b9d32",
  storageBucket: "grupr-b9d32.appspot.com",
  messagingSenderId: "1005429207425",
  appId: "1:1005429207425:web:99af8bba9d9a23a30fb880",
  measurementId: "G-5GMHD5KR3Y",
};

if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(firebase_config);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.LOCAL);
}

export { firebaseClient };
