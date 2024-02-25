"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sapling } from "@saplingai/sapling-js/observer";
import SaplingEditor from "../components/saplingEditor.js";
import dynamic from "next/dynamic";

/* 
use dynamic imports  with the { ssr: false } I am tellig next.js to:
Load the Component Client-Side Only
Bypass Server-Side Execution: bypasses issues related to the use of browser-specific objects like document.

SaplingEditor component likely interacts with the DOM or uses browser APIs (such as document.getElementById) 
which are not available in a Node.js environment where Next.js performs server-side rendering.
This was causing the ReferenceError: document is not defined

with { ssr: false }, I deferred the loading and rendering of SaplingEditor 
until after the page has been delivered to the browser. 
 */
const SaplingEditorWithNoSSR = dynamic(
  () => import("../components/saplingEditor"),
  { ssr: false }
);

export default function Home() {
  const [apiResponse, setApiResponse] = useState("");
  const [userPrompt, setUserPrompt] = useState("");

  async function handleOpenAIClick() {
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userPrompt,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApiResponse(data.result);
      setUserPrompt(data.result); // Assuming the corrected text is in data.result
    } catch (error) {
      console.error("Failed to fetch OpenAI response:", error);
      setApiResponse("Failed to fetch response.");
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="project-description-container mt-40">
        {/* Project Description */}
        <h1 className="text-3xl font-bold mb-4">API project one</h1>
        <p>
          This project utilizes AI technologies from OpenAI and Sapling to
          correct grammar. Enhancements to implement:
          <ul className="enhancement-list">
            <li>- Click for word definition</li>
            <li>- Correction explanation</li>
            <li>- Read button</li>
            <li>- Set OpenAI temperature</li>
          </ul>
        </p>
      </div>
      {/* Forms */}
      <div className="flex items-center justify-center">
        {/* OpenAI Form and Button */}
        <div className="flex flex-col items-center mr-8">
          {/* OpenAI top button */}
          <a
            href="https://platform.openai.com/docs/api-reference/making-requests"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-blue-00 hover:bg-blue-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`w-[450px] mb-3 text-2xl font-semibold`}>
              OpenAI{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Ideally the model should be trained for this specific use case
              (easy to do).
            </p>
          </a>

          <textarea
            className="w-[500px] p-4 text-base font-normal border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 resize: none h-40"
            placeholder="Enter text to correct with OpenAI..."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          <button
            onClick={handleOpenAIClick}
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300 mt-4"
          >
            {" "}
            Correct (OpenAI)
          </button>
        </div>

        {/* Sapling Form */}
        <div className="flex flex-col items-center">
          {/* Sapling top button */}
          <a
            href="https://sapling.ai/"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-blue-00 hover:bg-blue-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`w-[450px] mb-3 text-2xl font-semibold`}>
              Sapling{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              This API handle everything and is quite easy to use.
            </p>
          </a>
          <SaplingEditorWithNoSSR />
          <button
            onClick={(e) => e.preventDefault()} // Prevents any action
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300 mt-4"
          >
            No need to click
          </button>
        </div>
      </div>

      <div className=" justify-center mt-auto mb-8">
        <a
          href="https://frenchezleo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/logo.png"
            alt="Frenchez Leo Logo"
            width={50} // Adjust width as needed
            height={25} // Adjust height as needed
            priority
          />{" "}
        </a>
      </div>
    </div>
  );
}

// {/* Logo and Link */}
// <div className="flex justify-center mt-auto mb-8">
//   <a
//     href="https://www.frenchezleo.com"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <Image
//       src="/logo.png"
//       alt="Frenchez Leo Logo"
//       width={100} // Adjust width as needed
//       height={50} // Adjust height as needed
//     />
//   </a>
// </div>
