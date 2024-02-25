// Function to handle correction requests
export default async function handleCorrectionRequest(req, res) {
  // Extract the prompt from the request body
  const userPrompt = req.body.prompt; // Use a descriptive name

  // Prepare the correction request for OpenAI
  const correctionRequest = `Correct the following text to standard French, preserving the original intent: "${userPrompt}"`;

  // Create the initial message for OpenAI
  const messages = [{ role: "user", content: correctionRequest }];

  try {
    // Call OpenAI API with the prepared message
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use environment variable for security
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Consider exploring other models for French correction
        messages: messages,
      }),
    });

    // Check for successful response
    if (response.ok) {
      const data = await response.json();

      // Extract the corrected text from the response
      if (data.choices && data.choices.length > 0) {
        const correctedText = data.choices[0].message.content;
        res.status(200).json({ result: correctedText }); // Return only the corrected text
      } else {
        res.status(404).json({ error: "No correction found from OpenAI." });
      }
    } else {
      // Handle API errors gracefully
      const error = await response.text(); // Get the error message
      console.error("Error calling OpenAI API:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request." });
    }
  } catch (error) {
    // Log and handle other errors
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An internal error occurred. Please try again later." });
  }
}
