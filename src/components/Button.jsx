import { addClickClass } from "@/app/cocktail";
import React from "react";

/**
 *
 * @param {{id:string , onClick:(ev:MouseEvent)=>void , content:string , fill:boolean}} param0
 * @returns
 */
export function Button({ id, onClick = () => {}, content = "", fill = false }) {
  return (
    <button
      id="sign-in-btn"
      onClick={(ev) => {
        addClickClass(ev.target, "click");
        onClick(ev);
      }}
      className={`border-[1.5px] border-[#FFBB15] rounded-md p-3  ${
        fill ? "bg-[#FFBB15] text-[#fff]" : "bg-[#fff] text-[#FFBB15]"
      } font-bold`}
    >
      {content}
    </button>
  );
}
