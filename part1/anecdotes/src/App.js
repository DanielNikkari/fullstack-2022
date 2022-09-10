import { useState } from "react";
import "./App.css";

const Button = ({ processClick, text }) => {
  return (
    <div>
      <button className="App-button" onClick={processClick}>
        {text}
      </button>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));
  const [best, setBest] = useState(0);

  const getRandomQuote = (anecdotes) => () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const addPoints = (index) => () => {
    const newPoints = { ...points };
    newPoints[index] += 1;
    setPoints(newPoints);
    getMostVotes(newPoints);
  };

  const getMostVotes = (points) => {
    let maxValue = 0;
    let maxIndex = 0;
    for (let i = 0; i < Object.keys(points).length; i++) {
      if (maxValue < points[i]) {
        maxValue = points[i];
        maxIndex = i;
      }
    }
    setBest(maxIndex);
  };

  return (
    <div className="App">
      <h1 className="App-header">Anecdote of the day</h1>
      <h2 className="App-header2">{anecdotes[selected]}</h2>
      <h3 className="App-header3">has {points[selected]} votes</h3>
      <div className="App-buttons">
        <Button processClick={addPoints(selected)} text={"vote"} />
        <Button
          processClick={getRandomQuote(anecdotes)}
          text={"next anecdote"}
        />
      </div>
      <h1 className="App-header">Anecdote with most votes</h1>
      <h2 className="App-header2">{anecdotes[best]}</h2>
      <h3 className="App-header3">has {points[best]} votes</h3>
    </div>
  );
};

export default App;
