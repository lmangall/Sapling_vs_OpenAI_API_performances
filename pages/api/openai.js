export default async function handler(req, res) {
  // Extract the prompt from the request body
  const { prompt } = req.body;

  // Modify the prompt to ask for grammatical or orthographic corrections
  /* 
  You will be provided with statements, and your task is to convert them to standard English
  from : https://platform.openai.com/examples/default-grammar
   */
  const correctionRequest = `Correct any grammatical or orthographic errors in the following text, return only the text, without quotes: "${prompt}"`;

  const messages = [{ role: 'user', content: correctionRequest }];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
      }),
    });
    
    const data = await response.json();

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
