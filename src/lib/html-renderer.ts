import fs from "fs/promises";
import path from "path";

export async function renderTemplate(templateName: string, data: Record<string, any>) {
  const templatePath = path.join(process.cwd(), "templates", `${templateName}.html`);
  let html = await fs.readFile(templatePath, "utf-8");

  // Simple replacement logic {{variable}}
  Object.keys(data).forEach((key) => {
    const value = data[key];
    const regex = new RegExp(`{{${key}}}`, "g");
    html = html.replace(regex, value || "");
  });

  // Default values for missing fields to avoid showing {{field}}
  html = html.replace(/{{[A-Za-z0-9_]+}}/g, "");

  // Handle year and id
  html = html.replace(/{{year}}/g, new Date().getFullYear().toString());
  html = html.replace(/{{date}}/g, new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }));

  // Handle signatures
  if (data.SignatureManager) {
    html = html.replace(/{{SignatureManager}}/g, `<img src="${data.SignatureManager}" class="signature-img" />`);
  } else {
    html = html.replace(/{{SignatureManager}}/g, `<div style="font-size: 24px; color: #ddd; margin-top: 20px;">TTD</div>`);
  }

  return html;
}
