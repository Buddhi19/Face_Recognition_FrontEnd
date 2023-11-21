
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
const WebcamOP = ({ callback }) => {

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
      const response = await axios.post('http://127.0.0.1:8000/uploadfilereact_2/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Image successfully posted');
      console.log(response.data);
      callback({
        name: response.data.name,
        e_number: 'E/20/' + response.data.number,
        group_number: response.data.group
      })


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

  const on_click_confirm = () => {
    callback(
      (data) => {
        axios.get('http://127.0.0.1:8000/update_group/' + data.group_number);
        return data;
      }
    )
  }
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
      <div className="photo-button">
        <div className='ring'/><div className='circle'/>
      {picture !== '' ? (
        <>
          <button className='button' onClick={handleRetake} />
        </>
      ) : (
        <button className='button' onClick={capture} />
      )}
      </div>
      <button className='btn-square-md' onClick={on_click_confirm}>
        CONFIRM
      </button>
    </>
  )
  // return <div className="webapp-item" />;
};

export default WebcamOP;
