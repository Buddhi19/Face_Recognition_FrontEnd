import "./LeftPane.css";

const LeftPane = ({ name, e_number, group }) => {
  return (
    <div className="leftpane">
      <div className="leftpane-child" />
      <button className="sorting-hat-png-harry-potter-s" />
      <div className="name-parent">
        <div className="name">Name</div>
        <div className="e-number">E Number</div>
        <div className="name">Group</div>
      </div>
      <div className="welcome-to-electrolizer">Welcome to Electrolizer ‘23</div>
      <div className="leftpane-item" >{name}</div>
      <div className="leftpane-inner" >{e_number}</div>
      <div className="rectangle-div" >{group}</div>
    </div>
  );
};

export default LeftPane;
