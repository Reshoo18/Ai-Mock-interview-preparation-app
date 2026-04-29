const mammoth = require("mammoth");
const PDFParser = require("pdf2json");

const extractPDFText = (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on(
      "pdfParser_dataError",
      (errData) => {
        reject(errData.parserError);
      }
    );

    pdfParser.on(
      "pdfParser_dataReady",
      (pdfData) => {
        let text = "";

        pdfData.Pages.forEach((page) => {
          page.Texts.forEach((textItem) => {
            text +=
              decodeURIComponent(
                textItem.R[0].T
              ) + " ";
          });
        });

        resolve(text);
      }
    );

    pdfParser.loadPDF(filePath);
  });
};

const parseResume = async (
  filePath,
  mimetype
) => {
  try {
    // PDF
    if (mimetype === "application/pdf") {
      return await extractPDFText(filePath);
    }

    // DOCX
    if (
      mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result =
        await mammoth.extractRawText({
          path: filePath,
        });

      return result.value;
    }

    throw new Error("Unsupported file type");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { parseResume };