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

const Showstatics = ({ good, neutral, bad }) => {
  return (
    <div className="App-stats">
      <p className="App-stat">good {good}</p>
      <p className="App-stat">neutral {neutral}</p>
      <p className="App-stat">bad {bad}</p>
    </div>
  );
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
      <Showstatics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
