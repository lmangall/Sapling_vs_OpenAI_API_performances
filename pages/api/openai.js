// This function defines an asynchronous handler for HTTP requests
export default async function handler(req, res) {
  // Define the prompt for the chat completion API
  const messages = [{ role: 'user', content: 'give two sentences in french' }];

  try {
    // Make a POST request to the OpenAI API endpoint
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // Include OpenAI API key from environment variables
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Specify the model to use for the completion
        messages: messages, // Include the prompt messages in the request body
      }),
    });
    
    // Convert the response to JSON format
    const data = await response.json();

    // Check if response contains completion choices
    if (data.choices && data.choices.length > 0) {
      // If completion is found, send the completed message back to the client
      res.status(200).json({ result: data.choices[0].message.content });
    } else {
      // If no completion is found, send an error response indicating so
      res.status(404).json({ error: "No completion found." });
    }
  } catch (error) {
    // If an error occurs during the process, log the error and send an error response
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
}
