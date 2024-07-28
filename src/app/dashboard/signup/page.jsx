"use client";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidRePassword,
  stringify,
} from "@/app/cocktail";
import { Button } from "@/components/Button";
import { CenterHeader } from "@/components/CenterHeader";
import { Input } from "@/components/Input";
import { Title } from "@/components/Title";
import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/app/firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Warn } from "@/components/Warn";

const auth = getAuth(app);
const database = getDatabase(app);

const SignUp = () => {
  const [warn, setWarn] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const router = useRouter();
  const succesMsg = `You signed up successfully :)`;

  useEffect(() => {
    const adminChecked = localStorage.getItem("adminChecked");
    if (adminChecked) router.push("dashboard");
  });

  /**
   *
   * @param {import("react").FormEvent} ev
   */
  const onSubmit = (ev) => {
    ev.preventDefault();
    const validations = [
      isValidName(data.name),
      isValidEmail(data.email),
      isValidPassword(data.password),
      isValidRePassword(data.password, data.rePassword),
    ];

    for (const result of validations) {
      if (!result.valid) {
        setWarn(result.msg);
        return;
      }
    }
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const schema = {
          email: user.email,
          uid: user.uid,
          emailVerified: user.emailVerified,
          refreshToken: user.refreshToken,
        };

        localStorage.setItem("admin", stringify(schema));
        set(ref(database, `admins/${schema.uid}`), schema);
        setWarn(succesMsg);
        setTimeout(() => {
          router.push("/dashboard/login");
        }, 1000);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setWarn(
          errorMessage
            .split("Firebase: Error ")
            .join("")
            .split(/\(|\)|auth\//gi)
            .join("")
        );
        console.error(error);
      });
  };

  const onInput = (ev, key) => {
    setWarn("");
    setData({ ...data, [key]: ev.target.value });
  };
  return (
    <main>
      <CenterHeader />
      <section>
        <div className="container m-auto flex flex-col justify-center items-center gap-4">
          <Title content={"Sign up as admin"} />
          <Warn warn={warn} succesMsg={succesMsg} />

          <form
            onSubmit={onSubmit}
            className="flex flex-col justify-center  gap-3 min-w-[300px]"
          >
            <Input
              onInput={(ev) => {
                onInput(ev, "name");
              }}
              isNum={false}
              placeholder="Enter your name"
            />
            <Input
              onInput={(ev) => {
                onInput(ev, "email");
              }}
              isNum={false}
              placeholder="Enter your Email"
            />
            <Input
              onInput={(ev) => {
                onInput(ev, "password");
              }}
              isNum={false}
              placeholder="Enter your password"
            />

            <Input
              onInput={(ev) => {
                onInput(ev, "rePassword");
              }}
              isNum={false}
              placeholder="Repeat your password"
            />
            <Button content="Signup" fill={true} />
          </form>
          <p className="text-gray-400">
            <Link href={"/dashboard/signup"}>
              Do you have an account ?
              <span className="text-[#FFBB15] font-bold">Login</span>
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
