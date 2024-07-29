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
    <main>
      <header className="py-3">
        <div className="container m-auto">
          <figure>
            <img src="/logo.png" className="w-[100px] max-h-[100px]" alt="" />
          </figure>
        </div>
      </header>

      <section className="">
        <div className="container m-auto flex justify-between items-center">
          <div className="flex flex-col gap-[25px] w-[50%] max-w-[400px]">
            <Title content='Welcome'/>
            <p className="text-[#868686]">Enter your phone number</p>
            <Input
              onInput={(ev) => {
                setPhoneNumber(ev.target.value);
              }}
            />
            {/* <div  id="recaptcha-container" className=" recaptcha-container"></div> */}
            <button
            ref={recaptchaContainer}
              id="sign-in-btn"
              onClick={sendCode}
              className="border-[1.5px] bg-[#FFBB15] text-white rounded-md p-3 text-[#FFBB15] font-bold"
            >
              Next
            </button>
          </div>

          <figure className=" ">
            <img src="/av1.png" className="max-h-[450px]" alt="" />
          </figure>
        </div>
      </section>
    </main>
  );
}
