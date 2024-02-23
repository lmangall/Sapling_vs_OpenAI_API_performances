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
      const correctedText = data.result; // Assuming the corrected text is in data.result
      setUserPrompt(correctedText); // Update the state with the corrected text
    } catch (error) {
      console.error("Failed to fetch OpenAI response:", error);
      setApiResponse("Failed to fetch response.");
    }
  }

 
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <main className="grid grid-template-rows: auto 1fr auto; w-full">
      {/* Form, button, and response container */}
      <div className="grid grid-cols-1 place-items-center mx-auto">
        {/* Form */}
        <div className="flex flex-col"> <textarea
            className="w-[500px] p-4 text-base font-normal border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 resize: none h-40" placeholder="Entrez la phrase à corriger..."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />

          {/* Button */}
          <button
            onClick={handleButtonClick}
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300 mt-4" >
            Corriger (OpenAI)
          </button>
                  {/* Logo */}

          <div className="flex justify-center bottom-0 mt-20">
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
          </div>
        </div>
      </div>
    </main>
  </div>
  );
}
