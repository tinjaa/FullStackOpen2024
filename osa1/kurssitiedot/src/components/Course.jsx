
const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  };

  const Header = ({ course }) => {
    return (
      <header>
        <h1>{course}</h1>
      </header>
    );
  };

  const Content = ({ parts }) => {
    return (
      <ul>
        {parts.map((part, index) => (
          <Part key={index} part={part}></Part>
        ))}
      </ul>
    );
  };

  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }

  const Total = ({ parts }) => {
    const total = parts.reduce((total, course) => total + course.exercises, 0);
    return (
      <div>
        <h3>total of exercises {total}</h3>
      </div>
    );
  };

export default Course