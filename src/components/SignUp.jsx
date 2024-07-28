'use client';
import { makeItResponsive } from '@/utils/function';
import { Input } from './Input';
import React, { useEffect } from 'react'

export function SignUp ()  {
    useEffect(()=>{makeItResponsive()},[])
    
      return (
        <main>
          lol
          <header className="py-3">
            <div className="container m-auto">
              <figure>
                <img src="/logo.png" className="w-[100px] max-h-[100px]" alt="" />
              </figure>
            </div>
          </header>
    
          <section className="">
            <div className="container m-auto flex justify-between items-center">
              <div className="flex flex-col gap-[15px] w-[30%]">
                <h1 className="text-xl font-bold">Welcome</h1>
                <p className="text-[#868686]">Enter your phone number</p>
                <Input />
              </div>
    
              <figure className=" ">
                <img src="/av1.png" className="max-h-[450px]" alt="" />
              </figure>
            </div>
          </section>
        </main>
      )
}
