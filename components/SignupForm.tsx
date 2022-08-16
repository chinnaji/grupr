import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../config";
import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import saveNewUser from "../helpers/saveNewUser";
import LoadingButton from "./LoadingButton";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const signUpWithEmailAndPassword = async (event: any) => {
    event.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // console.log({ createUser });

      // store user info to database
      await saveNewUser({ name, email, res, uid: res.user.uid });

      // stop loading animation
      setIsLoading(false);
      // redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setMessage(err.message.replaceAll("Firebase:", ""));
      // stop loading animation
      setIsLoading(false);
    }
  };

  const signUpWithGoogleProvider = async () => {
    setIsLoading(true);
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
      setIsLoading(true);
      router.push("/dashboard");
    } catch (err) {
      alert(err);
      // setMessage(err.toString())
    }
    // catch error
  };

  return (
    <section className="max-w-lg mx-auto  px-5 py-7 shadow rounded-md border border-purple-100/20">
      <h1 className="text-3xl font-bold text-purple-400 text-center">
        Create An Account!
      </h1>
      {message ? (
        <p className=" w-full bg-red-500 py-3 px-2 text-center text-sm font-extralight text-white ">
          {message}
        </p>
      ) : null}
      <form
        className="mt-10 w-full "
        onSubmit={(event) => signUpWithEmailAndPassword(event)}
      >
        <input
          autoComplete="on"
          name="name"
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
          placeholder="Name"
          className="p-3 my-3 outline-none focus:border-1 focus:border-purple-200 rounded-md bg-purple-100 text-purple-300 w-full"
        />
        <input
          type="email"
          autoComplete="on"
          name="email address"
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="p-3 my-3  outline-none focus:border-1 focus:border-purple-200 rounded-md bg-purple-100 text-purple-300 w-full"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="on"
          name="password"
          min={8}
          required
          placeholder="Password"
          className="p-3 my-3  outline-none focus:border-1 focus:border-purple-200 rounded-md bg-purple-100 text-purple-300 w-full"
        />
        <LoadingButton
          isLoading={isLoading}
          onClick={signUpWithEmailAndPassword}
          text="Sign Up"
        />
        {/* <button
          type="submit"
          className="px-2 py-4 outline-none flex items-center justify-center gap-x-2 rounded-md text-zinc-100 font-semibold hover:bg-purple-500 transition-all ease-in-out bg-purple-400  mt-3 w-full"
        >
          {isLoading && (
            <svg
              aria-hidden="true"
              className="mr-2 w-6 h-6 text-gray-200 animate-spin  fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
          Sign Up
        </button> */}
        <button
          onClick={signUpWithGoogleProvider}
          type="button"
          className="flex items-center border  justify-center px-2 py-4 outline-none   rounded-md text-zinc-800 font-semibold  mt-3 w-full"
        >
          <FcGoogle className="text-2xl mr-3" /> Sign Up With Google
        </button>
        <p className="mt-7 text-center">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-purple-400">
            Log In
          </a>
        </p>
      </form>
    </section>
  );
}

export default SignupForm;
