export default async function handler(req, res) {
  const { text } = req.body;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
    reply:
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Tidak ada jawaban"
  });
}
