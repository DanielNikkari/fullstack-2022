import "./App.css";

const Part = ({ part }) => {
  return (
    <div>
      <p className="App-header2">
        {part.name} <span className="App-stat">{part.exercises}</span>
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </div>
  );
};

const Header = ({ name }) => {
  return (
    <div>
      <h1 className="App-header">{name}</h1>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div className="App">
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
