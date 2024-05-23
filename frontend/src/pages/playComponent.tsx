import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  generateVal,
  speedStateVal,
  animStateVal,
  updateBalanceVal,
  setUsersRanking,
} from "../redux/actions";
import { generateGuessPlayers, generateRankingPlayers, players, random } from "../utils/utils";

const guesses = 4

function PlayComponent({
  animationEnd,
  balance,
  dispatchGenerateVal,
  dispatchSpeedStateVal,
  dispatchAnimStateVal,
  dispatchUpdateBalanceVal,
  dispatchSetUsersRanking,
}) {
  let [multiplierValue, setMultiplierValue] = useState(1.0);
  let [playersValue, setPlayersValue] = useState([]);
  let [generatedValue, setGeneratedValue] = useState(random(1, 9, 2));
  let [pointsValue, setPointsValue] = useState(50);
  let [speedValue, setSpeedValue] = useState(1);

  useEffect(() => {
    let players = generateRankingPlayers()
    setPlayersValue(players);
    dispatchSetUsersRanking(players);
  }, []);

  function generatePlayers() {
    let players = generateGuessPlayers(pointsValue,multiplierValue)
    setPlayersValue(players);
    dispatchSetUsersRanking(players);
  }

  const startFunction = () => {
    if (balance < 0 || (balance - pointsValue) < 0) {
      alert('No enough points');
      return false;
    }

    setGeneratedValue(random(1, 9, 2));
    dispatchSpeedStateVal(speedValue);
    generatePlayers();
    dispatchGenerateVal(generatedValue);
    dispatchUpdateBalanceVal(balance - pointsValue);
    setTimeout(updateBalance, 3000 + 1000 * speedValue);
  };

  function updateBalance() {
   
    dispatchAnimStateVal(false);

    if (generatedValue !== multiplierValue) {
      dispatchUpdateBalanceVal(balance - pointsValue);
    } else {
      dispatchUpdateBalanceVal(balance + pointsValue);
      
    }
  }

  const pointsMinusHandle = () => {
    if (pointsValue > 25){
      setPointsValue(pointsValue - 25);
    } 
  };

  const pointsPlusHandle = () => {
    if (balance >= pointsValue + 25){
      setPointsValue(pointsValue + 25);
    } 
  };

  const multiplierMinusHandle = () => {
    if (multiplierValue >= 1.25) {
      setMultiplierValue(multiplierValue - 0.25);
    } 
  };

  const multiplierPlusHandle = () => {
    if (10 >= multiplierValue + 0.25) {
      setMultiplierValue(multiplierValue + 0.25);
    } 
  };

  return (
    <div className="start-section">
    <div className="row mb-3">
      <div className="col-12 col-md-6">
        <div className="card-box header-container toggle">
          <div className="toggle-title">Points</div>
          <div className="toggle-menu">
            <div className="toggle-minus option" onClick={pointsMinusHandle}>
            🔽
            </div>
            <input
              type="number"
              className="toggle-input"
              min="0"
              max={balance}
              step="25"
              onChange={(e: any) => setPointsValue(e.target.value)}
              value={pointsValue}
            />
            <button className="toggle-plus option" onClick={pointsPlusHandle}>
            🔼
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6">
        <div className="card-box header-container toggle">
          <div className="toggle-title">Multiplier</div>
          <div className="toggle-menu">
            <div className="toggle-minus option" onClick={multiplierMinusHandle}>
              🔽
            </div>
            <input
              type="number"
              className="toggle-input"
              min="1"
              max="10"
              step="0.25"
              onChange={(e: any) => setMultiplierValue(e.target.value)}
              value={multiplierValue}
            />
            <button className="toggle-plus option" onClick={multiplierPlusHandle}>
              🔼
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      className="btn btn-primary start-button"
      onClick={startFunction}
      disabled={animationEnd}
    >
      {animationEnd ? "Started" : "Start"}
    </button>

    <div className="card-title mt-3">🏆 Current round</div>

    <div className="card-box round-box">
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Point</th>
            <th>Multiplier</th>
          </tr>
        </thead>
        <tbody>
          {playersValue.map((user: any, index: number) => (
            <tr key={user.id} className={index === 0 ? "my-result" : ""}>
              <td>{user.name}</td>
              <td>{user.point}</td>
              <td>{user.multiplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="card-title mt-3">⌛ Speed</div>

    <div className="card-box speed-box">
      <input
        type="range"
        className="speed"
        min="1"
        max="5"
        step="1"
        onChange={(e: any) => setSpeedValue(e.target.value)}
        value={speedValue}
        style={{ '--value': `${(speedValue - 1) * 25}%` } as React.CSSProperties}
      />

      <div className="speed-values">
        <div className={speedValue >= 1 ? "selected" : ""}>1x</div>
        <div className={speedValue >= 2 ? "selected" : ""}>2x</div>
        <div className={speedValue >= 3 ? "selected" : ""}>3x</div>
        <div className={speedValue >= 4 ? "selected" : ""}>4x</div>
        <div className={speedValue >= 5 ? "selected" : ""}>5x</div>
      </div>
    </div>
  </div>
  );
}

const mapStateToProps = (state) => ({
  animationEnd: state.reduxStore.animShow,
  balance: state.reduxStore.balance,
});

const mapDispatchToProps = {
  dispatchGenerateVal: generateVal,
  dispatchSpeedStateVal: speedStateVal,
  dispatchAnimStateVal: animStateVal,
  dispatchUpdateBalanceVal: updateBalanceVal,
  dispatchSetUsersRanking: setUsersRanking,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayComponent);
