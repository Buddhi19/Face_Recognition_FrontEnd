import React, { useState } from 'react';
import Header from "./components/Header"
import LeftPane from "./components/LeftPane"
import './App.css';
import axios from 'axios';
import Webcam from 'react-webcam';


const Profile = () => {
  const [picture, setPicture] = useState('');
  const [responseText, setResponseText] = useState('');

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(async () => {
    const pictureSrc = webcamRef.current.getScreenshot();
    console.log(pictureSrc);

    try {
      const formData = new FormData();
      formData.append('face', pictureSrc);

      const response = await axios.post('http://192.168.252.9:5000/emotion', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Image successfully posted');
      console.log(response.data);

      // Set the response data in the state
      setResponseText(JSON.stringify(response.data));
    } catch (error) {
      console.error('Failed to post image:', error);
    }
  }, []);

  const handleRetake = () => {
    setPicture('');
    setResponseText('');
  };

  return (
    <div className="background-container">
      <img src='/moon2.png'/>
      <div className='stars'/>
      <div className='twinkling'/>
      <div className='clouds'/>
      {/* <StarBackground/> */}
      <Header />
      <LeftPane />
      <div className='webcam-container'>
      <div className="webapp-item">
        {picture === '' ? (
          <Webcam
            mirrored={true}
            audio={false}
            height={800}
            ref={webcamRef}
            width={750}
            screenshotFormat="image/jpg"
          />): (
          <img src={picture} alt="Captured" />
        )}
      </div>
      </div>
      <div className="photo-button">
        <div className='ring'/><div className='circle'/>
        {picture !== '' ? (
          <>
            <button className="button2" onClick={handleRetake}/>
          </>
        ) : (
          <button className="button" onClick={capture}/>
        )}
      </div>
      <div className='title'>
      {responseText && <p className="response">{JSON.parse(responseText).emotion}</p>}
      </div>
    </div>
  );
};

export default Profile;
