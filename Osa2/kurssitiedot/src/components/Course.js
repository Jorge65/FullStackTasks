const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <b>Number of exercises {sum}</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.name} part={part} />
    )}
  </>

const Course = ({course, parts}) => {

  var totalSum = parts.reduce(function(sum, part){return sum + part.exercises}, 0)
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total sum={totalSum} />
    </div>
    )
  }

export default Course
