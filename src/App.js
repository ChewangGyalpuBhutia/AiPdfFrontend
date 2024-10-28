import React, { useState } from 'react';
import './App.css';
import AiPlanet from './assets/AiPlanet.svg';
import AddIcon from './assets/AddIcon.svg';
import Generate from './assets/Generate.svg';
import File from './assets/File.svg';
import Logo from './assets/Logo.svg';
import { TailSpin } from 'react-loader-spinner';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfId, setPdfId] = useState(null);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [pdfFileName, setPdfFileName] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);

  // File upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
    setPdfFileName(file.name);
    await handleUpload(file);
  };

  // Post file to backend for processing
  const handleUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoadingUpload(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/upload_pdf/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPdfId(data.id);
      alert('PDF uploaded successfully');
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Failed to upload PDF');
    } finally {
      setLoadingUpload(false);
    }
  };


  // Post question to backend for processing
  const handleQuestionSubmit = async () => {
    if (!pdfId || !question) return;

    const newChatEntry = { question, answer: '', loading: true };
    setChatHistory([...chatHistory, newChatEntry]);

    const formData = new FormData();
    formData.append('pdf_id', pdfId);
    formData.append('question', question);

    try {
      const response = await fetch('http://127.0.0.1:8000/ask_question/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setChatHistory((prevChatHistory) =>
        prevChatHistory.map((chat, index) =>
          index === prevChatHistory.length - 1
            ? { ...chat, answer: data.answer, loading: false }
            : chat
        )
      );
      setQuestion('');
    } catch (error) {
      console.error('Error asking question:', error);
      alert('Failed to get answer');
      setChatHistory((prevChatHistory) =>
        prevChatHistory.map((chat, index) =>
          index === prevChatHistory.length - 1
            ? { ...chat, loading: false }
            : chat
        )
      );
    }
  };

  return (
    <div style={{ margin: 0, padding: '0 50px', height: '100vh', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', color: 'black' }}>
        <img src={AiPlanet} alt="Logo" style={{ height: '40px' }} />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ gap: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ padding: 7, border: '1px solid #0FA958', borderRadius: 5 }}>
              <img src={File} alt="File" style={{ height: '16px' }} />
            </div>
            <div>
              {pdfFileName && <p style={{ color: '#0FA958', fontSize: '14px', fontStyle: 'normal', fontWeight: '500', lineHeight: '16.468px' }}>{pdfFileName.slice(0, 10) + '...'}</p>}
            </div>
          </div>
          <div style={{ height: '45px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ display: 'none' }} id="upload-pdf" />
            <label htmlFor="upload-pdf" className="upload-label">
              <div className='add-container'>
                <img src={AddIcon} alt="Add Icon" style={{ height: '18px' }} />
              </div>
              <div className="upload-text">
                <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>Upload PDF</p>
              </div>
            </label>
          </div>
        </div>
      </nav>


      {/* Chat Section */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {loadingUpload && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TailSpin color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {!loadingUpload && (
          <>
            {chatHistory.map((chat, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24
                }}>
                  <div style={{
                    height: 40,
                    width: 40,
                    borderRadius: '50%',
                    background: '#B0ACE9',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                  }}>
                    <p style={{
                      fontSize: 24,
                      fontWeight: 500,
                    }}>S</p>
                  </div>
                  <p style={{
                    color: '#1B1F2A',
                    fontSize: 15,
                    fontStyle: 'normal',
                    fontWeight: '500',
                    letterSpacing: 0.15,
                  }}>{chat.question}</p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24
                }}>
                  <div>
                    <img src={Logo} alt="Logo" style={{ height: '40px' }} />
                  </div>
                  {chat.loading ? (
                    <TailSpin color="#00BFFF" height={40} width={40} />
                  ) : (
                    <p style={{
                      color: '#1B1F2A',
                      fontSize: 15,
                      fontStyle: 'normal',
                      fontWeight: '500',
                      letterSpacing: 0.15,
                    }}>{chat.answer}</p>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Input Section */}
      <div style={{ margin: '50px 60px', padding: '0px 20px', display: 'flex', border: '1px solid #E4E8EE', borderRadius: '8px', background: 'rgba(228, 232, 238, 0.35)', outline: '1px solid #000' }}>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Type a message..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input-box"
          />
        </div>
        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <button onClick={handleQuestionSubmit} style={{ outline: 'none', border: 'none' }}>
            <img src={Generate} alt="Generate" style={{ height: '18px', outline: 'none' }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;