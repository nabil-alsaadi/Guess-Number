import React from "react";
import { connect } from "react-redux";
import LoginComponent from "./pages/loginComponent";
import PlayComponent from "./pages/playComponent";
import HeaderComponent from "./pages/headerComponent";
import GraphComponent from "./pages/graphComponent";
import RankComponent from "./pages/rankComponent";
import ChatComponent from "./pages/chatComponent";

function App({ userName }) {
  return (
    <div className="App">
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-md-4 position-relative">
            {userName ? <PlayComponent /> : <LoginComponent />}
          </div>

          <div className="col-12 col-md-8">
            <HeaderComponent />
            <GraphComponent />
          </div>
        </div>

        <div className="row mt-3">
          <RankComponent />
          <ChatComponent />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userName: state.reduxStore.userName,
});

export default connect(mapStateToProps)(App);
