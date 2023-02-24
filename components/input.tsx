"use client";
import { useState, useEffect } from "react";
import Router from "next/router";
import { use } from "react";

export default function Input() {
  const [text, setText] = useState<string>("");
  const [age, setAge] = useState<number>(14);
  const [response, setResponse] = useState<string>("");
  const [status, setStatus] = useState<string>("inactive");

  const awaitCompletion = async () => {
    setStatus("loading");
    setResponse("");
    const requiredLength =
      Math.round(text.split(" ").length) > 64
        ? Math.round(text.split(" ").length)
        : 64;
    console.log(requiredLength);
    const prompt = `Summarize the text (in the style of a teacher teaching the topic) following the colon for a ${age} year-old person. If the person is below eighteen, treat them like a school student. If above 18, treat them like a univeristy student/adult. The summary should be at least ${requiredLength} words long and be a similar length to the input prompt:${text}`;
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let completion = await response.json();
    setResponse(completion.choices[0].text);
    console.log(completion.choices[0].text.length)
    setStatus("active");
  };

  return (
    <>
      <form className="flex flex-col justify-center align-middle content-center flex-wrap">
        <input
          type="text"
          id="message"
          name="message"
          placeholder="Type your input text here 😊"
          className="text-center w-4/5 mx-4 my-4 p-2 border-2 border-neutral-200 rounded-md focus:outline-none focus:border-neutral-500"
          onChange={(e) => setText(e.target.value)}
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
