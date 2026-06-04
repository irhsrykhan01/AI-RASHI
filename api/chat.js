export default async function handler(req, res) {
  try {
    const { text } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: text
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      reply: JSON.stringify(data, null, 2)
    });

  } catch (error) {
    res.status(500).json({
      reply: error.message
    });
  }
}
