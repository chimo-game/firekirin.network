/**
 * API Route: /api/execute
 * Execute PHP or JavaScript code from Supabase storage
 */

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fileUrl, fileType, params = {} } = req.body;

    // Validate input
    if (!fileUrl || !fileType) {
      return res.status(400).json({
        error: "Missing parameters",
        message: "fileUrl and fileType are required",
      });
    }

    // ==========================================
    // SECURITY: Validate file URL
    // ==========================================
    const allowedDomains = [
      "supabase.co",
      "your-domain.com", // Add your domains
    ];

    const urlObj = new URL(fileUrl);
    const isAllowed = allowedDomains.some((domain) =>
      urlObj.hostname.includes(domain)
    );

    if (!isAllowed) {
      return res.status(403).json({
        error: "Forbidden",
        message: "File domain not allowed",
      });
    }
    // ==========================================

    // Fetch file content
    const fileResponse = await fetch(fileUrl);
    const fileContent = await fileResponse.text();

    // Execute based on file type
    if (fileType === "javascript" || fileType === "js") {
      // Execute JavaScript in Node.js context
      const func = new Function("params", "fetch", fileContent);
      const result = await func(params, fetch);
      return res.status(200).json({ result, type: "javascript" });
    } else if (fileType === "php") {
      // PHP execution requires a PHP runtime
      // This is a limitation of Vercel - PHP cannot run natively
      return res.status(501).json({
        error: "Not Implemented",
        message:
          "PHP execution is not supported on Vercel serverless functions",
        suggestion:
          "Please use the alternative approach: deploy to a PHP hosting provider",
      });
    } else {
      return res.status(400).json({
        error: "Unsupported file type",
        message: `File type '${fileType}' is not supported`,
      });
    }
  } catch (error) {
    console.error("Execute API Error:", error);
    return res.status(500).json({
      error: "Execution Error",
      message: error.message,
    });
  }
}
