"use client";
import { useState, useEffect } from "react";
import getCompletion from "@/utils/helper";
import Router from "next/router";
import { use } from "react";

export default function Input() {
  const [prompt, setPrompt] = useState<string>("");
  const [age, setAge] = useState<number>(14);
  const [response, setResponse] = useState<string>("");
  const [status, setStatus] = useState<string>("inactive");

  const awaitCompletion = async () => {
    setStatus("loading");
    const completion = await getCompletion(prompt, age);
    setResponse(completion as string);
    setStatus("active");
  };

  useEffect(() => {
    console.log(response, prompt, age);
  }, [response, prompt, age]);

  return (
    <>
      <form className="flex flex-col justify-center align-middle content-center flex-wrap">
        <input
          type="text"
          id="message"
          name="message"
          placeholder="Type your input prompt here 😊"
          className="text-center w-4/5 mx-4 my-4 p-2 border-2 border-neutral-200 rounded-md focus:outline-none focus:border-neutral-500"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="w-4/5 mx-auto my-2 p-2">
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Type your preffered age here 👍"
            className="text-center w-3/5 p-2 border-2 border-neutral-200 rounded-md focus:outline-none focus:border-neutral-500"
            min="0"
            max="122"
            onChange={(e) => setAge(e.target.value as unknown as number)}
          />
          <button
            className="border-2 rounded-3xl p-2 w-1/5 block text-center mx-auto my-8"
            type="button"
            onClick={awaitCompletion}
          >
            Generate
          </button>
        </div>
      </form>
      <h2 className="from-neutral-900 text-xl mt-8 font-semibold">
        Your final output 🤝:
      </h2>
      <p className="f font-semibold mx-2">
        {status === "loading"
          ? "Wait a second... I'm thinking! 🤔"
          : status === "active"
          ? response
          : "Nothing yet... 👀"}
      </p>
    </>
  );
}
