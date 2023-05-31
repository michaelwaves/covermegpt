import React from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

interface DownloadPDFProps {
  content: string;
  jobTitle: string,
  firstName: string,
  lastName: string
}


const DownloadPDFLib: React.FC<DownloadPDFProps> = ({ content, jobTitle, firstName, lastName }) => {
  const handleDownloadPDF = async () => {
    const doc = await PDFDocument.create()

    const font = await doc.embedFont(StandardFonts.TimesRoman)

    const page = doc.addPage()

    const { width, height } = page.getSize()

    const fontSize = 12

    page.drawText(content, {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: font,
      color: rgb(0, 0.53, 0.71)
    })
    const pdfBytes = await doc.save()
    const fileName = `${jobTitle} Cover Letter-${firstName} ${lastName}.pdf`;


    const blob = new Blob([pdfBytes], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={handleDownloadPDF} className='button-small dark:bg-gray-900 bg-secondary-light'>Download PDF</button>
    </div>
  );
};

export default DownloadPDFLib;