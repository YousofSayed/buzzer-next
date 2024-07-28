"use client";
import React, { useEffect, useRef } from "react";
import { transformToNumInput } from "@/app/cocktail";

/**
 * 
 * @param {{placeholder:string , isNum:boolean , onInput : (ev:FormEvent)=>void}} param0 
 * @returns 
 */
export function Input  ({ placeholder, isNum = true, onInput = () => {} })  {
  return (
    <input
      onInput={(ev) => {
        isNum && transformToNumInput(ev.target);
        onInput(ev);
      }}
      type="text"
      placeholder={placeholder || "Phone Number"}
      className="p-3 rounded-md outline-none border-[1.5px] border-slate-400 text-black"
    />
  );
};
