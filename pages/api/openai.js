// pages/api/openai.js
export default async function handler(req, res) {
  // Define the prompt for the chat completion API
  const messages = [{ role: 'user', content: 'give two sentences in french' }];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Adjusted to use the chat model as per documentation
        messages: messages,
      }),
    });
    
    const data = await response.json();

    // Assuming the structure of the response matches the SDK's expected response
    if (data.choices && data.choices.length > 0) {
      res.status(200).json({ result: data.choices[0].message.content });
    } else {
      res.status(404).json({ error: "No completion found." });
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
}
