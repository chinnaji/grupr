import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config";
import { useRouter } from "next/router";
import saveNewUser from "../helpers/saveNewUser";
import LoadingButton from "./LoadingButton";
import SignInWithGoogle from "./SignInWithGoogle";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // sign up error message
  const [message, setMessage] = useState(null);

  // init google auth provider
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    allow_signup: "false",
    prompt: "select_account",
  });

  const router = useRouter();

  // login Function
  const logIn = (event: any) => {
    event.preventDefault();
    // start loading animation
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // stop loading animation
        // setIsLoading(false);
        router.push("/dashboard");
        // history.back()
      })
      .catch((err) => {
        // stop loading animation
        setIsLoading(false);

        setMessage(err.message.replaceAll("Firebase:", ""));
      });
  };

  const signInWithGoogleProvider = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      // if user is a new user, store user info to database
      await saveNewUser({
        name: res.user.displayName!,
        email: res.user.email!,
        res,
        uid: res.user.uid,
      });

      // console.log(saveUserDataToDb);

      // redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      alert(err);
      // setMessage(err.toString())
    }
    // catch error
  };

  return (
    <section className="max-w-xl mx-auto  px-5 py-7 shadow rounded-md border border-purple-100/20">
      <h1 className="text-3xl font-bold text-purple-400 text-center">
        Welcome Back!
      </h1>
      <form className="mt-5 w-full " onSubmit={(event) => logIn(event)}>
        {/* error message */}
        {message ? (
          <p className="  w-full bg-red-500 py-3 px-2 text-center text-sm font-extralight text-white ">
            {message}
          </p>
        ) : null}
        {/* error message */}
        <input
          autoComplete="on"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          name="email address"
          placeholder="Email"
          className="p-3 my-3  outline-none focus:border-1 focus:border-purple-200 rounded-md bg-purple-100 text-purple-300 w-full"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="on"
          name="password"
          type="password"
          required
          placeholder="Password"
          className="p-3 my-3  outline-none focus:border-1 focus:border-purple-200 rounded-md bg-purple-100 text-purple-300 w-full"
        />
        <LoadingButton isLoading={isLoading} text="Log In" />
        <SignInWithGoogle setMessage={setMessage} text="Log In With Google" />

        <p className="mt-7 text-center">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="font-semibold text-purple-400">
            Sign Up
          </a>
        </p>
      </form>
    </section>
  );
}

export default LoginForm;
