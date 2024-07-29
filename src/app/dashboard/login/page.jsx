"use client";
import { addClickClass, makeAppResponsive, stringify } from "@/app/cocktail";
import { app } from "@/app/firebaseConfig";
import { Button } from "@/components/Button";
import { CenterHeader } from "@/components/CenterHeader";
import { Input } from "@/components/Input";
import { Title } from "@/components/Title";
import { Warn } from "@/components/Warn";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const auth = getAuth(app);

const LogIn = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [warn, setWarn] = useState("");
  const router = useRouter();
  const succesMsg = `You logged in successfully :)`;
  
  useEffect(() => {
    makeAppResponsive('main')
      const adminChecked = localStorage.getItem("adminChecked");
      if (adminChecked) {
      router.push("/dashboard");
    }
  },[]);

  const onInput = (ev, key) => {
    setWarn("");
    setData({ ...data, [key]: ev.target.value });
  };

  /**
   *
   * @param {import("react").FormEvent} ev
   */
  const onSubmit = (ev) => {
    ev.preventDefault();
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((credential) => {
          const schema = {
            email: credential.user.email,
            uid: credential.user.uid,
            emailVerified: credential.user.emailVerified,
            refreshToken: credential.user.refreshToken,
          };

          localStorage.setItem("admin", stringify(schema));
          setWarn(succesMsg);
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        })
        .catch((err) => {
          setWarn(`Invalid username or password :(`);
        });
    }).catch((err)=>{
        console.error(err.message);
    });
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <CenterHeader />
      <section>
        <div className="container m-auto flex flex-col justify-center items-center gap-4">
          <Title content="Welcome Admin!" />
          <Warn warn={warn} succesMsg={succesMsg} />

          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-3 min-w-[300px]"
          >
            <Input
                isNum={false}
              onInput={(ev) => {
                onInput(ev, "email");
              }}
              placeholder="Enter Your Email..."
            />
            <Input
              onInput={(ev) => {
                onInput(ev, "password");
              }}
              isNum={false}
              placeholder="Enter Your Password..."
            />
            <Button content="Login" onClick={(ev) => {}} fill={true} />
          </form>
          <p className="text-gray-400">
            <Link href={"/dashboard/signup"}>
              Don’t have an account ?
              <span className="text-[#FFBB15] font-bold"> Signup</span>
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LogIn;
