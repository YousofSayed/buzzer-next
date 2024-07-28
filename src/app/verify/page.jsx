"use client";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { stringify } from "../cocktail";
import { Button } from "@/components/Button";

const Verify = () => {
  const router = useRouter();
  const [code, setCode] = useState("");

  function confirmCode() {
    window.confirmationResult.confirm(code).then(res=>{
      localStorage.setItem('user',stringify(res.user));
      router.push('/');
    }).catch((err)=>{
      console.log(err);
    })
  };

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
            <h1 className="text-xl font-bold">Welcome Again</h1>
            <p className="text-[#868686]">Enter verfication code number</p>
            <Input
              onInput={(ev) => {
                setCode(ev.target.value);
              }}

              placeholder={'Verfication code'}
            />
            <Button onClick={confirmCode} content="Verify"/>
          </div>

          <figure className=" ">
            <img src="/av2.png" className="max-h-[450px]" alt="" />
          </figure>
        </div>
      </section>
    </main>
  );
};

export default Verify;
