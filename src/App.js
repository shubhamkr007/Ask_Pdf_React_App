import React, { useState } from 'react';
import './App.css'; // Import your CSS styles if needed
import FileUploadForm from './components/FileUploadForm';
import DisplaySummary from './components/DisplaySummary';
// import Pdftxt from './components/Pdftxt';

function App() {
  const [summary, setSummary] = useState('');

  // Define a function to update the summary
  const updateSummary = (newSummary) => {
    setSummary(newSummary);
  };

  return (
    <div className="App">
      <h1>PDF Summarization App</h1>
      <FileUploadForm updateSummary={updateSummary} />

      {/* Display the summary if available */}
      {summary && <DisplaySummary summary={summary} />}

      {/* <Pdftxt/> */}
    </div>
  );
}

export default App;
