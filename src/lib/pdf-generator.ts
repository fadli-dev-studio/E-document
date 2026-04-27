import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

export async function generateDocument(
  templatePath: string,
  data: Record<string, string>,
  config: any,
  outputPath: string
) {
  // Read template
  const templateBytes = await fs.readFile(path.join(process.cwd(), templatePath));
  const pdfDoc = await PDFDocument.load(templateBytes);
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  // Fill data
  for (const field of config.fields) {
    if (data[field.name]) {
      const page = pages[field.page || 0];
      page.drawText(data[field.name], {
        x: field.x,
        y: field.y,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
  }

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(path.join(process.cwd(), outputPath), pdfBytes);
}

export async function signDocument(
  inputPath: string,
  signatureBase64: string,
  config: any,
  outputPath: string
) {
  const pdfBytes = await fs.readFile(path.join(process.cwd(), inputPath));
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  // Signature image
  const signatureImage = await pdfDoc.embedPng(signatureBase64);
  const pages = pdfDoc.getPages();
  const page = pages[config.signature.page || 0];

  page.drawImage(signatureImage, {
    x: config.signature.x,
    y: config.signature.y,
    width: 100,
    height: 50,
  });

  const savedPdfBytes = await pdfDoc.save();
  await fs.writeFile(path.join(process.cwd(), outputPath), savedPdfBytes);
}
