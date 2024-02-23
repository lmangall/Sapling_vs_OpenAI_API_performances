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
      key: process.env.NEXT_PUBLIC_SAPLING_API_KEY, // Replace <YOUR_API_KEY> with your actual Sapling API key
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
    <div className="h-screen flex flex-col justify-center items-center">
     

      {/* Forms */}
      <div className="flex items-center justify-center">
        {/* OpenAI Form and Button */}
        <div className="flex flex-col items-center mr-8">


      {/* OpenAI button */}
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
          Some text to complement the button
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
              className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300 mt-4">
              Correct (OpenAI)
            </button>
          </div>
  
          {/* Sapling Form */}
          <div className="flex flex-col items-center">


      {/* OpenAI button */}
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
          Some text to complement the button
        </p>
      </a>
            <div
              id="sapling-editor"
              sapling-ignore="true"
              contentEditable="true"
              className="w-[500px] p-4 text-base font-normal border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none resize: none h-40"
              placeholder="Start typing here to correct with Sapling...">
              Lets get started!
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
  
/* 
  id="sapling-editor"
  sapling-ignore="true"
  contentEditable="true"
  className="w-[500px] p-4 text-base font-normal border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none resize: none h-40">
  <span style={{ color: '#a0aec0' }}>Language is detected and corrected as you type.</span>
 */