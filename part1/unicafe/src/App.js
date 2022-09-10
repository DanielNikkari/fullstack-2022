import { useState } from "react";
import "./App.css";

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button className="App-button" onClick={handleClick}>
        {text}
      </button>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td className="App-stat">{text}</td>
        <td className="App-stat">{value}</td>
      </tr>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad !== 0) {
    return (
      <div className="App-stats">
        <table>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={good + neutral + bad} />
          <StatisticLine
            text={"average"}
            value={((good - bad) / (good + neutral + bad)).toFixed(2)}
          />
          <StatisticLine
            text={"positive"}
            value={(100 * (good / (good + neutral + bad))).toFixed(2) + " %"}
          />
        </table>
      </div>
    );
  } else {
    return (
      <div className="App-stats">
        <p className="App-stat">No feedback given</p>
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addRating = (type, newValue) => () => {
    if (type === "good") {
      setGood(newValue);
    } else if (type === "neutral") {
      setNeutral(newValue);
    } else if (type === "bad") {
      setBad(newValue);
    }
  };

  return (
    <div className="App">
      <h1 className="App-header">give feedback</h1>
      <div className="App-buttons">
        <Button handleClick={addRating("good", good + 1)} text={"good"} />
        <Button
          handleClick={addRating("neutral", neutral + 1)}
          text={"neutral"}
        />
        <Button handleClick={addRating("bad", bad + 1)} text={"bad"} />
      </div>
      <h1 className="App-header2">statics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
