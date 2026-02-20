"use client";

import { useState } from "react";
import Image from "next/image";
import CircleArrow from "@/assets/arrow-right-circled.svg";

export function Input() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  async function handleClick() {
    if (!email) return;
    const call = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    });

    const result = await call.json();
    console.log(result);
    if (result.status != "success") {
      setError(true);
    }

    setEmail("");
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 pr-2 lg:pr-4 font-oxygen text-black bg-[#1668D0]/50 placeholder-black placeholder:text-xl lg:min-w-96 shadow-md max-w-48 lg:placeholder:text-3xl lg:text-3xl rounded-md">
        <input
          type="text"
          className="p-2 lg:pl-4 lg:py-5 bg-transparent w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setError(false);
            setEmail(e.target.value);
          }}
        />
        <button onClick={() => handleClick()}>
          <Image src={CircleArrow} alt="Register" className="w-6" />
        </button>
      </div>
      {error && <p>Something went wrong, please try again</p>}
    </div>
  );
}
