"use client";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { makeAppResponsive, stringify } from "../cocktail";
import { Button } from "@/components/Button";
import { CenterHeader } from "@/components/CenterHeader";
import { Title } from "@/components/Title";

const Verify = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  useEffect(()=>{makeAppResponsive('main')},[])

  function confirmCode() {
    window.confirmationResult.confirm(code).then(res=>{
      localStorage.setItem('user',stringify(res.user));
      router.push('/');
    }).catch((err)=>{
      console.log(err);
    })
  };

  return (
    <main className="flex flex-col justify-center ">
     <CenterHeader/>

      <section className="">
        <div className="container m-auto flex justify-evenly items-center px-3">
          <div className="flex flex-col gap-[25px] min-[612px]:w-[50%] max-w-[400px] max-[612px]:w-full max-[612px]:justify-center max-[612px]:items-center ">
            <Title content={'Welcome Again'} />
            <p className="text-[#868686]">Enter verfication code number</p>
            <Input
              onInput={(ev) => {
                setCode(ev.target.value);
              }}

              placeholder={'Verfication code'}
            />
            <Button onClick={confirmCode} content="Verify" fill={true}/>
          </div>

          <figure className="max-[612px]:hidden ">
            <img src="/av2.png" className="max-h-[450px]" alt="" />
          </figure>
        </div>
      </section>
    </main>
  );
};

export default Verify;
