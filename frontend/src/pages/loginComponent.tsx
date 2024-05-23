import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { default as socket } from "../config/webSocketConfig";
import { setUserName } from "../redux/actions";

function LoginComponent({ setUserName }) {
  const [name, setName] = useState("");

  const loginHandle = () => {
    console.log('socket =========', socket);
    if (name.length > 0) {
      socket.emit("join", name);
      setUserName(name);
    }
  };

  return (
    <div className={`card-box join-box`}>
      <div className="join-title">Welcome</div>

      <form className="">
        <div className="join-hint">Please Insert Your Name</div>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
        <button
          className="btn btn-primary"
          onClick={loginHandle}
          type="button"
        >
          Accept
        </button>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setUserName: (name) => dispatch(setUserName(name)),
});

export default connect(null, mapDispatchToProps)(LoginComponent);
