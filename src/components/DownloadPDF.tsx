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
    doc.text(content, 10, 10); // Adjust the position as needed
    doc.save(`${jobTitle} Cover Letter-${firstName} ${lastName}.pdf`);
  };

  return (
    <div>
      <button onClick={handleDownloadPDF} className='button-small dark:bg-gray-900 bg-secondary-light'>Download PDF</button>
    </div>
  );
};

export default DownloadPDF;