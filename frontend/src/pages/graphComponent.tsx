import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import CountUp from "react-countup";
import { connect } from "react-redux";
import { Dot } from 'recharts';

const CustomDot = (props) => {
  const { cx, cy, index, data } = props;
  if (index === data.length - 1) {
    return <Dot cx={cx} cy={cy} r={15} fill="#f5c242" stroke="none" />;
  }
  return null;
};

function GraphComponent({ generatedValue, speedValue, usermultiplier }) {
  const [graphValue, setGraphValue] = useState([]);

  useEffect(() => {
    const array = [];
    if (usermultiplier > generatedValue) { // guess is greater than generated
      array.push({x:0,y:0})
      array.push({ x: generatedValue, y: generatedValue });
    }
    else { // guess is smaller than generated
      for (let index = 0; index <= usermultiplier; index++) {
        array.push({ x: index, y: 0 });
      }
      array.push({ x: generatedValue, y: generatedValue });
    }
    
    setGraphValue(array);
    console.log('graphValue after ', graphValue, usermultiplier);
  }, [generatedValue, usermultiplier]);

  function speedHandle() {
    return (1000 * speedValue) + 3000;
  }

  return (
    <div className="col-12 mt-3">
      <div className="card-box graph-box">
        <div className="result">
          <CountUp
            start={0}
            end={generatedValue}
            redraw={false}
            duration={speedHandle() / 1000}
            separator=" "
            decimals={2}
            decimal="."
            prefix=""
            suffix="x"
          ></CountUp>
        </div>

        <LineChart
          width={1000}
          height={300}
          data={graphValue}
          key={`key-${generatedValue}${Math.random()}`}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="x"
            domain={[0, 10]}
            interval={0}
            type="number"
            label={{
              key: 'xAxisLabel',
              value: '',
              position: 'bottom',
            }}
            allowDataOverflow={true}
          />
          <YAxis domain={[0, 10]} />
          <Line
            type="monotone"
            dataKey="y"
            strokeWidth={5}
            stroke="#fb544e"
            dot={<CustomDot data={graphValue} />}
            animationDuration={speedHandle()}
            hide={generatedValue === 0}
          />
        </LineChart>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  generatedValue: state.reduxStore.generatedValue,
  speedValue: state.reduxStore.speed,
  usermultiplier: state.reduxStore?.usersRanking[0]?.multiplier ?? 1,
});

export default connect(mapStateToProps)(GraphComponent);
