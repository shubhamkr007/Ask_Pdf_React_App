import React, { useState } from 'react';
import axios from 'axios';
// import pdf from 'pdf-parse';
// import fs from 'fs';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const FileUploadForm = () => {
  
  const [pdfText, setPdfText] = useState('');
  const [numPages, setNumPages] = useState(null);

  const [textToSummarize, setTextToSummarize] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTextSummarization = async () => {
    
    setIsLoading(true)
    setSummary('');

const options = {
  method: 'POST',
  url: 'https://open-ai21.p.rapidapi.com/qa',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'aea98c3645mshc17a53ec888e102p12e177jsn083e7e07dffd',
    'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
  },
  data: {
    question: textToSummarize,
    context: pdfText.toString().substring(0, 2000)
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
  setSummary(response.data.result);
} catch (error) {
	console.error(error);
  setSummary(error);
}

console.log(pdfText.toString());

  setIsLoading(false)
    
  };


  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const dataURL = URL.createObjectURL(file);

      // Use the data URL as the source for the PDF
      setPdfText('');
      setNumPages(null);

      // Clear any previous extracted text
      await extractText(dataURL);
    }
  };

  const extractText = async (dataURL) => {
    const pdfDoc = await pdfjs.getDocument(dataURL).promise;

    let text = '';

    for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber++) {
      const page = await pdfDoc.getPage(pageNumber);
      const pageText = await page.getTextContent();
      text += pageText.items.map((item) => item.str).join(' ') + ' ';
    }

    setPdfText(text);
  };



  return (
    <div>
      
      <h1>Ask PDF</h1>
      <div className='contain'>
      <textarea
        placeholder="Ask Your Question ?? After uploading .pdf "
        value={textToSummarize}
        onChange={(e) => setTextToSummarize(e.target.value)}
        rows={10}
      />
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={onDocumentLoadSuccess}>Upload</button>
      <button style={{marginLeft: "50px"}} onClick={handleTextSummarization}>ASK QUESTION</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {summary && (
        <div>
          <h3>Summary:</h3>
          <div className='summBox'><p>{summary}</p></div>
        </div>
      )}
      
    </div>
  );
};

export default FileUploadForm;
