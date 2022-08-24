import React, { useState } from "react";
import { auth } from "../config";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import saveNewUser from "../helpers/saveNewUser";
import LoadingButton from "./LoadingButton";
import SignInWithGoogle from "./SignInWithGoogle";
function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signUpWithEmailAndPassword = async (event: React.FormEvent) => {
    //  start loading animation
    setIsLoading(true);
    event.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // console.log({ createUser });

      // store user info to database
      await saveNewUser({ name, email, res, uid: res.user.uid });

      // stop loading animation
      setIsLoading(false);
      // redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (err) {
      setMessage((err as Error).message.replaceAll("Firebase:", ""));
      // console.log(err);
      // stop loading animation
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-lg mx-auto  px-5 py-7 shadow rounded-md border border-purple-100/20">
      <h1 className="text-3xl font-bold text-purple-400 text-center">
        Create An Account!
      </h1>

      <form
        className="mt-5 w-full "
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
        {message ? (
          <p className=" w-full bg-red-500 py-3 my-2px-2 text-center text-sm font-extralight text-white ">
            {message}
          </p>
        ) : null}
        <LoadingButton isLoading={isLoading} text="Sign Up" />

        <SignInWithGoogle setMessage={setMessage} text="Sign Up With Google" />
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
