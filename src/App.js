import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const WebcamComponent = () => <Webcam />;

const App = () => {
  const [picture, setPicture] = useState('');
  const [responseText, setResponseText] = useState('');

  const webcamRef = useRef(null);

  const capture = async () => {
    const pictureSrc = webcamRef.current.getScreenshot();
    console.log(pictureSrc);

    try {
      const formData = new FormData();
      formData.append('face', pictureSrc);

      const response = await axios.post('http://192.168.252.9:5000/emotion', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image successfully posted');
      console.log(response.data);

      // Set the response data in the state
      setResponseText(JSON.stringify(response.data));
    } catch (error) {
      console.error('Failed to post image:', error);
    }
  };

  const handleRetake = () => {
    setPicture('');
    setResponseText('');
  };

  // Use setInterval to capture images every second (1000 milliseconds)
  useEffect(() => {
    const intervalId = setInterval(capture, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      <p className="title">Hello World</p>

      <div className="webcam-container">
        {picture === '' ? (
          <Webcam
            mirrored={true}
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpg"
          />
        ) : (
          <img src={picture} alt="Captured" />
        )}
      </div>
      <div className="button-container">
        {picture !== '' ? (
          <>
            <button className="button" onClick={handleRetake}>
              Retake
            </button>
          </>
        ) : null /* Remove the Capture button */}
      </div>
      <div className="title">
        {responseText && <p className="response">{JSON.parse(responseText).emotion}</p>}
      </div>
    </div>
  );
};

export default App;
