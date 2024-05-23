import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

function HeaderComponent({ userName, userBalance }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime(); 
    const intervalId = setInterval(updateTime, 1000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="row">
      <div className="col-12 col-md-4">
        <div className="card-box header-container">
          <div className="header-emoji">🏆</div>
          <div className="header-data">
            {userName ? userBalance.toLocaleString("en-US") : ""}
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card-box header-container">
          <div className="header-emoji">🤵‍♂️</div>
          <div className="header-data">{userName}</div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card-box header-container">
          <div className="header-emoji">🕰️</div>
          <div className="header-data">{userName ? time : ""}</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userName: state.reduxStore.userName,
  userBalance: state.reduxStore.balance,
});

export default connect(mapStateToProps)(HeaderComponent);
