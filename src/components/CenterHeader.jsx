import React from "react";

export function CenterHeader  ()  {
  return (
    <header className="p-3">
      <div className="container m-auto flex justify-center">
        <figure>
          <img src="/logo.png" className="max-w-[60px] max-h-[60px]" alt="" />
        </figure>
      </div>
    </header>
  );
};
