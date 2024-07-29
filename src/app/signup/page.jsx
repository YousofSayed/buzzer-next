"use client";
import { Input } from "@/components/Input";
import { makeItResponsive } from "@/utils/function";
import React, { useEffect, useRef, useState } from "react";
import { app } from "@/app/firebaseConfig";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { Title } from "@/components/Title";
import { CenterHeader } from "@/components/CenterHeader";

const auth = getAuth(app);


export default function SignUp() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaContainer = useRef();

  useEffect(() => {
    makeItResponsive();
   if(recaptchaContainer.current){
    console.log('verf done');
    
   }
  }, []);

  function sendCode() {
    console.log('clicked');
    const appVerf = new RecaptchaVerifier(auth, recaptchaContainer.current, {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
        console.log(response);
      },
      "expired-callback": () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      },
    });

    signInWithPhoneNumber(auth, `+2${phoneNumber}`,appVerf)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
   
      console.log( 'message sent');
      router.push('/verify')
      
    })
    .catch((error) => {
      console.error('fuckkkkk' , error);
    });
    
  
  }

  return (
    <main className="flex justify-center  flex-col">
     <CenterHeader/>

      <section className="">
        <div className="container m-auto flex justify-evenly items-center max-[512px]:flex-col">
          <div className="flex flex-col gap-[25px] w-[50%] min-[512px]:max-w-[400px] max-[512px]:w-full max-[512px]:justify-center max-[512px]:items-center">
            <Title content='Welcome'/>
            <p className="text-[#868686]">Enter your phone number</p>
            <Input
              onInput={(ev) => {
                setPhoneNumber(ev.target.value);
              }}
            />

            <button
            ref={recaptchaContainer}
              id="sign-in-btn"
              onClick={sendCode}
              className="border-[1.5px] w-full bg-[#FFBB15] text-white rounded-md p-3  font-bold"
            >
              Next
            </button>
          </div>

          <figure className="max-[512px]:hidden ">
            <img src="/av1.png" className="max-h-[450px]" alt="" />
          </figure>
        </div>
      </section>
    </main>
  );
}
