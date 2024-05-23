import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { generateRankingPlayers } from "../utils/utils";

function RankComponent({ ranking, animationShow }) {
  const [rankArr, setRankArr] = useState([]);
  useEffect(() => {
    let arr = [...ranking].sort((a, b) => b.score - a.score);
    if(ranking.length === 0) {
      arr = [...generateRankingPlayers()]
    }
    setRankArr(arr);
  },[ranking])
  
  return (
    <div className="col-12 col-md-6">
      <div className="card-title">📈 Ranking</div>
      <div className="card-box ranking-box">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {rankArr.map((user, index) => (
                <tr
                  key={`key${user.id}`}
                  className={
                    user.name === "You" && !animationShow && user.score !== 0 ? "my-result" : ""
                  }
                >
                  <td>{index + 1}</td>
                  <td>{animationShow || user.score === 0 ? "-" : user.name}</td>
                  <td>{animationShow || user.score === 0 ? "-" : user.score}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ranking: state.reduxStore.usersRanking,
  animationShow: state.reduxStore.animShow,
});

export default connect(mapStateToProps)(RankComponent);
