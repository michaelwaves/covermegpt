import React from 'react';
import { jsPDF } from 'jspdf';

interface DownloadPDFProps {
  content: string;
  jobTitle: string,
  firstName: string,
  lastName: string
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ content, jobTitle, firstName, lastName }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const text = content
    const margin = 25.4; // Set the margin value in mm 
    const maxWidth = doc.internal.pageSize.getWidth() - 2 * margin; // Calculate the maximum width for the text
    const lineHeight = 6; // Set the line height

    const fontSize = 12
    doc.setFontSize(fontSize)

    doc.setFont("Times")

    // Split the text into an array of lines based on the maxWidth and lineHeight
    const lines = doc.splitTextToSize(text, maxWidth);

    // Set the initial y position
    let yPos = margin;

    // Iterate through the lines and add them to the PDF
    lines.forEach((line: any) => {
      doc.text(line, margin, yPos,); // Add the line of text to the PDF
      yPos += lineHeight; // Increment the y position by the line height
    });
    doc.save(`${jobTitle} Cover Letter-${firstName} ${lastName}.pdf`);
  };

  return (
    <div>
      <button onClick={handleDownloadPDF} className='button-small dark:bg-gray-900 bg-secondary-light'>Download PDF</button>
    </div>
  );
};

export default DownloadPDF;