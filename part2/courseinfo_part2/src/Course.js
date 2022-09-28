import React from "react"

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
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <div>
      <h1 className="App-header">{name}</h1>
    </div>
  )
}

const Sum = ({ parts }) => {
  return (
    <div>
      <p className="App-stat">
        <b>
          total of{" "}
          {parts.reduce(function (sum, part) {
            return sum + part.exercises
          }, 0)}{" "}
          exercises
        </b>
      </p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Sum parts={course.parts} />
    </div>
  )
}

const Courses = ({ courses }) => {
  return (
    <div className="App">
      {courses.map((course) => (
        <Course course={course} key={course.id} />
      ))}
    </div>
  )
}

export { Courses }
