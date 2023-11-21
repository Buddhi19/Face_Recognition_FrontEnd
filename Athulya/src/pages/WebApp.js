import Header from "../components/Header";
import LeftPane from "../components/LeftPane";
import WebcamOP from "../components/WebcamOP";
import "./WebApp.css";
import axios from 'axios';
// import Webcam from 'react-webcam';

const WebApp = () => {
  return (
    <div className="webapp">
      <img
        className="night-falls-spooky-gothic-skys-icon"
        alt=""
        src="/nightfallsspookygothicskyscrapergeneratedbyai-1@2x.png"
      />
      <Header />
      <LeftPane />
      <div className='webapp-child' >

        <WebcamOP />
      </div>
    </div>
  );
};

export default WebApp;
