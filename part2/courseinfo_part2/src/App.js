import "./App.css";

const Part = ({ part }) => {
  return (
    <div>
      <p className="App-header2">
        {part.name}{" "}
        <span className="App-stat">
          <b>{part.exercises}</b>
        </span>
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

const Sum = ({ parts }) => {
  return (
    <div>
      <p className="App-stat">
        <b>
          total of{" "}
          {parts.reduce(function (sum, part) {
            return sum + part.exercises;
          }, 0)}{" "}
          exercises
        </b>
      </p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Sum parts={course.parts} />
    </div>
  );
};

const Courses = ({ courses }) => {
  return (
    <div className="App">
      {courses.map((course) => (
        <Course course={course} key={course.id} />
      ))}
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Courses courses={courses} />;
};

export default App;
