// This line indicates that the code is intended to run in the client environment
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sapling } from "@saplingai/sapling-js/observer";

export default function Home() {
  const [apiResponse, setApiResponse] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [saplingResponse, setSaplingResponse] = useState('');

  useEffect(() => {
    Sapling.init({
      key: 'SAPLING_API_KEY', // Replace <YOUR_API_KEY> with your actual Sapling API key
      endpointHostname: 'https://api.sapling.ai',
      editPathname: '/api/v1/edits',
      statusBadge: true,
      mode: 'dev',
    });

    const editor = document.getElementById('sapling-editor');
    if (editor) {
      Sapling.observe(editor);
    }
  }, []);

  async function handleOpenAIClick() {
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
      setUserPrompt(data.result); // Assuming the corrected text is in data.result
    } catch (error) {
      console.error("Failed to fetch OpenAI response:", error);
      setApiResponse("Failed to fetch response.");
    }
  }

  // No need for a separate handle click function for Sapling since it automatically observes and suggests corrections

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex"> {/* This wraps both forms in a flex container for a side-by-side layout */}
        {/* OpenAI Form and Button */}
        <div className="flex flex-col items-center mr-8"> {/* Adds spacing between the two forms */}
          <textarea
            className="w-[500px] p-4 text-base font-normal border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 resize: none h-40"
            placeholder="Enter text to correct with OpenAI..."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          <button
            onClick={handleOpenAIClick}
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300 mt-4">
            Correct (OpenAI)
          </button>
        </div>
  
        {/* Sapling Form */}
        <div className="flex flex-col items-center"> {/* No additional spacing needed here */}
          <div
            id="sapling-editor"
            sapling-ignore="true"
            contentEditable="true"
            className="w-[500px] p-4 text-base font-normal border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none resize: none h-40">
  <span style={{ color: '#a0aec0' }}>Language is detected and corrected as you type.</span> {/* Adjust the color code as needed */}
            </div>
            <button
        onClick={(e) => e.preventDefault()} // Prevents any action
        className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300 mt-4">
            No need to click
          </button>
        </div>
      </div>
    </div>
  );
  }  
