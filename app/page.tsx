// This line indicates that the code is intended to run in the client environment
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [apiResponse, setApiResponse] = useState('');
  const [userPrompt, setUserPrompt] = useState(''); // State to hold the user's prompt

  // Adjusted handleButtonClick to include the user's prompt
  async function handleButtonClick() {
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    } catch (error) {
      console.error("Failed to fetch OpenAI response:", error);
      setApiResponse("Failed to fetch response.");
    }
  }

  return (
    <main className="grid grid-template-rows: auto 1fr auto; min-h-full w-screen">

      {/* Top elements */}
      <div className="grid grid-cols-1 place-items-center">
        {/* Your top elements content here */}
        <p className="fixed left-0 top-0 flex s w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Et on y va
        </p>
      </div>
{/* 
      <div className="grid grid-cols-1 place-items-center">
        <Image
          // ... image properties ...
        />
      </div>
 */}
      {/* Form, button, and response container */}
      <div className="grid grid-cols-1 place-items-center w-[600px] mx-auto">
        {/* Form */}
        <textarea
          className="w-full p-4 text-base font-normal border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 mb-4"
          placeholder="Enter your prompt here..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleButtonClick}
          className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
        >
          Send OpenAI Request
        </button>

        {/* Response */}
        <p className="mt-4">{apiResponse}</p>
      </div>
    </main>
  );
}
