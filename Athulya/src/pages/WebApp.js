import Header from "../components/Header";
import LeftPane from "../components/LeftPane";
import WebcamOP from "../components/WebcamOP";
import "./WebApp.css";
import axios from 'axios';
import { useState } from "react";
// import Webcam from 'react-webcam';

const WebApp = () => {
  const [data, setData] = useState({
    name: 'Who?',
    e_number: 'pi',
    group_number: 'i'
  });
  return (
    <div className="webapp">
      <img
        className="night-falls-spooky-gothic-skys-icon"
        alt=""
        src="/nightfallsspookygothicskyscrapergeneratedbyai-1@2x.png"
      />
      <Header />
      <LeftPane name={data.name} e_number={data.e_number} group={data.group_number} />
      <div className='webapp-child' >

        <WebcamOP callback={setData} />
      </div>
    </div>
  );
};

export default WebApp;
