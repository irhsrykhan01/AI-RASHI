export default async function handler(req, res) {
  res.status(200).json({
    keyExists: !!process.env.GEMINI_API_KEY,
    keyStart: process.env.GEMINI_API_KEY?.slice(0,5) || "KOSONG"
  });
}
