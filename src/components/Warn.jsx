import React from "react";

export const Warn = ({warn , succesMsg}) => {
  return (
    <p
      className={`font-semibold  h-[20px] transition-all 
                ${warn == succesMsg ? "text-green-600" :"text-red-600"}
                ${warn ? "opacity-[1]" : "opacity-0"}`}
    >
      {warn}
    </p>
  );
};
