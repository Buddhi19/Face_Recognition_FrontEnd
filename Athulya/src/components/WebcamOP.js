
import React, { useState } from 'react';
import "./WebcamOP.css";
import axios from 'axios';
import Webcam from 'react-webcam';

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
const WebcamOP = () => {

  const [picture, setPicture] = useState('');
  const [responseText, setResponseText] = useState('');

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(async () => {
    const pictureSrc = webcamRef.current.getScreenshot();
    // console.log(pictureSrc);

    try {
      const formData = new FormData();
      const file = dataURLtoFile(pictureSrc, "hello.png")
      formData.append('file', file);

      console.log(formData);
      const response = await axios.post('http://127.0.0.1:8000/uploadfilereact/', formData, {
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
    <>
      {picture === '' ? (
        <Webcam
          mirrored={true}
          audio={false}
          height={800}
          ref={webcamRef}
          width={750}
          screenshotFormat="image/jpg"
        />) : (
        <img src={picture} alt="Captured" />
      )}
      {picture !== '' ? (
        <>
          <button className='circle' onClick={handleRetake} />
        </>
      ) : (
        <button className='circle' onClick={capture} />
      )}
    </>
  )
  // return <div className="webapp-item" />;
};

export default WebcamOP;
