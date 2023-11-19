import Header from "../components/Header";
import LeftPane from "../components/LeftPane";
import WebcamOP from "../components/WebcamOP";
import "./WebApp.css";

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
      <WebcamOP />
      <div className="webapp-child" />
    </div>
  );
};

export default WebApp;
