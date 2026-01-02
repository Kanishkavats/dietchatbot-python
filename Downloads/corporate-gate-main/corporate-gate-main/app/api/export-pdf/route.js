import puppeteer from "puppeteer";

export async function POST(req) {
  try {
    const { html } = await req.json();
    
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });
    
    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({
      width: 794, // A4 width in pixels at 96 DPI
      height: 2123, // A4 height in pixels at 96 DPI
    });
    
    // Load HTML with Tailwind
    await page.setContent(html, { 
      waitUntil: "networkidle0",
      timeout: 30000 
    });
    
    // Wait for Tailwind to load - use standard Promise
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate PDF with ATS-friendly settings
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: false,
      margin: { 
        top: "10mm", 
        right: "10mm", 
        bottom: "10mm", 
        left: "10mm" 
      },
      // Critical for ATS: Creates proper text layer
      tagged: true,
      displayHeaderFooter: false,
      // Ensures proper text extraction
      omitBackground: false,
    });
    
    await browser.close();
    
    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("PDF export error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate PDF", details: error.message }), 
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}