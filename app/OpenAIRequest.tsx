import React, { useState } from 'react';

const OpenAIRequest = () => {
  const [apiResponse, setApiResponse] = useState('');

  const handleButtonClick = async () => {
    const response = await fetch('API_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: "write two lines in french" }),
    });
    const data = await response.json();
    setApiResponse(data.result);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Send Request</button>
      <p>Response from OpenAI: {apiResponse}</p>
    </div>
  );
};

export default OpenAIRequest;

/* 
export default Page;
Key Points:
Component Definition: Use function Page() or const Page = () => for defining React components.
State Management: The useState hook is correctly used for managing the apiResponse.
Event Handling: The handleButtonClick function demonstrates async fetching of data and updating the component's state based on the response, which is a common pattern for handling API requests in React components.
File Naming and Structure: Choose file names that reflect the component's purpose and place them in a directory structure that makes sense for your project (e.g., components for shared components or pages for components representing whole pages). */